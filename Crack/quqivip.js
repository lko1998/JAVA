/*寰俊鍏紬鍙凤細ios榛戠鎶€


[rewrite_local]

#鏇插瑙ｉ攣浼氬憳
^https?:\/\/qapi\.jiangshanmen\.com\/.+ url script-response-body quqivip.js
^https?:\/\/api\.chengchumall\.com\/.+ url reject-200

MITM = qapi.jiangshanmen.com,api.chengchumall.com


*/


var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

body=body.replace(/isVip":\d/g,'isVip":1').replace(/name":.+?,/g,'name":"ios榛戠鎶€",').replace(/vipEnd":.+?,/g,'vipEnd":"2099-09-09 19:33:25",').replace(/coin":\d/g,'coin":99996'); 


$done({body});
