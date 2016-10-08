function searchKeyUp(){
    var search_string = $("#search").val().toLowerCase();
    if(search_string.length > 0){
        var filtered_objs = document.languages_search.filter(function(objs){
            this.map.removeLayer(this.markers[objs.id]);
            return objs.text.search(search_string) >= 0;
        });
        $("#table tbody tr").hide();
        filtered_objs.forEach(function(obj, v){ 
            $("#table tbody tr[id='" + obj.id + "']").show();
            this.map.addLayer(this.markers[obj.id]);
        });
    }else{
        $("#table tbody tr").show();
    }
}
