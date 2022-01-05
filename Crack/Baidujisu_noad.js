/*
 unlock vip  百度极速去广告2021.4.6 红鲤鱼与绿鲤鱼与驴

https:\/\/mbd\.baidu\.com/searchbox\?action=(.*)cmd=100 script-response-body Baidujisu_noad.js




MITM = mbd.baidu.com


*/

var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const vip = 'searchbox?action=feed&cmd=100';




if (url.indexOf(vip) != -1) {
let adarry=obj.data["100"].itemlist.items
for(let i=0;i<adarry.length;i++)
{
if (adarry[i].data.mode=="ad")
adarry.splice(i,1); 
}

body = JSON.stringify(obj);

	
	
}


$done({body});
