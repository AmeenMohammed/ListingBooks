<?php
    class order extends Stalker_Table
    {
        public function schema() {
            return Stalker_Schema::build( function ($table) {
                $table->text("name");
                $table->date("purchasetime")->def(date('Y-m-d H:i:s'));
            });
        }
        public function books() {
            return $this->has_many_through("Books", "Orders", "book_id", "person_id");
        }
    }
?>
