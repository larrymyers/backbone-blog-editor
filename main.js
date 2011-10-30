require(['jquery', 'underscore', 'backbone', 'backbone.localStorage', 'showdown', 'editor'], function() {
    $(document).ready(function() {
        Backbone.localStorageDB = new Store('editor');
        
        var App = new Editor();
    });
});