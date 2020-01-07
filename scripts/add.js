$(document).ready(function(){

    $("#quantity_err").html("");
    $("#book_err").html("");
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
    });
});
