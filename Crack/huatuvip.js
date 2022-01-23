/*
微信公众号：ios黑科技
官方网站：ioshkj.com

圈X:

[rewrite_local]

#画图解锁订阅
^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://xmkczs.com/quantumultX/huatuvip.js

[mitm]
hostname = buy.itunes.apple.com

画图下载地址
https://apps.apple.com/cn/app/id1376425610

*/


let obj = JSON.parse($response.body);
obj = {
  "environment": "Production",
  "receipt": {
    "receipt_type": "Production",
    "adam_id": 1777777777,
    "app_item_id": 1777777777,
    "bundle_id": "com.80c.photoed",
    "application_version": "4.0",
    "download_id": 501083949846913142,
    "version_external_identifier": 832929866,
    "receipt_creation_date": "2022-01-23 02:04:19 Etc/GMT",
    "receipt_creation_date_ms": "1642903459000",
    "receipt_creation_date_pst": "2022-01-22 18:04:19 America/Los_Angeles",
    "request_date": "2022-01-23 02:05:01 Etc/GMT",
    "request_date_ms": "1642903501163",
    "request_date_pst": "2022-01-22 18:05:01 America/Los_Angeles",
    "original_purchase_date": "2022-01-23 01:45:46 Etc/GMT",
    "original_purchase_date_ms": "1642902346000",
    "original_purchase_date_pst": "2022-01-22 17:45:46 America/Los_Angeles",
    "original_application_version": "4.0",
    "in_app": [{
      "quantity": "1",
      "product_id": "com.80c.all",
      "transaction_id": "730000803444539",
      "original_transaction_id": "730000803444539",
      "purchase_date": "2022-01-23 01:54:20 Etc/GMT",
      "purchase_date_ms": "1642902860000",
      "purchase_date_pst": "2022-01-22 17:54:20 America/Los_Angeles",
      "original_purchase_date": "2022-01-23 01:54:20 Etc/GMT",
      "original_purchase_date_ms": "1642902860000",
      "original_purchase_date_pst": "2022-01-22 17:54:20 America/Los_Angeles",
      "expires_date": "2099-09-09 01:54:20 Etc/GMT",
      "expires_date_ms": "4092647115000",
      "expires_date_pst": "2099-09-09 17:54:20 America/Los_Angeles",
      "web_order_line_item_id": "730000349749013",
      "is_trial_period": "false",
      "is_in_intro_offer_period": "false",
      "in_app_ownership_type": "PURCHASED"
    }]
  },
  "latest_receipt_info": [{
    "quantity": "1",
    "product_id": "com.80c.all",
    "transaction_id": "730000803444539",
    "original_transaction_id": "730000803444539",
    "purchase_date": "2022-01-23 01:54:20 Etc/GMT",
    "purchase_date_ms": "1642902860000",
    "purchase_date_pst": "2022-01-22 17:54:20 America/Los_Angeles",
    "original_purchase_date": "2022-01-23 01:54:20 Etc/GMT",
    "original_purchase_date_ms": "1642902860000",
    "original_purchase_date_pst": "2022-01-22 17:54:20 America/Los_Angeles",
    "expires_date": "2099-09-09 01:54:20 Etc/GMT",
    "expires_date_ms": "4092647115000",
    "expires_date_pst": "2099-09-09 17:54:20 America/Los_Angeles",
    "web_order_line_item_id": "730000349749013",
    "is_trial_period": "false",
    "is_in_intro_offer_period": "false",
    "in_app_ownership_type": "PURCHASED",
    "subscription_group_identifier": "20506006"
  }],
  "latest_receipt": "",
  "pending_renewal_info": [{
    "auto_renew_product_id": "com.80c.all",
    "product_id": "com.80c.all",
    "original_transaction_id": "730000803444539",
    "auto_renew_status": "0"
  }],
  "status": 0
}
;

$done({body: JSON.stringify(obj)});

