$(function () {
    $.get('/data', function(languages) {
        LanguageStore.load(languages);

        React.render(<List />, document.getElementById('content-list'));
        React.render(<LeafletMap />, document.getElementById('content-map'));
    });
});
