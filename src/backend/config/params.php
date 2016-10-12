<?php
use yii\filters\Cors;
return [
    'adminEmail' => 'admin@example.com',
    'passwordKey' => 'imooc123',
    'corsFilter' => [
      'class' => Cors::className(),
      'cors' => [
        'Origin' => ['*'],
        'Access-Control-Request-Method' => ['GET', 'POST', 'OPTION'],
        'Access-Control-Request-Headers' => ['*'],
        'Access-Control-Allow-Credentials' => true,
      ],
    ],
];
