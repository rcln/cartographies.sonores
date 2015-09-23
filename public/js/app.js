$(function () {
    $.get('data', function(languages) {
        Stores.language.load(languages);

        var App = React.createClass({
            getInitialState: function () {
                return {showList: true}
            },

            componentDidMount: function () {
                Stores.app.on('update', this._update);
            },

            componentWillUnmount: function() {
                Stores.app.off('update', this._update);
            },

            render: function () {
                var s1 = {display: this.state.showList ? 'block ' : 'none'};
                var s2 = {display: this.state.showList ? 'none' : 'block'};
                return (
                            <div>
                                <div style={s1}>
                                    <h3>Langues</h3>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="content-panel"><LanguageMap.view className="content-map" /></div>
                                        </div>
                                        <div className="col-md-12 mt">
                                            <div className="content-panel"><LanguageList.view className="content-list" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div style={s2}>
                                    <LanguageDetails.view />
                                </div>
                            </div>
                       );
            },

            _update: function () {
                if (Stores.app.details === null)
                    this.setState({showList: true});
                else
                    this.setState({showList: false});
            }
        });
        React.render(<App />, document.getElementById('data-content'));

        // remove this
        // Actions.app.showDetails('3');
    });
});
