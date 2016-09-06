'use strict';

var Actions = (function (Dispatcher) {
    var module = {};

    module.language = {
        updateFilter: function updateFilter(column, value) {
            Dispatcher.handleViewAction({
                actionType: 'UPDATE_FILTER',
                column: column,
                value: value
            });
        }
    };

    return module;
})(Dispatcher);
//# sourceMappingURL=actions.js.map
