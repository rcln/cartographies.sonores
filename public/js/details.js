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
                                <div className="row mt">
                                    <div className="col-lg-9">
                                        <p onClick={ function () { Actions.app.showList() } }>
                                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                            Retourner à la liste des langues
                                        </p>
                                        <h3>{ this.state.language }</h3>

                                        <p>Cette partie pourra contenir du texte, des images, des enregistrements sonores, ...</p>

                                    </div>
                                    <div className="col-lg-3">
                                        <div className="showback">
                                            <h4>Auteur</h4>
                                            <p>{ this.state.authors }</p>
                                        </div>
                                        <div className="showback">
                                            <h4>Résumé</h4>
                                        </div>
                                        <div className="showback">
                                            <h4>Sources</h4>
                                        </div>
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
                    language: Stores.details.data.get('language'),
                    authors: Stores.details.data.get('author')
                };
            }
        }
    });

    return module;
})(Stores, Actions, Dispatcher);
