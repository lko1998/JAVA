/*微信公众号：ios黑科技


[rewrite_local]

#曲奇解锁会员
^https?:\/\/qapi\.jiangshanmen\.com\/.+ url script-response-body quqivip.js
^https?:\/\/api\.chengchumall\.com\/.+ url reject-200

MITM = qapi.jiangshanmen.com,api.chengchumall.com


*/


var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

body=body.replace(/isVip":\d/g,'isVip":1').replace(/name":.+?,/g,'name":"ios黑科技",').replace(/vipEnd":.+?,/g,'vipEnd":"2099-09-09 19:33:25",').replace(/coin":\d/g,'coin":99996'); 


$done({body});
