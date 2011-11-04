require(['ext/jquery','ext/underscore','ext/backbone','ext/backbone.localStorage','editor'], function() {
    $(document).ready(function() {
        Backbone.localStorageDB = new Store('editor');
        
        var App = new Editor();
    });
});