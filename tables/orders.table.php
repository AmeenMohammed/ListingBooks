<?php
    class Orders extends Stalker_Table
    {
        public function schema() {
            return Stalker_Schema::build( function ($table) {
                $table->id("person_id")->index();
                $table->id("book_id")->index();
                $table->int("quantity", 11);
            });
        }
    }
?>
