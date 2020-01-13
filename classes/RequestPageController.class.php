<?php
    class RequestPageController{

        public function display_view(){
            include 'views/request.html';
        }
        public function request_books(){
            $quantities = array();
            $book_ids = array();
            $order = new Orders();
            $person_name = new Order();
            if(isset($_POST['request'])){
               $quantities =  $_POST['quantities'];
                $book_ids = $_POST['books'];
                $name = $_POST['name'];
                $person_name->name = $name;
                $person_name->save();
                $person_name->id;
                for($i = 0; $i < count($book_ids); $i++){
                    $order = new Orders();
                    $order->person_id = $person_name->id;
                    $order->book_id = $book_ids[$i];
                    $order->quantity = $quantities[$i];
                    $order->save();
                    $book = Books::get($book_ids[$i]);
                    $book->quantity = ($book->quantity - $quantities[$i]);
                    $book->save();
                }
                echo "success!";
            }
        }

    }
?>
