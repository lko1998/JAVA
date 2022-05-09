var body = $response.body;
var url = $request.url;

const NoAD = '/mp';
const Url = '/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi';

if (url.indexOf(NoAD) != -1) {
	obj = JSON.parse(body);
	obj.advertisement_num = 0;
	obj.advertisement_info = [];
	delete obj.appid;
	body = JSON.stringify(obj);
}

if (url.indexOf(Url) != -1) {
	str = body.match(/\"desc\":\"([\s\S]*?)\"}/)[1].replace(/&#x2f;/g, '/').replace(/&amp;/g, '&').split("\"")[0];
	if (str.indexOf('m.tb.cn') != -1) {
		$notify('', '', '🔗点击打开淘宝', {'open-url' : str.replace(/http(s)?/, 'taobao')});
} else {
		$notify('','', '🔗点击打开链接', {'open-url' : str});
	}
}

$done({body});