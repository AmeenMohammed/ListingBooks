<?php
    class Books extends Stalker_Table
    {
        public function schema() {
            return Stalker_Schema::build( function ($table) {
                $table->text("name");
                $table->int("quantity", 11);
            });
        }
        public function persons() {
            return $this->has_many_through("Persons", "Orders", "person_id", "book_id");
        }
    }
?>
