
/*
 * We do not use a Flux architecture for this prototype, so things
 * are a bit ugly...
 */

var LanguageStore = (function() {
    var Store = function () {
        this._data = Immutable.fromJS(data_list);
        this._displayed = this._data.map(function() { return true; })

        this._filters = Immutable.Map({});
        this._columns = this._data.get(0).keySeq();

        this._columns.forEach(function (c) {
            this._filters = this._filters.set(c, "");
        }.bind(this));
    };
    Store.prototype = new EventEmitter();

    Store.prototype.getDisplay = function () {
        return this._displayed;
    };

    Store.prototype.getAll = function() {
            return this._data;
    };

    Store.prototype.updateFilter = function(column, value) {
        this._filters = this._filters.set(column, value.toLowerCase());

        var _filters = this._filters;
        var columns = this._columns;

        this._displayed = this._data.map(function(row) {
            return _filters.keySeq().every(function(column) {
                var value = String(row.get(column)).toLowerCase();
                var filter = _filters.get(column);
                return value.indexOf(filter) >= 0;
            });
        });

        this.trigger('update_display');
    };

    return new Store();
} ());
