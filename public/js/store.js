
/*
 * We do not use a Flux architecture for this prototype, so things
 * are a bit ugly...
 */

var LanguageStore = (function() {
    var Store = function () {
        this.load([]);
    };
    Store.prototype = new EventEmitter();

    Store.prototype.load = function (data) {
        this._data = Immutable.fromJS(data);
        this._displayed = this._data.map(function() { return true; });

        this._filters = Immutable.Map({});

        if (this._data.count() == 0)
            this._columns = Immutable.List();
        else
            this._columns = this._data.get(0).keySeq();

        this._columns.forEach(function (c) {
            this._filters = this._filters.set(c, "");
        }.bind(this));

        this.trigger('update');
    };

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
