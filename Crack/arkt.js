/*  脚本功能：傲软抠图解锁会员
软件版本：1.5.1
脚本作者：king
下载地址：http://t.cn/A6xBOE5d
更新时间：2021.11.20
电报频道：https://t.me/yqc_123
问题反馈：https://t.me/yqc_007
使用声明：⚠️⚠️⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

# 傲软抠图解锁会员
^https?:\/\/gw\.aoscdn\.com\/base\/vip\/client\/authorizations$ url script-response-body https://raw.githubusercontent.com/nameking77/Qx/main/rewrite/arkt

[mitm] 

hostname = gw.aoscdn.com

*/


var body = $response.body
      .replace(/\"is_activated\":\d/g, "\"is_activated\":1")
      .replace(/\"expired_at\":\d/g, "\"expired_at\":4476655324");
$done({ body });
