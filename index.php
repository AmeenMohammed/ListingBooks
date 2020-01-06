<?php
 include 'includes/autoloader.inc.php';
    $router = new miniRouter();
    $router->group("/ListingBooks", function($router){

        $router->get('/',[new HomePageController(), 'display_view']);
        $router->get('/edit',[new EditPageController(), 'display_view']);
        $router->get('/request',[new RequestPageController(), 'display_view']);

    });
    $router->fallback(function(){

        echo "Page Not Found";
    });
    $router->start_routing();
?>
