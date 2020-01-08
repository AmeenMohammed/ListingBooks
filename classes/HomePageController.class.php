<?php
    class HomePageController{

        public function display_view(){
            include 'views/homepage.html';
        }
        public static function display_books(){
            if(isset($_GET['request'])){
                $books = Books::fetch();
                echo json_encode($books);
            }
            exit();
        }
        public function delete_item(){
            if(isset($_REQUEST['delete'])){
                $id = $_REQUEST['id'];
                $book = Books::get($id);
                if($book->delete()){
                    echo json_encode(array('status' => 'success'));
                }else{
                    echo json_encode(array('status' => 'error'));
                }
            }
            exit();
        }

    }
?>
