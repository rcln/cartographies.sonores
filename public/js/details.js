'use strict';

var LanguageDetails = (function (Stores, Actions, Dispatcher) {
    var Link = ReactRouter.Link;

    var module = {};

    var AuthorView = React.createClass({
        displayName: 'AuthorView',

        render: function render() {

            var array = this.props.authors.map(function (author, i) {
                var name = author.get('name');
                var website = author.get('website');
                console.log(website);

                if (website != null) website = React.createElement(
                    'a',
                    { href: website },
                    React.createElement('i', { className: 'material-icons'}, 'language')
                );

                if (author.get('about').length > 0) {
                    return React.createElement(
                        'div',
                        { key: i, className: 'mdl-card__supporting-text' },
                        React.createElement(
                            'p',
                            null,
                            name,
                            ' ',
                            website
                        ),
                        React.createElement('div', { dangerouslySetInnerHTML: { __html: marked(author.get('about')) } })
                    );
                } else return React.createElement(
                    'div',
                    { key: i,  className: 'mdl-card__supporting-text'},
                    React.createElement(
                        'p',
                        null,
                        name,
                        ' ',
                        website
                    )
                );
            }).toArray();

            return React.createElement(
                'div',
                { className: 'showback' },
                React.createElement(
                    'div',
                    {className: 'mdl-card__title'},
                    React.createElement(
                        'h3',
                        {className: 'mdl-card__title-text'},
                        'Auteur'
                    )
                ),
                array
            );
        }
    });

    var AudioView = React.createClass({
        displayName: 'AudioView',

        render: function render() {
            if (this.props.audio != null) {
                return React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { className: 'showback mdl-card__title' },
                            React.createElement(
                                'h3',
                                { className: 'mdl-card__title-text' },
                                'Audio'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'mdl-card__actions mdl-card--border'},
                            React.createElement(
                                'audio',
                                { controls: 'controls' },
                                React.createElement('source', { src: "audio/" + this.props.audio, type: 'audio/mpeg' })
                            )
                        )
                    );
            } else {
                return React.createElement('div', null);
            }
        }
    });

    var GalleryView = React.createClass({
        displayName: 'GalleryView',

        _load_colorbox: function _load_colorbox() {
            $(".group1").colorbox({
                height: '80%',
                scale: true
            });
        },

        componentDidMount: function componentDidMount() {
            this._load_colorbox();
        },

        componentDidUpdate: function componentDidUpdate() {
            this._load_colorbox();
        },

        render: function render() {
            if (this.props.images == null) return React.createElement('div', null);

            var images = this.props.images.map(function (title, path) {
                return React.createElement(
                    'div',
                    { className: 'col-xs-4', key: path },
                    React.createElement(
                        'a',
                        { href: path, title: title, className: 'group1' },
                        React.createElement('img', { src: "thumbnails/" + path, width: '100%' })
                    )
                );
            }).toArray();
            return React.createElement(
                'div',
                { className: 'showback' },
                React.createElement(
                    'h3',
                    null,
                    'Galerie'
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    images
                )
            );
        }
    });

    var DetailView = React.createClass({
        displayName: 'DetailView',

        render: function render() {
            var lis = [];
            lis.push(React.createElement(
                'li',
                { key: 0 },
                'Nom : ',
                this.props.data.get('name')
            ));
            if (this.props.data.get('glottonym') != null) lis.push(React.createElement(
                'li',
                { key: 1 },
                'Glottonyme : ',
                this.props.data.get('glottonym')
            ));
            if (this.props.data.get('country') != null) lis.push(React.createElement(
                'li',
                { key: 2 },
                'Région(s) : ',
                this.props.data.get('country')
            ));
            if (this.props.data.get('family') != null) lis.push(React.createElement(
                'li',
                { key: 3 },
                'Famille : ',
                this.props.data.get('family')
            ));
            if (this.props.data.get('speakers') != null) lis.push(React.createElement(
                'li',
                { key: 4 },
                'Locuteurs : ',
                this.props.data.get('speakers')
            ));

            return React.createElement(
                'div',
                { className: 'showback' },
                React.createElement(
                    'div',
                    {className: 'mdl-card__title'},
                    React.createElement(
                        'h3',
                        {className: 'mdl-card__title-text'},
                        'Détails'
                    )
                ),
                React.createElement(
                    'ul',
                    null,
                    lis
                )
            );
        }
    });

    var MapViewLeaflet = React.createClass({
        displayName: 'MapViewLeaflet',

        componentDidMount: function componentDidMount() {
            this._map = L.map(this.getDOMNode()).setView([51.505, -0.09], 2);

            L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                minZoom: 2,
                maxZoom: 8,
                subdomains:['mt0','mt1','mt2','mt3']
                //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            }).addTo(this._map);

            this._createMarkers();
        },

        render: function render() {
            return React.createElement('div', { className: 'leaflet-map-detail' });
        },

        componentDidUpdate: function componentDidUpdate() {
            this._markers.forEach((function (marker) {
                this._map.removeLayer(marker);
            }).bind(this));

            this._createMarkers();
        },

        _createMarkers: function _createMarkers() {
            var icon_opt = this.props.status;
            if (icon_opt == "dangers") icon_opt = { icon: LRedIcon };else if (icon_opt == "morte") icon_opt = { icon: LGreyIcon };else icon_opt = {};

            this._markers = this.props.positions.map((function (position) {
                var lat = position.get(0);
                var lon = position.get(1);

                return L.marker([lat, lon], icon_opt).addTo(this._map);
            }).bind(this));

            var group = new L.featureGroup(this._markers.toArray());
            this._map.fitBounds(group.getBounds(), { padding: [50, 50] });
        }
    });

    var MapView = React.createClass({
        displayName: 'MapView',

        render: function render() {
            if (this.props.positions != null) {
                return React.createElement(
                    'div',
                    { className: 'showback' },
                    React.createElement(
                        'div',
                        {className: 'mdl-card__title'},
                        React.createElement(
                            'h3',
                            {className: 'mdl-card__title-text'},
                            'Localisation'
                        )
                    ),
                    React.createElement(MapViewLeaflet, { positions: this.props.positions, status: this.props.status })
                );
            } else {
                return null;
            }
        }
    });

    module.view = React.createClass({
        displayName: 'view',

        getInitialState: function getInitialState() {
            return this.getState();
        },

        componentDidMount: function componentDidMount() {
            Stores.details.on('update', this._update);
        },

        componentWillUnmount: function componentWillUnmount() {
            Stores.details.off('update', this._update);
        },

        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.setState(this.getState(nextProps));
        },

        render: function render() {
            if (this.state.loading) {
                return React.createElement(
                    'div',
                    null,
                    'Loading...'
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'mdl-layout__content' },
                        React.createElement(
                            Link,
                            { to: 'app'},
                            React.createElement(
                                'button',
                                {className: 'mdl-button mdl-js-button mdl-button--icon mdl-button--accent'},
                                React.createElement(
                                    'i',
                                    {className: 'material-icons' },
                                    'chevron_left'
                                )
                            ),
                            'Retourner à la liste des langues'
                        ),
                        React.createElement(
                            'section',
                            {className: 'mdl-grid'},
                            React.createElement(
                                'div',
                                { className: 'mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--8-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' },
                                React.createElement(
                                    'div',
                                    {className: 'mdl-card__title'},
                                    React.createElement(
                                        'h3',
                                        {className: 'mdl-card__title-text'},
                                        this.state.name
                                    )
                                ),
                                React.createElement('div', { className: 'tiny_image mdl-card__supporting-text', dangerouslySetInnerHTML: { __html: marked(this.state.content) } })
                            ),
                            React.createElement(
                                'div',
                                { className: 'mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--3-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' },
                                React.createElement(AudioView, { audio: this.state.audio }),
                                React.createElement(MapView, { positions: this.state.positions, status: this.state.status }),
                                React.createElement(DetailView, { data: this.state.data }),
                                React.createElement(GalleryView, { images: this.state.images }),
                                React.createElement(AuthorView, { authors: this.state.authors })
                            )
                        )
                    )
                );
            }
        },

        _update: function _update() {
            this.setState(this.getState());
        },

        getState: function getState(props) {
            props = props ? props : this.props;

            var data = Stores.details.get(props.language_id);
            if (data === null) return { language_id: props.language_id, loading: true };else {
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
//# sourceMappingURL=details.js.map
