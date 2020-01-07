<?php
    include 'includes/autoloader.inc.php';
    include_once './core/stalker_configuration.core.php';
    include_once './core/stalker_registerar.core.php';
    include_once './core/stalker_schema.core.php';
    include_once './core/stalker_validator.core.php';
    include_once './core/stalker_database.core.php';
    include_once './core/stalker_information_schema.core.php';
    include_once './core/stalker_query.core.php';
    include_once './core/stalker_migrator.core.php';
    include_once './core/stalker_backup.core.php';
    include_once './core/stalker_table.core.php';
    include_once './core/stalker_seed.core.php';
    include_once './core/stalker_seeder.core.php';
    include_once './core/stalker_view.core.php';

    foreach ( glob("./tables/*.table.php") as $file ) {
        require_once $file;
    }
    Stalker_Registerar::auto_register();
    if(Stalker_Migrator::need_migration()){
        Stalker_Migrator::migrate();
    }

    $router = new miniRouter();
    $router->group("/ListingBooks", function($router){

        $router->get('/',[new HomePageController(), 'display_view']);
        $router->get('/add',[new AddPageController(), 'display_view']);
        $router->get('/edit',[new EditPageController(), 'display_view']);
        $router->get('/request',[new RequestPageController(), 'display_view']);

    });
    $router->group("/ListingBooks/api", function($router){
        $router->get('/books',['HomePageController', 'display_books']);
        $router->post('/insert',[new AddPageController(), 'insert_book']);
    });
    $router->fallback(function(){

        echo "Page Not Found";
    });
    $router->start_routing();
?>
