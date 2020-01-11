$(document).ready(function () {
        baseURL = window.location.protocol + "//" + window.location.host + "/ListingBooks";
        var booksList = [], markup;

        $.get(baseURL + "/api/books", {
            request: 1
        }, function () {}, "json").
        done(function (response) {
            booksList = response;
            booksList.forEach(book => {
                  $('#book0 select.book').append($("<option></option>").attr("value", book.id).text(book.name));
            });
            markup = $('#book0').html();
        });
        $("#add_select").click(function(){
            if(booksList.length){


            }
        });
});
