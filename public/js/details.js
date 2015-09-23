var LanguageDetails = (function (Stores, Actions, Dispatcher) {
    var module = {};

    AuthorView = React.createClass({
        render: function() {

            array = this.props.authors.map(function(author) {
                name = author.get('name');

                if (author.get('about').length > 0) 
                {
                    return (
                        <div>
                            <p>{ name }</p>
                            <div dangerouslySetInnerHTML={{__html: marked(author.get('about')) }} />
                        </div>
                    );
                }
                else
                    return <div><p>{ name }</p></div>;
            }).toArray();

            return (
                <div className="showback">
                    <h4>Auteur</h4>
                    { array }
                </div>
            )
        }
    });

    GaleryView = React.createClass({
        _load_colorbox: function () {
            $(".group1").colorbox({rel:'group1', height:'80%', scale: true});
        }, 

        componentDidMount: function () {
            this._load_colorbox();
        },

        componentDidUpdate: function () {
            this._load_colorbox();
        },

        render: function () {
            if (this.props.images == null)
                return <div></div>

            images = this.props.images.map(function(title, path) {
                console.log(path, title);
                return (
                        <div className="col-xs-4">
                            <a href={path} title={title} className="group1"><img src={"thumbnails/" + path} width="100%" /></a>
                        </div>
                       );
            }).toArray();
            return (
                    <div className="showback">
                        <h4>Galerie</h4>
                        <div className="row">
                            { images }
                        </div>
                    </div>
                   );
        }
    });

    DetailView = React.createClass({
        render: function () {
            lis = [];
            lis.push(<li>Nom : { this.props.data.get('name') }</li>);
            if (this.props.data.get('glottonym') != null)
                lis.push(<li>Glottonyme : { this.props.data.get('glottonym') }</li>);
            if (this.props.data.get('country') != null)
                lis.push(<li>Pays : { this.props.data.get('country') }</li>);
            if (this.props.data.get('family') != null)
                lis.push(<li>Famille : { this.props.data.get('family') }</li>);

            return (
                <div className="showback">
                    <h4>Détails</h4>
                    <ul>{ lis }</ul>
                </div>
            );
        }
    });

    MapViewLeaflet = React.createClass({
        componentDidMount: function () {
            this._map = L.map(this.getDOMNode()).setView([51.505, -0.09], 2);

            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {
                        minZoom: 2, 
                        maxZoom: 8, 
                        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    }).addTo(this._map);

            this._markers = this.props.positions.map(function (position) {
                lat = position.get(0);
                lon = position.get(1);

                return L.marker([lat, lon]).addTo(this._map);
            }.bind(this));

            var group = new L.featureGroup(this._markers.toArray());
            this._map.fitBounds(group.getBounds(), {padding: [50, 50]});

            this._createMarkers();
        },

        render: function () {
            return <div className="leaflet-map-detail" />
        },

        componentDidUpdate: function () {
            this._markers.forEach(function (marker) {
                this._map.removeLayer(marker);
            }.bind(this));

            this._createMarkers();
        },

        _createMarkers: function () {
            this._markers = this.props.positions.map(function (position) {
                lat = position.get(0);
                lon = position.get(1);

                return L.marker([lat, lon]).addTo(this._map);
            }.bind(this));

            var group = new L.featureGroup(this._markers.toArray());
            this._map.fitBounds(group.getBounds(), {padding: [50, 50]});
        }
    });

    MapView = React.createClass({
        render: function () {
            if (this.props.positions != null) {
                return (
                    <div className="showback">
                        <h4>Localisation</h4>
                        <MapViewLeaflet positions={ this.props.positions } />
                    </div>
                );
            } else {
                return null;
            }
        }
    });

    module.view = React.createClass({
        getInitialState: function () {
            return this.getState();
        },

        componentDidMount: function () {
            Stores.details.on('update', this._update);
        },

        componentWillUnmount: function() {
            Stores.details.off('update', this._update);
        },

        render: function () {
            if (this.state.loading) {
                return <div>Loading...</div>;
            } else {
                return (
                            <div>
                                <div className="row mt">
                                    <div className="col-lg-9">
                                        <p onClick={ function () { Actions.app.showList() } }>
                                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                            &lt; Retourner à la liste des langues
                                        </p>
                                        <h3>{ this.state.name }</h3>

                                        <div className="tiny_image" dangerouslySetInnerHTML={{__html: marked(this.state.content) }} />

                                    </div>
                                    <div className="col-lg-3">
                                        <MapView positions={ this.state.positions } />
                                        <DetailView data={ this.state.data } />
                                        <GaleryView images={ this.state.images } />
                                        <AuthorView authors={ this.state.authors } />
                                    </div>
                                </div>
                            </div>
                       );
            }
        },

        _update: function () {
            this.setState(this.getState());
        },
        
        getState: function () {
            if (Stores.details.data === null)
                return { language_id: Stores.details.language_id, loading: true };
            else 
            {
                return {
                    language_id: Stores.details.language_id, 
                    loading: false, 
                    data: Stores.details.data,
                    content: Stores.details.data.get('content'),
                    name: Stores.details.data.get('name'),
                    authors: Stores.details.data.get('authors'),
                    positions: Stores.details.data.get('positions'),
                    images: Stores.details.data.get('images')
                };
            }
        }
    });

    return module;
})(Stores, Actions, Dispatcher);
