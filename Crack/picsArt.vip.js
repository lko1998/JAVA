var obj = JSON.parse($response.body);

obj.subscription= {
  "granted": true
};
$done({body: JSON.stringify(obj)});

// M么 t岷�
