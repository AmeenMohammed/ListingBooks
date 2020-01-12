$(document).ready(function () {
        baseURL = window.location.protocol + "//" + window.location.host + "/ListingBooks";
        var booksList = [], markup, j = 1;
        var selected = [], unselected = [], selectedChange =[];

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

});
