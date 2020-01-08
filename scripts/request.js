$(document).ready(function(){
    var i = 0;
    baseURL = window.location.protocol + "//" + window.location.host + "/ListingBooks";
    $.get(baseURL + "/api/books",{request:1},function(){}, "json").done(function(response){
        var i;
        console.log(response);
        for(i = 0; i < response.length;i++){
        $.each(response[i], function(key, value) {
            if(key == 'name'){
            $('#books').append($("<option></option>").attr("value",key).text(value));
            }
       });
    }
    });
    $("#add_select").click(function(){
        i++;
        var selectList = document.createElement("select");
        var input = document.createElement("input");

        selectList.setAttribute("class", "select_stlye");
        selectList.setAttribute("id", "" + i);

        input.setAttribute("class", "input_stlye");
        input.setAttribute("id", "input" + i);
        input.setAttribute("placeholder", "Quantity");
        $("#selects").append(selectList);
        $("#selects").append(input);

    });
    $("#delete_select").click(function(){
        $("#" + i).remove();
        $("#input" + i).remove();
        i--;
    });

});
