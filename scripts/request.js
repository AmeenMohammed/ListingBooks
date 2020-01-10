$(document).ready(function(){
    var j = 0;
    var str = new Array();
    baseURL = window.location.protocol + "//" + window.location.host + "/ListingBooks";
    $.get(baseURL + "/api/books",{request:1},function(){}, "json").done(function(response){
        var i;
        console.log(response);
        for(i = 0; i < response.length;i++){
        $.each(response[i], function(key, value) {
            if(key == 'name'){
            $('#book0').append($("<option></option>").attr("value",key + i).text(value));
            }
       });
    }
    loading_selections(response);

    });
            $('#book0').change(function (){
                var value = $(this).val();
                str[0] = value;
                console.log(value);
                console.log(str);
                $("#book1 option").css("display","block");
            });

        function first_selction(){
            $("#book1 option").each(function(){
                if(($(this).val() == str[0])){
                       $(this).hide();
                       console.log("in if!");
                   }
              });
            $('#book0').change(function (){
                    $("#book1 option").css("display","block");
                    $("#book1 option").each(function(){
                        if(($(this).val() == str[0])){
                               $(this).hide();
                               console.log("in if!");
                           }
                      });


            });

        }

    function loading_selections(response){
        $("#add_select").click(function(){
            if(j < (response.length) - 1){
                j++;
                var selectList = document.createElement("select");
                var input = document.createElement("input");

                selectList.setAttribute("class", "select_stlye");
                selectList.setAttribute("id", "book" + j);

                input.setAttribute("class", "input_stlye");
                input.setAttribute("id", "input" + j);
                input.setAttribute("placeholder", "Quantity");
                $("#selects").append(selectList);
                $("#selects").append(input);
                for(i = 0; i < response.length;i++){
                    if(i == 0){
                      $('#book' + j).html('<option value=null>Select Book</option>');
                    }
                    $.each(response[i], function(key, value) {
                        if((key == 'name')){
                        $('#book' + j).append($("<option></option>").attr("value", key + i).text(value));
                        }
                   });
                }
                        first_selction();
                        for(var i = 1; i <= j; i++){
                            $('#book' + i).change(function (){
                                var value = $(this).val();
                                str[i] = value;
                                console.log(value);
                                $("#book" + i + " option").css("display","block");
                                $("#book" + i + " option").each(function(){
                                    for(var h = 0; h < str.length; h++){
                                        if(($(this).val() == value)||($(this).val() == str[h])){
                                            $(this).hide();
                                        }
                                    }
                                });
                        });
                    }
                }

            });

            $("#delete_select").click(function(){
                if(j > 0){
                    $("#book" + j).remove();
                    $("#input" + j).remove();
                    j--;
                }
            });

    }

});
