$(document).ready(function(){
    baseURL = window.location.protocol + "//" + window.location.host + "/ListingBooks";

    function fetch_data(array){
        var html = "<table border='1|1'>";
        for (var i = 0; i < array.length; i++) {
            html += "<tr>";
            html += "<td>"+array[i].name+"</td>";
            html += "<td>"+array[i].quantity+"</td>";
            html += '<td><button type="button" name="edit" class="btn btn-warning edit" id="'+array[i].id+'"> Edit </button></td>';
            html += '<td><button type="button" name="delete" class="btn btn-danger delete" id="'+array[i].id+'">Delete</button></td>';
            html += "</tr>";
        }
        html+="</table>";
        $("#books_list").html(html);
    }

    console.log("Im in the page!");
    $.get(baseURL + "/api/books",{request:1},function(){}, "json").done(function(response){
        console.log(response);
        fetch_data(response);
    });

    $("#add_button").click(function(){
        window.location.href= baseURL + "/add";
    });

    $(document).on('click', '.delete', function(){
        console.log("clicked!");
		var id = $(this).attr("id");
			$.ajax({
				url:baseURL + "/api/delete",
                method: 'DELETE',
                dataType: 'json',
                data:{delete: 1, id:id},
				success:function(response){
                    console.log("done!");
                    console.log(response);
                    if(response.status == 'success'){
                        console.log("deleted");
                       $.get(baseURL + "/api/books",{request:1},function(){}, "json").done(function(response){
                            console.log(response);
                            fetch_data(response);
                        });
                    }else{
                        console.log("something went wrong!");
                    }

				}
			});

    });
    $(document).on('click', '.edit', function(){
        window.location.href= baseURL + "/edit";
        console.log("clicked!");
        var id = $(this).attr('id');
        window.location.href= baseURL + "/edit/" + id;
	});

});
