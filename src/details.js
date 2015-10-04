var LanguageDetails = (function (Stores, Actions, Dispatcher) {
    var Link = ReactRouter.Link;

    var module = {};

    var AuthorView = React.createClass({
        render: function() {

            var array = this.props.authors.map(function(author, i) {
                var name = author.get('name');

                if (author.get('about').length > 0) 
                {
                    return (
                        <div key={i}>
                            <p>{ name }</p>
                            <div dangerouslySetInnerHTML={{__html: marked(author.get('about')) }} />
                        </div>
                    );
                }
                else
                    return <div key={i}><p>{ name }</p></div>;
            }).toArray();

            return (
                <div className="showback">
                    <h4>Auteur</h4>
                    { array }
                </div>
            )
        }
    });

    var AudioView = React.createClass({
        render: function () {
            if (this.props.audio != null)
            {
                return (
                        <div className="showback">
                            <h4>Audio</h4>
                            <audio controls="controls">
                                <source src={"audio/" + this.props.audio} type="audio/mpeg" />
                            </audio>
                        </div>
                       );
            }
            else
            {
                return <div></div>;
            }
        }
    });

    var GalleryView = React.createClass({
        _load_colorbox: function () {
            $(".group1").colorbox({
                height:'80%', 
                scale: true
            });
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

            var images = this.props.images.map(function(title, path) {
                return (
                        <div className="col-xs-4" key={path}>
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

    var DetailView = React.createClass({
        render: function () {
            var lis = [];
            lis.push(<li key={0}>Nom : { this.props.data.get('name') }</li>);
            if (this.props.data.get('glottonym') != null)
                lis.push(<li key={1}>Glottonyme : { this.props.data.get('glottonym') }</li>);
            if (this.props.data.get('country') != null)
                lis.push(<li key={2}>Pays : { this.props.data.get('country') }</li>);
            if (this.props.data.get('family') != null)
                lis.push(<li key={3}>Famille : { this.props.data.get('family') }</li>);
            if (this.props.data.get('speakers') != null)
                lis.push(<li key={3}>Locuteurs : { this.props.data.get('speakers') }</li>);

            return (
                <div className="showback">
                    <h4>Détails</h4>
                    <ul>{ lis }</ul>
                </div>
            );
        }
    });

    var MapViewLeaflet = React.createClass({
        componentDidMount: function () {
            this._map = L.map(this.getDOMNode()).setView([51.505, -0.09], 2);

            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    {
                        minZoom: 2, 
                        maxZoom: 8, 
                        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    }).addTo(this._map);


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
            var icon_opt = this.props.status;
            if (icon_opt == "dangers")
                icon_opt = {icon: LRedIcon};
            else if (icon_opt == "morte")
                icon_opt = {icon: LGreyIcon};
            else
                icon_opt = {};

            this._markers = this.props.positions.map(function (position) {
                var lat = position.get(0);
                var lon = position.get(1);

                return L.marker([lat, lon], icon_opt).addTo(this._map);
            }.bind(this));

            var group = new L.featureGroup(this._markers.toArray());
            this._map.fitBounds(group.getBounds(), {padding: [50, 50]});
        }
    });

    var MapView = React.createClass({
        render: function () {
            if (this.props.positions != null) {
                return (
                    <div className="showback">
                        <h4>Localisation</h4>
                        <MapViewLeaflet positions={ this.props.positions } status={ this.props.status }/>
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

        componentWillReceiveProps: function(nextProps) {
            this.setState(this.getState(nextProps));
        },

        render: function () {
            if (this.state.loading) {
                return <div>Loading...</div>;
            } else {
                return (
                        <div>
                            <div className="row mt">
                                <div className="col-lg-9">
                                    <Link to="app">
                                        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                        Retourner à la liste des langues
                                    </Link>
                                    <h3>{ this.state.name }</h3>

                                    <div className="tiny_image" dangerouslySetInnerHTML={{__html: marked(this.state.content) }} />

                                </div>
                                <div className="col-lg-3">
                                    <AudioView audio={ this.state.audio } />
                                    <MapView positions={ this.state.positions } status={ this.state.status }/>
                                    <DetailView data={ this.state.data } />
                                    <GalleryView images={ this.state.images } />
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
        
        getState: function (props) {
            props = props ? props : this.props;

            var data = Stores.details.get(props.language_id);
            if (data === null)
                return { language_id: props.language_id, loading: true };
            else 
            {
                return {
                    language_id: props.language_id, 
                    loading: false, 
                    data: data,
                    content: data.get('content'),
                    name: data.get('name'),
                    authors: data.get('authors'),
                    positions: data.get('positions'),
                    images: data.get('images'),
                    status: data.get('status'),
                    audio: data.get('audio')
                };
            }
        }
    });

    return module;
})(Stores, Actions, Dispatcher);
