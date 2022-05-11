module.exports = {
    "id": "elmapp",
    "name": "饿了么",
    "keys": ["elmbody", ],
    "author": "@ziye",
    "settings": [{
        "id": "elmSuffix",
        "name": "当前账号",
        "val": "1",
        "type": "number",
        "desc": "当前抓取ck记录的账号序号，如：1、2、3、"
    }, {
        "id": "elmCount",
        "name": "账号个数",
        "val": "1",
        "type": "number",
        "desc": "指定任务最多跑几个账号，根据抓取的账号数据个数来设值"
    }, {
        "id": "elmXH",
        "name": "循环获取CK",
        "val": "0",
        "type": "number",
        "desc": "关闭 1开启,默认关闭"
    }, {
        "id": "elmTX",
        "name": "自动兑换",
        "val": "0",
        "type": "number",
        "desc": "关闭 设置1 超级会员可用"
    }, {
        "id": "elmXYZ",
        "name": "执行概率",
        "val": "100",
        "type": "number",
        "desc": "不执行 可设置0-100,默认百分百"
    }, {
        "id": "elmntfst",
        "name": "推送控制",
        "val": "1",
        "type": "number",
        "desc": "关闭，1推送,默认12点以及23点推送"
    }, {
        "id": "elmmsgst",
        "name": "通知控制",
        "val": "2",
        "type": "number",
        "desc": "关闭，1为 所有通知，2为 12，23 点通知，3为 6，12，18，23 点通知 "
    }, {
        "id": "elmmsgm",
        "name": "推送-通知 分钟控制",
        "val": "59",
        "type": "number",
        "desc": "推送以及通知控制在什么分钟段，可设置0-59,默认0到10"
    }],
    "repo": "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/elm.js",
    "icons": ["https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/elm.png", "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/elm.png"],
    "script": "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/elm.js",
    "icon": "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/elm.png",
    "favIcon": "mdi-star",
    "favIconColor": "primary",
    "datas": [{
        "key": "elmbody",
        "val": "SID=AAAAAAAAAAAAAAAAAAA; USERID=8888888888;longitude=111.1111111111;latitude=33.3333333333;"
    }, {
        "key": "elmbody2",
        "val": ""
    }, {
        "key": "elmbody3",
        "val": ""
    }, {
        "key": "elmbody4",
        "val": ""
    }, {
        "key": "elmbody5",
        "val": ""
    }, {
        "key": "elmbody6",
        "val": ""
    }, {
        "key": "elmbody7",
        "val": ""
    }, {
        "key": "elmbody8",
        "val": ""
    }, {
        "key": "elmbody9",
        "val": ""
    }, {
        "key": "elmbody10",
        "val": ""
    }, {
        "key": "elmbody11",
        "val": ""
    }, {
        "key": "elmbody12",
        "val": ""
    }, {
        "key": "elmbody13",
        "val": ""
    }, {
        "key": "elmbody14",
        "val": ""
    }, {
        "key": "elmbody15",
        "val": ""
    }, {
        "key": "elmbody16",
        "val": ""
    }],
    "sessions": [],
    "isLoaded": true
}
