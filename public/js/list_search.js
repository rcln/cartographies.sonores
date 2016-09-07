function searchKeyUp(e){
    var search_string = $("#rechercher").val().toLowerCase();
    if(search_string.length > 0){
        var filtered_objs = document.languages_search.filter(function(objs){
            return objs.text.search(search_string) > 0;
        });
        $("#table tbody tr").hide();
        filtered_objs.forEach(function(obj, v){ 
            $("#table tbody tr[data-reactid='" + obj.id + "']").show(); 
        });
    }else{
        $("#table tbody tr").show();
    }
}
