
var LanguageMap = (function (Stores, Actions, Dispatcher) {
    var module = {};

    module.view = React.createClass({
        componentDidMount: function () {
            var map = L.map(this.getDOMNode()).setView([51.505, -0.09], 2);

            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {
                        minZoom: 2, 
                        maxZoom: 8, 
                        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    }).addTo(map);


            this._markers = Stores.language.getAll().filter(function(row) {
                return row.get('lat') != null && row.get('lon') != null;
            }).map(function (row) {
                var marker = L.marker([row.get('lat'), row.get('lon')]).addTo(map);
                console.log(row.get('audio'));
                if (row.get('audio') != null) {
                    audio = '<hr /><div><audio controls="controls" id="player" name="player">' +
                            '<source src="audio/' + row.get('audio') + '" type="audio/mpeg"/>' + 
                            '</audio></div>';
                } else {
                    audio = '';
                }

                marker.bindPopup(
                    '<div>' +
                        '<div onClick="Actions.app.showDetails(' + row.get('id') + ');">'+
                        '<b>' + row.get('name') + '</b>' + 
                        ' - Click for more information' + 
                        '</div>' +
                        audio +
                    '</div>'
                );

                return marker;
            }.bind(this));
        },

        render: function () {
            return <div className="leaflet-map" />
        },
    });

    return module;
})(Stores, Actions, Dispatcher);
