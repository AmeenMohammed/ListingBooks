<?php
    class RequestPageController{

        public function display_view(){
            include 'views/request.html';
        }
        public function request_books(){
            $quantities = array();
            $book_ids = array();
            if(isset($_POST['request'])){
               $quantities =  $_POST['quantities'];
                $book_ids = $_POST['books'];
                $name = $_POST['name'];
                for($i = 0; $i < count($book_ids); $i++){
                    echo 'id = ' .$book_ids[$i].', ' .$quantities[$i];
                }

            }
        }

    }
?>
