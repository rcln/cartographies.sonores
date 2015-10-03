var Actions = (function(Dispatcher) {
    var module = {}

    module.language = {
        updateFilter: function (column, value) {
            Dispatcher.handleViewAction({
                actionType: 'UPDATE_FILTER',
                column: column,
                value: value
            })
        }
    };

    return module;
})(Dispatcher);
