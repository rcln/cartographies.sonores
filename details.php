<?php require("header.html"); ?>

<a class="active" href="#">
    <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--accent">
        <i class="material-icons">chevron_left</i>
    </button>
    <span>Retourner à la liste des langues</span>
</a>

<script>
var language_details = <?php
$language_id = $_REQUEST["language_id"];
$data = file_get_contents('http://localhost:8080/data/'.$language_id );
echo $data;
?>;
</script>

<section class="mdl-grid">
<div class="mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--7-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone">
    <div class="mdl-card__title">
        <h3 id="name" class="mdl-card__title-text"></h3>
    </div>
    <div id="language-content" class="tiny_image mdl-card__supporting-text">
    </div>
</div>
<div class="mdl-cell mdl-cell--12-col mdl-cell--4-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone">
    <div id="audio"></div>
    <div id="localisation"></div>
    <div id="details"></div>
    <div id="images"></div>
    <div id="authors"></div>
</div>
</section>
<script>
$(function(){
    console.log(language_details);
    $("#name").html(language_details.name);
    var find = '&lt;';
    var re = new RegExp(find, 'g');
    var parsed_content = markdown.toHTML(language_details.content);
    parsed_content = parsed_content.replace(re, "<")
    find = '&gt;';
    re = new RegExp(find, 'g');
    parsed_content = parsed_content.replace(re, ">");
    find = '&quot;';
    re = new RegExp(find, 'g');
    parsed_content = parsed_content.replace(re, "\"")
    $("#language-content").html(parsed_content);
    if(language_details.audio != null){
        $("#audio").html(
            '<div class="mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col">' +
                '<div class="showback mdl-card__title">' +
                    '<h3 class="mdl-card__title-text">Audio</h3>' +
                '</div>' +
                '<div id="audio" class="mdl-card__actions mdl-card--border">' +
                    '<audio controls="controls" id="audio-player-' + language_details.id + '"' + 
                            'name="audio-player-' + language_details.id + '">' + 
                        '<source src="services/audio/' + language_details.audio + '" type="audio/mpeg">' + 
                    '</audio>' +
                '</div>' +
            '</div>'
        );
    }
    if(language_details.positions != null){
        var LRedIcon = L.icon({
            iconUrl: 'assets/images/marker-icon-red.png',
            shadowUrl: 'assets/images/marker-shadow.png',
        });
        var LGreyIcon = L.icon({
            iconUrl: 'assets/images/marker-icon-red.png',
            shadowUrl: 'assets/images/marker-shadow.png',
        });

        $("#localisation").html(
            '<div class="showback mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col">' +
                '<div class="mdl-card__title">' +
                    '<h3 class="mdl-card__title-text">Localisation</h3>' +
                '</div>' +
                '<div class="leaflet-map-detail" style="position: relative;">' +
                '</div>' +
            '</div>'
        );
        var positions = language_details.positions[0];
        var lat = positions[0];
        var lng = positions[1];
        var map_container = document.getElementsByClassName('leaflet-map-detail')[0];
        this.map = L.map(map_container).setView([lat, lng], 8);
        L.tileLayer('//{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            minZoom: 4,
            maxZoom: 12,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(this.map);
        var language = language_details; 
        var title = language.name;
        var marker_options = {};
        if (language.status == "dangers"){ 
            marker_options = { icon: LRedIcon };
        }else{
            if(language.status == "morte"){
                marker_options = { icon: LGreyIcon };
            }else{ 
                marker_options = {};  
            }
        }
        var marker = L.marker(L.latLng(lat, lng), marker_options).addTo(this.map);
        if (typeof(language.audio) != 'undefined') {
            var audio_id = 'audio-player-' + language.id;
            var audio = '<hr /><div><audio controls="controls" id="' + audio_id + '" name="' + audio_id + '">' + '<source src="services/audio/' + language.audio + '" type="audio/mpeg"/>' + '</audio></div>';
        } else {
            var audio_id = null;
            var audio = ''; 
        }   
        var popup = marker.bindPopup('<div>' + '<a href="details/'+ language.id +'" >' + '<b>' + language.name + '</b>' + ' - Plus d\'information' + '</a>' + audio + '</div>');
    }

    var details_str = '';
    details_str += 
    '<div class="showback mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col">' +
            '<div class="mdl-card__title">' +
                '<h3 class="mdl-card__title-text">Détails</h3>' +
            '</div>' +
            '<ul>' +
                '<li>' +
                    '<span>Nom : </span><span>' + language_details.name + '</span>' +
                '</li>';
                if(language_details.glottonym){
                    details_str += 
                        '<li>' +
                            '<span>Glottonyme :  : </span><span>' + language_details.glottonym + '</span>' +
                        '</li>';
                }
                if(language_details.country){
                    details_str += 
                        '<li>' +
                            '<span>Région(s) :  : </span><span>' + language_details.country + '</span>' +
                        '</li>';
                }
                if(language_details.family){
                    details_str += 
                        '<li>' +
                            '<span>Famille :  : </span><span>' + language_details.family + '</span>' +
                        '</li>';
                }

                if(language_details.speakers){
                    details_str += 
                        '<li>' +
                            '<span>Locuteurs : </span><span>' + language_details.speakers + '</span>' +
                        '</li>';
                }
    details_str +=
            '</ul>' +
    '</div>';
    $("#details").html(details_str);

    var authors_str = '' +
        '<div class="showback mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col">' +
            '<div class="mdl-card__title">' +
                '<h3 class="mdl-card__title-text">Auteur</h3>' +
            '</div>'; 

    for(var i in language_details.authors){
        authors_str += '' + 
                '<div class="mdl-card__supporting-text">' +
                    '<p>' +
                            '<span>' + language_details.authors[i].name + '</span>' +
                            '<a href="' + language_details.authors[i].website + '">' +
                                '<i class="material-icons">language</i>' +
                            '</a>' +
                            '</p>';
        if(language_details.authors[i].about.length > 0){
            authors_str +=  '<div>' +
                    markdown.toHTML(language_details.authors[i].about) +
                '</div>';
        }
        authors_str += '</div>';
    }
    authors_str += '</div>';
        
    $("#authors").html(authors_str);


    if(language_details.images){
        var images_str = '<div class="showback mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col">' +
            '<div class="mdl-card__title"><h3 class="mdl-card__title-text">Galerie</h3></div><p>';
        for(var i in language_details.images){
            images_str += '<a href="' + i + '"  title="' + language_details.images[i] + '"  ><img src="thumbnails/' + i + '" /></a>';
        }
        images_str += '</p></div></div>';
        $("#images").html(images_str);
        $("#images div a").colorbox({
            height: '80%',
            scale: true,
            close: 'fermer',
            
        });
    }

});
</script>
<?php require("footer.html"); ?>

