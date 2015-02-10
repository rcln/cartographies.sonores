$(function () {
    $.get('/data', function(languages) {
        LanguageStore.load(languages);

        var LanguageList = React.createClass({
            render: function () {
                return (
                        <div>
                            <div className="content-map"><LeafletMap className="content-map" /></div>
                            <div className="content-list"><List className="content-list" /></div>
                        </div>
                       );
            }
        });

        React.render(<LanguageList />, document.getElementById('content'));
    });
});
