require(
    [
        'order!https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js',
        'order!ext/underscore',
        'order!ext/backbone',
        'order!ext/backbone.localStorage',
        'order!editor'
    ],
    function() {
        $(document).ready(function() {
            Backbone.localStorageDB = new Store('editor');
        
            var App = new Editor();
        });
    }
);