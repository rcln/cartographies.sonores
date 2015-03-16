var LanguageDetails = (function (Stores, Actions, Dispatcher) {
    var module = {};

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
                                <h1>{ this.state.language }</h1>
                                <p onClick={ function () { Actions.app.showList() } }>Return to list</p>
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
                    language: Stores.details.data.get('language')
                };
            }
        }
    });

    return module;
})(Stores, Actions, Dispatcher);
