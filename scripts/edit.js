$(document).ready(function(){
    baseURL = window.location.protocol + "//" + window.location.host + "/ListingBooks";
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    $.ajax({
        url:baseURL + '/api/fields',
        method:"get",
        data:{field: 1, id:id},
        dataType:"json",
        success:function(response){
            console.log(response);
            if(response.status == 'success'){
                $("#book_id").val(response[0].name);
                $("#quantity_id").val(response[0].quantity);
            }
        }
    })

});
