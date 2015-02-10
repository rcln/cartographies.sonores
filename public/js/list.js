

var TableRow = React.createClass({
    getDefaultProps: function () {
        return { header: false };
    },

    render: function () {
        var props = this.props;

        var items = this.props.items.map(function(v) {
            if (props.header)
                return <th>{v}</th>;
            else
                return <td>{v}</td>;
        }).toArray();

        var style = { display: props.display ? 'table-row' : 'none' };
        return <tr style={style}>{items}</tr>;
    }
});

var SearchCell = React.createClass({
    render: function () {
        return <td><input onChange={this._onChange}/></td>;
    },

    _onChange: function (e) {
        this.props.callback(e.target.value);
    }
});

var Table = React.createClass({
    getInitialState: function() {
        return { display: LanguageStore.getDisplay() };
    },

    componentDidMount: function () {
        LanguageStore.on('update_display', this._updateDisplay);
    },

    componentWillUnmount: function() {
        LanguageStore.off('update_display', this._updateDisplay);
    },

    render: function() {
        var props = this.props;
        var state = this.state;

        var rows = props.data.map(function(r, i) {
            var items = props.columns.map(function(c) {
                return r.get(c);
            });

            return <TableRow items={items} display={state.display.get(i)} />
        }).toArray();

        var _filter = this._filter;
        var search_row = props.columns.map(function(c) {
            var cb = function (value) { _filter(c, value) };
            return <SearchCell callback={cb} />;
        }).toArray();

        return (
                <table>
                    <TableRow header={true} items={props.columns} />
                    <tr>{search_row}</tr>
                    {rows}
                </table>
               );
    },

    _filter: function(column, value) {
        LanguageStore.updateFilter(column, value);
    },

    _updateDisplay: function () {
        this.setState({ display: LanguageStore.getDisplay() });
    }
});

var List = React.createClass({
    getInitialState: function() {
        return { data: LanguageStore.getAll() };
    },

    render: function() {
        var list = this.state.data.map(function(v, i) {
            return <Table
                        key={i} 
                        id={v.get('id')} 
                        language={v.get('language')} 
                        author={v.get('author')} 
                        lexifier={v.get('lexifier')} 
                        region={v.get('region')} 
                   />;
        }).toArray();

        return (
                <Table data={this.state.data} columns={Immutable.List(['id', 'language', 'author', 'lexifier', 'region'])} />
               );
    }
});
