<?php
namespace app\models;

use yii\db\ActiveRecord;

class MovieSlice extends ActiveRecord{
  // public static function tableName(){
  //   return 'customer';
  // }
  public function safeAttributes() {
    return ['segements'];
  }
}
