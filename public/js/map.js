
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
                console.log("lat: " + row.get('lat'));
                var marker = L.marker([row.get('lat'), row.get('lon')]).addTo(map);
                marker.bindPopup(
                    '<div onClick="Actions.app.showDetails(' + row.get('id') + ');">'+
                    '<b>' + row.get('language') + '</b><br />' + 
                    'Click for more information' + 
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
