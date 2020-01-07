$(document).ready(function(){
    baseURL = window.location.protocol + "//" + window.location.host + "/ListingBooks";

    console.log("Im in the page!");
    $.get(baseURL + "/api/books",{request:1},function(){}, "json").done(function(response){
        console.log(response);
        var html = "<table border='1|1'>";
        for (var i = 0; i < response.length; i++) {
            html += "<tr>";
            html += "<td>"+response[i].name+"</td>";
            html += "<td>"+response[i].quantity+"</td>";
            html += '<td><button type="button" name="edit_button" class="btn btn-warning btn-xs edit" id="edit'+response[i].id+'"> Edit </button></td>';
            html += '<td><button type="button" name="delete_button" class="btn btn-danger btn-xs delete" id="delete'+response[i].id+'">Delete</button></td>';
            html += "</tr>";
        }
        html+="</table>";
        $("#books_list").html(html);
    });

});
