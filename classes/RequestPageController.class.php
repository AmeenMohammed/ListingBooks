<?php
    class RequestPageController{

        public function display_view(){
            include 'views/request.html';
        }
        public function request_books(){
            $quantities = array();
            $book_ids = array();
            $error = array();
            $person_name = new Order();
            if(isset($_POST['request'])){
               $quantities =  $_POST['quantities'];
                $book_ids = $_POST['books'];
                $name = $_POST['name'];
                if (empty($_POST['name'])) {
                    $error['empty_name'] = 'Please Enter ur name!';
                  } else{
                      $name = $_POST['name'];
                    if ( !preg_match('/^[A-Za-z][A-Za-z0-9\\,\\-\\ ]{5,35}$/', $name)) {
                      $error['valid_name']  = 'Pls enter a valid name!';
                    }
                }
                for($i = 0; $i < count($quantities); $i++){
                   if($quantities[$i] == ""){
                        $error['empty_quantity' . $i] = 'Please Enter quantity!';
                    }else{
                        $quantities[$i] =  $quantities[$i];
                      if(!preg_match('/^[0-9]{1,10}$/', $quantities[$i])){
                        $error['valid_quantity' . $i] = 'Please Enter a Number';
                      }else{
                        $book = Books::get($book_ids[$i]);
                        if($book->quantity < $quantities[$i]){
                            $error['out_of_stock' . $i] = 'Check the list of books, out of stock!';
                        }
                      }
                  }

                }
                if(empty($error)){
                    $person_name->name = $name;
                    $person_name->save();
                    $person_name->id;
                    for($i = 0; $i < count($quantities); $i++){
                        $order = new Orders();
                        $order->person_id = $person_name->id;
                        $order->book_id = $book_ids[$i];
                        $order->quantity = $quantities[$i];
                        $order->save();
                        $book = Books::get($book_ids[$i]);
                        $book->quantity = ($book->quantity - $quantities[$i]);
                        $book->save();
                    }
                    echo json_encode(array('status'=> 'success'));
                }else{
                    echo json_encode(array('status'=> 'error', $error));
                  }
                exit();
            }

        }

    }
?>
