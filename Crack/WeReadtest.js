//微信读书5.5.1以后的版本加入了验证不能使用
var body = $response.body;
var obj = JSON.parse(body);
    obj.startTime= 991603940132;
    obj.expiredTime= 991604246399;
    obj.expired= 0;
    obj.isPaying= 0;
    obj.permanent= 0;
    obj.day= 91;
    obj.remainTime= 99306196;
    obj.payingRemainTime= 6;
    obj.isAutoRenewable= 6;
    obj.historyAutoRenewable= 6;
    obj.autoRenewableChannel= 6;
    obj.autoRenewableTime= 6;
    obj.autoRenewablePrice= 991900;
    obj.savedMoney= 9927433;
    obj.totalFreeReadDay= 6666;
    obj.remainCoupon= 6666;
    obj.remainCount= 6666;
    obj.hintsForRecharge.predictedSavedMoney= 9910315;
    obj.hintsForRecharge.predictedChapterPrice= 15;
    obj.hintsForRecharge.pricePerMonth= 99900;
    obj.hintsForRecharge.sendCoupons= 6666;
    obj.hintsForRecharge.buttonTitle= "付费无限卡9元/月 · 限时特惠";
    obj.hintsForRecharge.buttonSubtitle= "你正在使用免费无限卡 · 升级付费无限卡即可阅读";
body = JSON.stringify(obj);
$done({body});
