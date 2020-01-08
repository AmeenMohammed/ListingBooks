<?php
    class AddPageController{

        public function display_view(){
            include 'views/add.html';
        }
        public function insert_book(){
            $error = array();
            $bookName = $_POST['bookName'];
            if(isset($_POST['insert'])){
                if (empty($_POST['bookName'])) {
                    $error['empty_book'] = 'Please Enter book name!';
                  } else{
                      $bookName = $_POST['bookName'];
                    if ( !preg_match('/^[A-Za-z][A-Za-z0-9\\,\\-\\ ]{5,35}$/', $bookName)) {
                      $error['valid_book']  = 'Pls enter a valid book name!';
                    }
                }
                  if(empty($_POST['quantity'])){
                      $error['empty_quantity'] = 'Please Enter quantity!';
                  }else{
                      $quantity = $_POST['quantity'];
                    if(!preg_match('/^[0-9]{1,10}$/', $quantity)){
                      $error['valid_quantity'] = 'Please Enter a Number';
                    }
                }
                if(empty($error)){
                   if(!($this->check_book_exist($bookName))){
                        $add_book = new Books();
                        $add_book->name = $bookName;
                        $add_book->quantity = $quantity;
                        $add_book->save();
                        $add_book->id;
                        echo json_encode(array('status'=> 'success'));
                    }else{
                       echo json_encode(array('status' => 'error', array('exist'=>'Book already exists!')));
                    }
                }else{
                    echo json_encode(array('status'=> 'error', $error));
                }
                exit();
            }

        }
        public function check_book_exist($bookName){
            $flag = false;
            $array = json_decode(json_encode(Books::select('name')->fetch()));
            for ($i = 0; $i < count($array); $i++) {
                if(($array[$i]->name) == $bookName){
                    $flag = true;
                     break;
                }
            }
            return $flag;
        }

    }
?>
