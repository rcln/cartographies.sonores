<?php require("header.html"); ?>
<a class="active" href="#">
    <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--accent">
        <i class="material-icons">chevron_left</i>
    </button>
    <span>Retourner à la liste des langues</span>
</a>

<section class="mdl-grid">
<div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-cell--6-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone">
    <div class="mdl-card__title">
        <h3 id="name" class="mdl-card__title-text">Donnez-nous votre histoire</h3>
    </div>
    <div class="contrib mdl-cell mdl-card--expand mdl-cell--12-col mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone">
        <div class="audio-controls">
            <button id="record" class="mdl-button mdl-js-button mdl-button--icon">
                <i class="material-icons">mic</i>
            </button>
            <button id="stop-recording" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" disabled>
                <i class="material-icons">stop</i>
            </button>
            <audio id="audio-contrib" controls></audio>
        </div>
        <script>
            document.blob = null;
            var onFail = function(e) {
                console.log('Rejected!', e);
            };
            var onSuccess = function(s) {
                var context = new AudioContext();
                var mediaStreamSource = context.createMediaStreamSource(s);
                recorder = new Recorder(mediaStreamSource);
                recorder.record();
                // audio loopback
                // mediaStreamSource.connect(context.destination);
            }
            window.URL = window.URL || window.webkitURL;
            navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            var recorder;
            var audio = document.getElementById('audio-contrib');
            $("#record").click(function() {
                $(this).addClass("mdl-color-text--white mdl-color--red-900");
                $("#stop-recording").removeAttr("disabled");
                document.blob = null;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({audio: true}, onSuccess, onFail);
                } else {
                    console.log('navigator.getUserMedia not present');
                }
            });
            $("#stop-recording").click(function () {
                $("#record").removeClass("mdl-color-text--white mdl-color--red-900");
                recorder.stop();
                recorder.exportWAV(function(blob) {
                    audio.src = window.URL.createObjectURL(blob);
                    document.blob = blob;
                    ready_to_save();
                    console.log(blob);
                    console.log(window.URL.createObjectURL(blob));
                });
            });
        </script>
    </div>
    <div class="contrib mdl-cell mdl-card--expand mdl-cell--12-col mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="language-maternelle" name="language-maternelle" required onInput="ready_to_save()">
            <label class="mdl-textfield__label" for="language-maternelle">Langue maternelle</label>
        </div><br />  
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="nom" name="nom">
            <label class="mdl-textfield__label" for="nom">Nom (Facultatif)</label>
        </div><br /> 
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" pattern="-?[0-9]*(\.[0-9]+)?" type="text" id="age" name="age">
            <label class="mdl-textfield__label" for="age">Âge (Facultatif)</label>
            <span class="mdl-textfield__error">Number required!</span>
        </div>  
    </div>
    <div class="contrib mdl-cell mdl-card--expand mdl-cell--12-col mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone">
        <div id="contrib-map" class="leaflet-map-detail">
        </div>
        <script>
            document.marker_contrib = null;
            document.latlng_contrib = null;
            var map_container = document.getElementsByClassName('leaflet-map-detail')[0];
            document.map_contrib = L.map(map_container).setView([40.505, -0.09], 2);
            L.tileLayer('//{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
                minZoom: 2,
                maxZoom: 12,
                subdomains:['mt0','mt1','mt2','mt3']
            }).addTo(document.map_contrib);
            document.map_contrib.on('click', function(e){
                if(document.marker_contrib != null){
                    document.map_contrib.removeLayer(document.marker_contrib);
                    document.marker_contrib = null;
                }
                document.latlng_contrib = e.latlng;
                console.log(e.latlng);
                document.marker_contrib = new L.marker(e.latlng).addTo(document.map_contrib);
                ready_to_save();
            });
        </script>
    </div>
    <div class="contrib mdl-card__actions mdl-card--border mdl-card--expand">
        <button id="save-contrib" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" disabled>
            Enregistrer
        </button>
        <p id="thanks" style="display: none;">Nous vous remercions de votre contribution.</p>
        <script>
            function validate_simple_awkward(){
                return $("#language-maternelle").val() != "" && document.blob != null && document.latlng_contrib != null;
            }
            function ready_to_save(){
                if(validate_simple_awkward()){
                    $("#save-contrib").removeAttr("disabled");
                }else{
                    $("#save-contrib").attr("disabled", "");
                }
            }
            $("#save-contrib").click(function(){
                var blob = document.blob;
                if(blob != null){
                    var reader = new FileReader();
                    reader.onload = function(event){
                        var fd = {};
                        fd["fname"] = Math.random() + document.latlng_contrib.lat + document.latlng_contrib.lng;
                        fd["data"] = event.target.result;
                        fd["language"] = $("#language-maternelle").val();
                        fd["name"] = $("#nom").val();
                        fd["age"] = $("#age").val();
                        fd["lat"] = document.latlng_contrib.lat;
                        fd["lng"] = document.latlng_contrib.lng;
                        $.ajax({
                            type: 'POST',
                            url: 'upload/',
                            data: fd,
                            dataType: 'text'
                        }).done(function(data) {
                            $("#save-contrib").hide("fast", function(){
                                $("#thanks").show("slow");
                            });
                            console.log(data);
                        });
                    };
                    reader.readAsDataURL(blob);    
                }
            });
        </script>
    </div>
</div>

</section>
<?php require("footer.html"); ?>
