<?php
    class EditPageController{

        public function display_view(){
            include 'views/edit.html';
        }
        public function update_item(){
            $error = array();
            if(isset($_REQUEST['update'])){
                $bookName = $_REQUEST['bookName'];
                $quantity = $_REQUEST['quantity'];
                $id = $_REQUEST['id'];

                if (empty($_REQUEST['bookName'])) {
                    $error['empty_book'] = 'Please Enter book name!';
                  } else{
                      $bookName = $_REQUEST['bookName'];
                    if ( !preg_match('/^[A-Za-z][A-Za-z0-9\\,\\-\\ ]{5,35}$/', $bookName)) {
                      $error['valid_book']  = 'Pls enter a valid book name!';
                    }
                }
                  if(empty($_REQUEST['quantity'])){
                      $error['empty_quantity'] = 'Please Enter quantity!';
                  }else{
                      $quantity = $_REQUEST['quantity'];
                    if(!preg_match('/^[0-9]{1,10}$/', $quantity)){
                      $error['valid_quantity'] = 'Please Enter a Number';
                    }
                }
                if(empty($error)){
                    $book = Books::get($id);
                    $book->name = $bookName;
                    $book->quantity = $quantity;
                    $book->save();
                    echo json_encode(array('status'=> 'success'));
                }else{
                    echo json_encode(array('status'=> 'error', $error));
                }
                exit();
            }

        }

    }
?>
