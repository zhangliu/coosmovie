<?php
use yii\filters\Cors;
return [
    'adminEmail' => 'admin@example.com',
    'passwordKey' => 'xxx',
    'corsFilter' => [
      'class' => Cors::className(),
      'cors' => [
        'Origin' => ['*'],
        'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'OPTION'],
        'Access-Control-Request-Headers' => ['*'],
        'Access-Control-Allow-Credentials' => true,
      ],
    ],

    // qiniu
    'accessKey' => 'xxxx',
    'secretKey' => 'xxxx',
];
