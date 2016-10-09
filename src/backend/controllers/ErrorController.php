<?php

namespace app\controllers;

use yii\web\Controller;

class ErrorController extends Controller {
  public function actionError() {
    echo '3333';die;
  }
}
