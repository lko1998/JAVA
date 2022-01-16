/*
多点淘金 每天三毛。。
https://api.gzswin.cn/game/index    token获取链接
青龙变量  ddtjtoken  多账号@隔开
手动抓包，进首页就有token
一天运行1 - 2 次就可以了。。。

入口 ： https://sm.ms/image/1PsUFMQdVZj3hJl

上限后强制多答题十次，多了一毛钱吧-
*/

const jsname = '多点淘金'
const $ = Env(jsname)
const logDebug = 0
const notify = $.isNode() ? require('./sendNotify') : ''
let ddtjtoken = ($.isNode() ? process.env.ddtjtoken : $.getdata('ddtjtoken')) || '';
let ddtjtokenArr = []
let dydcode = '', articleId = '', wxurl = '', author = '', openid = '',uid = ''
let httpResult //global buffer
const CryptoJS = require('crypto-js');


let host = 'https://api.gzswin.cn'

///////////////////////////////////////////////////////////////////

!(async () => {
    if (typeof $request !== "undefined") {
    } else {
        ddtjtokenArr = ddtjtoken.split("@")
        msg = ''
        console.log(`\n=======共有 ${ddtjtokenArr.length} 个账号======`)
        for (let i = 0; i < ddtjtokenArr.length; i++) {
            console.log(`\n开始 ${i + 1} 个账号`)
            msg += `\n-------第 ${i + 1} 个账号-------`
            token = ddtjtokenArr[i]
            // 获取uid
            await getUid()
            // 答题
            $.log(`\n开始文章答题`)
            number = 1
            await question_task()
            // 提现
            $.log(`\n开始提现`)
            await cash_out()
        }
        $.msg($.name, '', `\n${msg}\n`);
        if ($.isNode()) {
            await notify.sendNotify($.name, `${msg}`);
        }
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

///////////////////////////////////////////////////////////////////
// 获取uid
async function getUid() {
    let url = `${host}/index/index`
    let body = `{"token":"${token}"}`
    let url_object = populatePostUrl(url, body)
    let caller = printCaller()
    await httpPost(url_object, caller)
    let result = httpResult
    if (!result) return

    if (result.code === 200) {
        $.log(`\n用户: ${result.data.user.nickname}(${result.data.user.id}) \n我的钱包: ${result.data.money.balance} 元`)
        uid = result.data.user.id
        openid = result.data.user.openid
        msg += `\n【用户】 ${result.data.user.nickname}`
    }
}

///////////////////////////////////////////////////////////////////

async function question_task() {
    //答一答code
    let caller = printCaller()
    let url = `${host}/index/read_urlcode`;
    let body = `{"token":"${token}"}`
    let url_object = populatePostUrl(url, body)
    await httpPost(url_object, caller)
    let result = httpResult
    if (!result) return

    await $.wait(Math.floor(Math.random() * (150 - 100 + 100) + 300))
    if (result.code === 200) {
        dydcode = result.data.url_code
        // 题目id
        await read_action()
    } else {
        $.log(`文章答题已经答完啦~改个时间再来吧！`)
    }
}

///////////////////////////////////////////////////////////////////

async function read_action() {
    //答一答code
    let caller = printCaller()
    let url = `${host}/index/read_action`;
    let body = `{"url_code":"${dydcode}","token":"${token}"}`
    let url_object = populatePostUrl(url, body)
    await httpPost(url_object, caller)
    let result = httpResult
    if (!result) return

    if (result.code === 200) {
        $.log(`\n--------第 ${number++} 次答题--------\nid: ${result.data.article.id} \n文章: ${result.data.article.name}`)
        articleId = result.data.article.id
        wxurl = result.data.article.url
        // 跳转微信文章
        await jump_wxurl()
    }
}

///////////////////////////////////////////////////////////////////

async function jump_wxurl() {
    //答一答code
    let caller = printCaller()
    let url_object = populateGetUrl(wxurl)
    await httpGet(url_object, caller)
    let result = httpResult
    if (!result) return

    if (result.match(/nickname(.*?)">(.+?)<\/strong/) != null) {
        author = result.match(/nickname(.*?)">(.+?)<\/strong/)[2]
        $.log(`答案: ${author}`)
        await $.wait(Math.floor(Math.random() * (150 - 100 + 100) + 300))
        // 验证
        await read_time_start()
        await read_subject_query_v2()
    }

}

///////////////////////////////////////////////////////////////////

async function read_time_start() {
    let caller = printCaller()
    let url = `${host}/index/read_time_start`;
    let body = `{"article_id":${articleId},"openid":"${openid}","unite_id":"","token":"${token}"}`
    let url_object = populatePostUrl(url, body)
    await httpPost(url_object, caller)
    let result = httpResult
    if (!result) return

    if (result.code === 200) {
        await $.wait(Math.floor(Math.random() * (1500 - 1000 + 1000) + 2000))
        await read_subject()
    }

}

///////////////////////////////////////////////////////////////////

async function read_subject() {
    let caller = printCaller()
    let url = `${host}/index/read_subject`;
    let body = `{"article_id":${articleId},"token":"${token}"}`
    let url_object = populatePostUrl(url, body)
    await httpPost(url_object, caller)
    let result = httpResult
    if (!result) return

    if (result.code === 200) {
        await $.wait(Math.floor(Math.random() * (1500 - 1000 + 1000) + 2000))
        await read_subject_query_v2()
    }

}

///////////////////////////////////////////////////////////////////

async function read_subject_query_v2() {
    let caller = printCaller()
    let sign_url = populateGetUrl(`http://119.91.192.69:9876/read_subject_sign?article_id=${articleId}&author=${author}`)
    await httpGet(sign_url, caller)
    let encrypted = httpResult
    let url = `${host}/index/read_subject_query_v2`;
    let body = `{"data": "${encrypted}", "token":"${token}"}`
    let url_object = populatePostUrl(url, body)
    await httpPost(url_object, caller)
    let result = httpResult
    if (!result) return

    if (result.code === 200) {
        $.log(`答题: ${result.msg}`)
    } else {
        $.log(`答题: ${result}`)
    }
    await $.wait(Math.floor(Math.random() * (1500 - 1000 + 1000) + 2000))
    await read_action()
}

///////////////////////////////////////////////////////////////////

async function cash_out() {
    let caller = printCaller()
    let url = `${host}/index/cash_out_index`;
    let body = `{"token":"${token}"}`
    let url_object = populatePostUrl(url, body)
    await httpPost(url_object, caller)
    let result = httpResult
    if (!result) return

    if (result.code === 200) {
        money = result.data.money
        $.log(`当前余额: ${money}元 累计提现: ${result.data.cash_out_total}元`)
        if (money >= 0.3) {
            msg += `\n【累计提现】 ${result.data.cash_out_total}元\n【本次提现】 ${money}元`
            await $.wait(Math.floor(Math.random() * (1500 - 1000 + 1000) + 2000))
            await wxpay()
        } else {
            msg += `\n【累计提现】 ${result.data.cash_out_total}元\n【本次提现】 余额小于0.3元, 跳过提现`
            $.log(`\n余额不足: 跳过提现 `)
        }
    }
}

///////////////////////////////////////////////////////////////////

async function wxpay() {
    let caller = printCaller()
    let sign_url = populateGetUrl(`http://119.91.192.69:9876/wxpay?money=${money}`)
    await httpGet(sign_url, caller)
    let encrypted = httpResult
    let url = `${host}/wxpay/index_v2`;
    let body = `{"data": "${encrypted}", "token":"${token}"}`
    let url_object = populatePostUrl(url, body)
    await httpPost(url_object, caller)
    let result = httpResult
    if (!result) return

    $.log(`\n提现结果: ${result.msg}`)
    msg += `\n【提现结果】 ${result.msg}`
}

///////////////////////////////////////////////////////////////////

async function encrypt(body) {
    let str = CryptoJS.AES.encrypt(body, CryptoJS.enc.Utf8.parse('Ecaof1s6jrKv6xSl'), {
        "iv": CryptoJS.enc.Utf8.parse('fb58a618fd5accb0'),
        "mode": CryptoJS.mode.CBC,
        "padding": CryptoJS.pad.Pkcs7
    })
    return str.toString()
}

////////////////////////////////////////////////////////////////////

function populatePostUrl(url, reqBody) {
    return {
        url: url,
        headers: {
            "Host": "api.gzswin.cn",
            "Accept": "*/*",
            "User-Agent": "Mozilla/5.0 (iPad; CPU OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.16(0x1800103f) NetType/WIFI Language/zh_CN",
            "Content-Type": "application/json",
            "Content-Length": reqBody.length
        },
        body: reqBody
    }
}

////////////////////////////////////////////////////////////////////

function populateGetUrl(url) {
    return {
        url: url,
        headers: {
        }
    }
}

////////////////////////////////////////////////////////////////////
// post
async function httpPost(url, caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.post(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": post请求失败")
                    console.log(JSON.stringify(err))
                    $.logErr(err)
                } else {
                    if (safeGet(data)) {
                        httpResult = JSON.parse(data)
                        if (logDebug) console.log(httpResult)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        });
    })
}

////////////////////////////////////////////////////////////////////
// get
async function httpGet(url, caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.get(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": get请求失败")
                    console.log(JSON.stringify(err))
                    $.logErr(err)
                } else {
                    if (safeGet(data, caller)) {
                        httpResult = JSON.parse(data)
                        if (logDebug) console.log(httpResult)
                    } else {
                        httpResult = data
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        });
    })
}

////////////////////////////////////////////////////////////////////
// 安全获取json响应信息
function safeGet(data, caller) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true
        } else {
            console.log(`\nFunction ${caller}: 未知错误`)
            console.log(data)
        }
    } catch (e) {
        return false
    }
}

////////////////////////////////////////////////////////////////////
// 提取错误信息
function printCaller() {
    return (new Error()).stack.split("\n")[2].trim().split(" ")[1]
}

////////////////////////////////////////////////////////////////////
// 基础环境配置
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
