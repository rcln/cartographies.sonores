var Actions = (function(Dispatcher) {
    var module = {}

    module.app = {
        showList: function () {
            Dispatcher.handleViewAction({
                actionType: 'SHOW_LIST',
            })
        },
        showDetails: function (id) {
            Dispatcher.handleViewAction({
                actionType: 'SHOW_DETAILS',
                language_id: id
            })
        }
    };

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
