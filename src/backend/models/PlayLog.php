<?php
namespace app\models;

use yii\db\ActiveRecord;

class PlayLog extends ActiveRecord {
  public function safeAttributes() {
    return ['user_id', 'movie_slice_id', 'segment_index', 'content', 'start_time', 'type'];
  }

  public function rules() {
    return [
      [['movie_slice_id', 'segment_index', 'user_id'], 'integer', 'min' => 0],
    ];
  }
}
