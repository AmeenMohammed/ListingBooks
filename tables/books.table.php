<?php
    class Books extends Stalker_Table
    {
        public function schema() {
            return Stalker_Schema::build( function ($table) {
                $table->text("name");
                $table->int("quantity", 11);
            });
        }

    }
?>
