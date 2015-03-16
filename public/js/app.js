$(function () {
    $.get('/data', function(languages) {
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
                                    <div className="content-map"><LanguageMap.view className="content-map" /></div>
                                    <div className="content-list"><LanguageList.view className="content-list" /></div>
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
        React.render(<App />, document.getElementById('content'));
    });
});
