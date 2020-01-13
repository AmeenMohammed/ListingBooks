<?php
    class Order extends Stalker_Table
    {
        public function schema() {
            return Stalker_Schema::build( function ($table) {
                $table->text("name");
                $table->date("purchasetime")->def(date('Y-m-d H:i:s'));
            });
        }

    }
?>
