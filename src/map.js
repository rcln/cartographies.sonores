
var LanguageMap = (function (Stores, Actions, Dispatcher) {
    var module = {};

    module.popup_callback = function (id, audio_id) {
        /*
         * Pause audio
        if (audio_id != "null") {
            document.getElementById(audio_id).pause();
        }
        */

        Actions.app.showDetails(id);
    };

    module.view = React.createClass({
        contextTypes: {
            router: React.PropTypes.func
        },

        componentDidMount: function () {
            var map = L.map(this.getDOMNode()).setView([51.505, -0.09], 2);

            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {
                        minZoom: 2, 
                        maxZoom: 8, 
                        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    }).addTo(map);


            this._markers = [];
            
            Stores.language.getAll().filter(function(row) {
                return row.get('positions') != null;
            }).forEach(function (row) {
                row.get('positions').forEach(function(position) {
                    var lat = position.get(0);
                    var lon = position.get(1);

                    var marker = L.marker([lat, lon]).addTo(map);
                    if (row.get('audio') != null) {
                        var audio_id = 'audio-player-' + row.get('id');
                        var audio = '<hr /><div><audio controls="controls" id="' + audio_id + '" name="' + audio_id + '">' +
                                '<source src="audio/' + row.get('audio') + '" type="audio/mpeg"/>' + 
                                '</audio></div>';
                    } else {
                        var audio_id = null;
                        var audio = '';
                    }

                    var popup = marker.bindPopup(
                        '<div>' +
                            '<a href=' + this.context.router.makeHref('langue', {langue_id: row.get('id')}) + '>' + 
                            '<b>' + row.get('name') + '</b>' + 
                            ' - Plus d\'information' + 
                            '</a>' +
                            audio +
                        '</div>'
                    );

                    this._markers.push(marker);
                }.bind(this));
            }.bind(this));
        },

        render: function () {
            return <div className="leaflet-map" />
        },
    });

    return module;
})(Stores, Actions, Dispatcher);
