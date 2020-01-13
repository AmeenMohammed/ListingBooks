$(document).ready(function () {
        baseURL = window.location.protocol + "//" + window.location.host + "/ListingBooks";
        var booksList = [], markup, j = 1;
        var selected = [], unselected = [];

        $.get(baseURL + "/api/books", {
            request: 1
        }, function () {}, "json").
        done(function (response) {
            booksList = response;
            booksList.forEach(book => {
                  $('#book-0 select.book').append($("<option></option>").attr("value", book.id).text(book.name));
            });
            markup = $('#book-0').html();
        });

        $("#add_select").click(function(){
            if(booksList.length > j){
                selected[0] = Number($('select.book').find('option:selected').val());
                temp = booksList.filter(book =>!selected.includes(book.id));
                unselected = temp.map(book => book.id);
                selected.push(unselected.shift());
               $("#selects").append($("<div></div>").attr("id", "book-" + j).append(markup));
               $(`#book-${j} option[value=${selected[j]}]`).attr("selected", "selected");
                $('select.book option').each(function(){
                    $(this).show();
                    if(selected.includes(Number(this.value)) && !this.selected){
                        $(this).hide();
                    }
                });

                j++;
            }
        });
        $("#delete_select").click(function(){
            if(j > 1){
                $('#book-' + --j).remove();
                unselected.unshift(selected.pop());
            }
            $('select.book option').each(function(){
                $(this).show();
                if(selected.includes(Number(this.value)) && !this.selected){
                    $(this).hide();
                }
            });
        });

        $(document).on( "change", '#selects select.book', function() {
            for(var i = 0; i < j; i++){
                selected[i] = (Number($(`#book-${i} select.book`).find('option:selected').val()));
                temp = booksList.filter(book =>!selectedChange.includes(book.id));
                unselected = temp.map(book => book.id);
            }
                $(`#book-${j} option[value=${selected[j]}]`).attr("selected", "selected");
                $('select.book option').each(function(){
                    $(this).show();
                    if(selected.includes(Number(this.value)) && !this.selected){
                        $(this).hide();
                    }
                });

      });
      $('form').on('submit', function(e){
          e.preventDefault();
        var submitted_book_ids = [], submitted_book_quantities = [], name, flag = false;
        for(var i = 0; i < j; i++){
            submitted_book_ids[i] = (Number($(`#book-${i} select.book`).find('option:selected').val()));
            submitted_book_quantities[i] = $(`#book-${i} #quantity_id`).val();
            if(submitted_book_quantities[i] == ""){
                $(`#book-${i} #quantity_err`).html("Pls enter a quantity!");
                flag = true;
            }else{
                if(!(/^[0-9]{1,10}$/).test(submitted_book_quantities[i])){
                    $(`#book-${i} #quantity_err`).html("Pls enter a valid quantity!");
                    flag = true;
                }else{
                    $(`#book-${i} #quantity_err`).html("");
                    flag = false;
                }
            }

        }
        name = $("#name_id").val();
        if(name == ""){
            $("#name_err").html("Pls enter ur name!");
            flag = true;
        }else{
            if(!(/^[A-Za-z][A-Za-z0-9\\,\\-\\ ]{5,35}$/).test(name)){
                $("#name_err").html("Pls enter a valid user name!");
                flag = true;
            }else{
                $("#name_err").html("");
                flag = false;
            }
        }
        if(flag == false){
            $("#quantity_err").html("");
            $("#name_err").html("");
            $.post(baseURL + "/api/request",{request: 1,
                 quantities: submitted_book_quantities, books: submitted_book_ids, name: name},
            function(){}).
            done(function(response){
                console.log(response);
            });
        }

    });
});
