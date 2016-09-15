'use strict';

$(function () {
    $(document).bind('cbox_complete', function () {});

    var DefaultRoute = ReactRouter.DefaultRoute;
    var Link = ReactRouter.Link;
    var Route = ReactRouter.Route;
    var RouteHandler = ReactRouter.RouteHandler;

    $.get('data', function (languages) {
        Stores.language.load(languages);
        var ListView = React.createClass({
            displayName: 'ListView',

            render: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'mdl-card mdl-card--expand mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' },
                        React.createElement(
                            'div',
                            { className: 'mdl-grid mdl-cell--12-col' },
                            React.createElement(
                                'div',
                                { className: 'content-panel mdl-cell mdl-cell--12-col mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' },
                                React.createElement(
                                    LanguageMap.view, 
                                    { className: 'content-map' }
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' },
                        React.createElement(
                            'div',
                            { className: 'mdl-grid mdl-cell--12-col' },
                            React.createElement(
                                'div',
                                { className: 'content-panel mdl-cell mdl-cell--12-col mdl-cell--12-col-desktop mdl-cell--12-col-tablet mdl-cell--12-col-phone' },
                                React.createElement(LanguageList.view, { className: 'content-list' })
                            )
                        )
                    )
                );
            }
        });

        var DetailsView = React.createClass({
            displayName: 'DetailsView',

            contextTypes: {
                router: React.PropTypes.func
            },

            render: function render() {
                var id = this.context.router.getCurrentParams().langue_id;
                return React.createElement(LanguageDetails.view, { language_id: id });
            }
        });

        var AppView = React.createClass({
            displayName: 'AppView',

            render: function render() {
                return React.createElement(
                    'div',
                    {className: "mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-drawer-button"},
                    React.createElement(
                        'header',
                        { className: 'header black-bg mdl-layout__header mdl-layout__header' },
                        React.createElement(
                            'div',
                            {className: 'header-logo center-logo mdl-layout__header-row mdl-cell--hide-desktop', 
                                style: {'background-color': 'white'}},
                             React.createElement(
                                 'nav',
                                 {className: 'header-logo header-logo-large mdl-navigation'},
                                 React.createElement('img', { src: 'images/logo_labex.jpg' }),
                                 React.createElement('img', { src: 'images/logo_cnrs.png' }),
                                 React.createElement('img', { src: 'images/logo_lipn.png' }),
                                 React.createElement('img', { src: 'images/logo_paris13.jpg' }) 
                             )
                        ),
                        React.createElement(
                            'div',
                            {className: 'mdl-layout__header-row', style: {"padding-right": "0px"}},
                            React.createElement(
                                'span',
                                {id: 'header-title', className: 'mdl-layout-title'},
                                React.createElement(
                                    Link,
                                    { to: 'app', className: 'logo' },
                                    React.createElement(
                                        'b',
                                        null,
                                        'Cartographies Sonores'
                                    )
                                )
                             ),
                             React.createElement(
                                 'div',
                                 {className: 'mdl-layout-spacer'}
                             ),

                             React.createElement(
                                'div',
                                {className: 'header-logo-container'},
                                React.createElement(
                                    'nav',
                                    {className: 'header-logo mdl-navigation mdl-cell--hide-tablet mdl-cell--hide-phone' },
                                    React.createElement('img', { src: 'images/logo_labex.jpg' }),
                                    React.createElement('img', { src: 'images/logo_cnrs.png' }),
                                    React.createElement('img', { src: 'images/logo_lipn.png' }),
                                    React.createElement('img', { src: 'images/logo_paris13.jpg' }) 
                                )
                             )
                        )
                    ),
                    React.createElement(
                        'main',
                        { id: 'main-content', className: 'mdl-layout__content'},
                        React.createElement(
                            'section',
                            { className: 'wrapper', id: 'data-content'},
                            React.createElement(RouteHandler, null)
                        )
                    )
                );
            }
        });

        var routes = React.createElement(
            Route,
            { name: 'app', path: '/', handler: AppView },
            React.createElement(DefaultRoute, { handler: ListView }),
            React.createElement(Route, { name: 'langue', path: 'langue/:langue_id', handler: DetailsView })
        );

        ReactRouter.run(routes, function (Handler) {
            React.render(React.createElement(Handler, null), document.getElementById('container'));
            document.languages_search = [];
            $('#table tbody tr').each(function(current_key, current){
                document.languages_search[current_key] = {'id': $(current).attr("data-reactid"), 'text': '' };
                $(current).find("td a").each(function(v, e){ 
                    document.languages_search[current_key]['text'] += e.innerText.toLowerCase().replace(/[,.]/g,"") + " ";
                })
            });
        });
    });
});
//# sourceMappingURL=app.js.map
