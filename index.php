<?php require("header.html"); ?>
<script>
this.markers = {};
var LRedIcon = L.icon({
    iconUrl: 'assets/images/marker-icon-red.png',
    shadowUrl: 'assets/images/marker-shadow.png',
});
var LGreyIcon = L.icon({
    iconUrl: 'assets/images/marker-icon-grey.png',
    shadowUrl: 'assets/images/marker-shadow.png',
});
function load_cartography(languages){
        var map_container = document.getElementsByClassName('cartography')[0];
        this.map = L.map(map_container).setView([40.505, -0.09], 2);
        L.tileLayer('//{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            minZoom: 1,
            maxZoom: 10,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(this.map);
        //var markers_danger = L.markerClusterGroup({ chunkedLoading: true });
        //var markers_live = L.markerClusterGroup({ chunkedLoading: true });
        for(var i in languages){
            var language = languages[i]; 
            var title = language.name;
            var positions = language.positions;
            var lat = positions[0];
            var lng = positions[1];
           
            if (language.status == "dangers"){ 
                marker_options = { icon: LRedIcon };
            }else{
                if(language.status == "morte"){
                    marker_options = { icon: LGreyIcon };
                }else{ 
                    marker_options = {};  
                }
            }
            marker_options["_language_id"] = language.id;

            var marker = L.marker(L.latLng(lat, lng), marker_options).addTo(this.map);
            if (typeof(language.audio) != 'undefined') {
                var audio_id = 'audio-player-' + language.id;
                var audio = '<hr /><div><audio controls="controls" id="' + audio_id + '" name="' + audio_id + '">' + '<source src="services/audio/' + language.audio + '" type="audio/mpeg"/>' + '</audio></div>';
            } else {
                var audio_id = null;
                var audio = ''; 
            }   
            var popup = marker.bindPopup('<div>' + '<a href="details/'+ language.id +'" >' + '<b>' + language.name + '</b>' + ' - Plus d\'information' + '</a>' + audio + '</div>');
            this.markers[language.id] = marker;
        }
}
function load_list(languages){
        var html_list = '';
        document.languages_search = [];
        for(var i in languages){
            var language = languages[i];
            document.languages_search.push( {
                                                id: language.id, 
                                                type: language.status,
                                                text: (language.name + ' ' + 
                                                        language.glottonym + ' ' + language.country + ' ' + 
                                                        language.family + ' ' + language.speakers).toLowerCase() 
                                            }); 
            html_list += '<tr id="' + language.id + '" class="language-item ' + language.status + '" >' +
                '<td data-title="Langue">' + language.name + '</td>' + 
                '<td data-title="Glottonyme">' + language.glottonym + '</td>' +
                '<td data-title="Pays">' + language.country + '</td>' + 
                '<td data-title="Famille">' + language.family + '</td>' +
                '<td data-title="Locuteurs">' + language.speakers + '</td>' +
            '</tr>';
        }
        $("#list-languages").html(html_list);
}
</script>
<div class="mdl-cell mdl-cell--12-col-phone mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
<div class="cartography">
</div>
</div>
<div class="mdl-cell mdl-cell--12-col-phone mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
    <div>
        <label id="search-icon" for="search" class="mdl-button mdl-js-button mdl-button--icon mdl-button--raised mdl-button--colored">
            <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input id="search" type="text" class="search mdl-textfield__input" onInput="searchKeyUp()">
            <label class="mdl-textfield__label" for="search">Rechercher</label>
        </div>
    </div>
    <div id="table" class="table-responsive-vertical shadow-z-1">
        <table class="table table-hover table-mc-light-blue table-bordered">
            <thead>
                <tr>
                    <th>Langue</th>
                    <th>Glottonyme</th>
                    <th>Pays</th>
                    <th>Famille</th>
                    <th>Locuteurs</th>
                </tr>
            </thead>
            <tbody id="list-languages">
            </tbody>
        </table>
    </div>
</div>
<script>
$(function(){
    $.getJSON( "services/languages.json", function( languages ) {   
        load_cartography(languages);    
        load_list(languages);
        $(".language-item").click(function(){
            location.href = "details/" + this.id;
        });
    });
});
</script>
<?php require("footer.html"); ?>
