<?php
    class Persons extends Stalker_Table
    {
        public function schema() {
            return Stalker_Schema::build( function ($table) {
                $table->text("name");
            });
        }
        public function books() {
            return $this->has_many_through("Books", "Orders", "book_id", "person_id");
        }
    }
?>
