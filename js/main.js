/*global require*/
require.config({
    paths: {
        jquery: 'ext/jquery-1.7.2.js',
        backbone: 'ext/backbone',
        'backbone.localStorage': 'ext/backbone.localStorage',
        underscore: 'ext/underscore',
        showdown: 'ext/showdown'
    }
});

require(['jquery', 'editor'], function($, Editor) {
    $(function() {        
        window.App = new Editor();
    });
});
