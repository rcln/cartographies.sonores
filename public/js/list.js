"use strict";

var LanguageList = (function (Stores, Actions, Dispatcher) {
    var module = {};
    var Link = ReactRouter.Link;

    var TableRow = React.createClass({
        displayName: "TableRow",

        getDefaultProps: function getDefaultProps() {
            return { header: false };
        },

        render: function render() {
            var props = this.props;
            var column_ids = ["Langue", "Glottonyme", "Pays", "Famille", "Locuteurs"]; //needed for responsive table 
            var items = this.props.items.map(function (v, col) {
                if (props.header) return React.createElement(
                        "th",
                        { key: col },
                        v
                    );
                else return React.createElement(
                    "td",
                    { className: "status-" + props.status, key: col, "data-title": column_ids[col] },
                    React.createElement(
                        Link,
                        { to: "langue", params: { langue_id: props.item_id } },
                        v
                    )
                );
            }).toArray();

            var style = props.display? {} : { display: 'none' };
            return React.createElement(
                "tr",
                { style: style },
                items
            );
        }
    });

    var SearchCell = React.createClass({
        displayName: "SearchCell",

        render: function render() {
            return React.createElement(
                "td",
                null,
                React.createElement("input", { onChange: this._onChange })
            );
        },

        _onChange: function _onChange(e) {
            this.props.callback(e.target.value);
        }
    });

    var Table = React.createClass({
        displayName: "Table",

        getInitialState: function getInitialState() {
            return { display: Stores.language.getDisplay() };
        },

        componentDidMount: function componentDidMount() {
            Stores.language.on('update_display', this._updateDisplay);
        },

        componentWillUnmount: function componentWillUnmount() {
            Stores.language.off('update_display', this._updateDisplay);
        },

        render: function render() {
            var props = this.props;
            var state = this.state;

            var rows = props.data.map(function (r, i) {
                var items = props.columns.map(function (c) {
                    return r.get(c);
                });

                return React.createElement(TableRow, {
                    key: i,
                    items: items,
                    status: r.get('status'),
                    display: state.display.get(i),
                    item_id: r.get('id') });
            }).toArray();

            var _filter = this._filter;
            var search_row = props.columns.map(function (c, i) {
                var cb = function cb(value) {
                    _filter(c, value);
                };
                return React.createElement(SearchCell, { key: i, callback: cb });
            }).toArray();

            return  React.createElement(
                        'form',
                        null,
                        React.createElement(
                            'div',
                            {className: 'mdl-textfield mdl-js-textfield"'},
                            React.createElement(
                                'label', 
                                {'htmlFor': 'rechercher', className: 'mdl-textfield__label'},
                                React.createElement(
                                    'i',
                                    {className: 'material-icons'},
                                    'search'
                                )
                            ),
                            React.createElement(
                                'div',
                                {className: 'mdl-textfield'},
                                React.createElement(
                                    'input', 
                                    {id: 'rechercher', type: 'text', className: 'search mdl-textfield__input'}
                                ),
                                React.createElement(
                                    'label', 
                                    {'htmlFor': 'rechercher', className: 'mdl-textfield__label'},
                                    'Rechercher'
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            {className: "table-responsive-vertical shadow-z-1"},
                            React.createElement(
                                "table",
                                { id: "table", className: "table table-hover table-mc-light-blue table-bordered" },
                                React.createElement(
                                    "thead",
                                    null,
                                    React.createElement(TableRow, { header: true, items: props.column_names, display: true })
                                ),
                                React.createElement(
                                    "tbody",
                                    null,
                                    rows
                                )
                            )
                        )
                    );
        },

        _filter: function _filter(column, value) {
            Actions.language.updateFilter(column, value);
        },

        _updateDisplay: function _updateDisplay() {
            this.setState({ display: Stores.language.getDisplay() });
        }
    });

    module.view = React.createClass({
        displayName: "view",

        getInitialState: function getInitialState() {
            return { data: Stores.language.getAll() };
        },

        render: function render() {
            return React.createElement(Table, {
                data: this.state.data,
                columns: Immutable.List(['name', 'glottonym', 'country', 'family', "speakers"]),
                column_names: Immutable.List(['Langue', 'Glottonyme', 'Pays', 'Famille', "Locuteurs"])
            });
        }
    });

    return module;
})(Stores, Actions, Dispatcher);
//# sourceMappingURL=list.js.map
