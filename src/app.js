$(function () {
    var DefaultRoute = ReactRouter.DefaultRoute;
    var Link = ReactRouter.Link;
    var Route = ReactRouter.Route;
    var RouteHandler = ReactRouter.RouteHandler;


    $.get('data', function(languages) {
        Stores.language.load(languages);

        var ListView = React.createClass({
            render: function () {
                return (
                        <div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="content-panel"><LanguageMap.view className="content-map" /></div>
                                </div>
                                <div className="col-md-12 mt">
                                    <div className="content-panel"><LanguageList.view className="content-list" /></div>
                                </div>
                            </div>
                        </div>
                       );
            }
        });

        var DetailsView = React.createClass({
            contextTypes: {
                router: React.PropTypes.func
            },

            render: function () {
                var id = this.context.router.getCurrentParams().langue_id;
                return (<LanguageDetails.view language_id={id} />);
            }
        });

        var AppView = React.createClass({
            render: function () {
                return (
                    <div>
                        <header className="header black-bg">
                            <Link to="app" className="logo"><b>Cartographies Sonores</b></Link>
                            <div id="header-logo">
                                <img src="images/logo_labex.jpg" />
                                <img src="images/logo_cnrs.png" />
                                <img src="images/logo_lipn.png" />
                                <img src="images/logo_paris13.jpg" />
                            </div>
                        </header>
                      
                      <section id="main-content">
                          <section className="wrapper">
                            <div id="data-content">
                                <RouteHandler />
                            </div>
                        </section>
                      </section>
                    </div>
                );
            }
        });

        var routes = (
          <Route name="app" path="/" handler={AppView}>
            <DefaultRoute handler={ListView} />
            <Route name="langue" path="langue/:langue_id" handler={DetailsView}/>
          </Route>
        );

        ReactRouter.run(routes, function (Handler) {
          React.render(<Handler/>, document.getElementById('container'));
        });
    });
});
