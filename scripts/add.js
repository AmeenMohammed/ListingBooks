$(document).ready(function(){
    baseURL = window.location.protocol + "//" + window.location.host + "/ListingBooks";


    $("#insert").click(function(){
        var bookName = $("#book_id").val();
        var quantity = $("#quantity_id").val();
        var flag = false;
        if(bookName == ""){
            $("#book_err").html("Pls enter ur book name!");
            flag = true;
        }else{
            if(!(/^[A-Za-z][A-Za-z0-9\\,\\-\\ ]{5,35}$/).test(bookName)){
                $("#book_err").html("Pls enter a valid book name!");
                flag = true;
            }else{
                $("#book_err").html("");
                flag = false;
            }
        }
        if(quantity == ""){
            $("#quantity_err").html("Pls enter a quantity!");
            flag = true;
        }else{
            if(!(/^[0-9]{1,10}$/).test(quantity)){
                $("#quantity_err").html("Pls enter a valid quantity!");
                flag = true;
            }else{
                $("#quantity_err").html("");
                flag = false;
            }
        }

        if(flag == false){
            $("#quantity_err").html("");
            $("#book_err").html("");
            console.log("in if stat!");
            $.post(baseURL + "/api/insert",{insert: 1, bookName: bookName, quantity: quantity},
            function(){}, "json").
            done(function(response){
                console.log(response);
                if(response.status == 'success'){
                    window.location.href="login.php";
                }else{
                    for (var key in response[0]) {
                        if (response[0].hasOwnProperty(key)) {
                            if(key == 'empty_book' || key == 'valid_book' || key =='exist'){
                                $("#book_err").html(response[0][key]);
                            }
                            if(key == 'empty_quantity' || key == 'valid_quantity'){
                                $("#quantity_err").html(response[0][key]);

                            }
                        }
                    }
                }
                console.log("in");
            });
        }
    });
});
