<?php
use yii\filters\Cors;
return [
    'adminEmail' => 'admin@example.com',
    'passwordKey' => 'imooc123',
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
    'accessKey' => 'U0dQR3lad2wyb1F6Q0lGNGt4MllJTUtrRzJzWXBCbVFnZ2duLW9IUQ==',
    'secretKey' => 'TTdkb1MxUUdVVEdDVkloTVQyWndVQ2l2bE92QzhhVFRIRzJoTlMwTQ==',
];
