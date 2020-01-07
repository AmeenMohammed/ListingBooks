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

    }
?>
