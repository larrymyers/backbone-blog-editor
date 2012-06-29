require.config({
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
        backbone: 'ext/backbone',
        'backbone.localStorage': 'ext/backbone.localStorage',
        underscore: 'ext/underscore',
        showdown: 'ext/showdown'
    },
    priority: ['jquery']
});

require(['jquery', 'editor'], function($, Editor) {
    $(function() {        
        new Editor();
    });
});
