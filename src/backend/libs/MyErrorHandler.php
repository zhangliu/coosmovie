<?php
namespace app\libs;

class MyErrorHandler extends \yii\base\ErrorHandler{
  protected function renderException($e) {
    if (\Yii::$app->has('response')) {
        $response = \Yii::$app->getResponse();
        // reset parameters of response to avoid interference with partially created response data
        // in case the error occurred while sending the response.
        $response->isSent = false;
        $response->stream = null;
        $response->data = null;
        $response->content = null;
        $response->setStatusCode(500);
    } else {
        $response = new Response();
    }
    $response->data = $e->getMessage();
    $response->send();
  }
}
