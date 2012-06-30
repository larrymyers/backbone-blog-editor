/*global require, jstestdriver*/

var ROOT = (function() {
    var $ = jstestdriver.jQuery,
        root = '/';

    $('head script').each(function(i, elt) {
        var src = elt.src,
            idx = src.indexOf('js/');

        if (idx > -1) {
            root = src.slice(0, idx+3);
            return false;
        }
    });

    return root;
})();

require.config({
    baseUrl: ROOT,
    paths: {
        jquery: 'ext/jquery-1.7.2.js',
        backbone: 'ext/backbone',
        'backbone.localStorage': 'ext/backbone.localStorage',
        underscore: 'ext/underscore',
        showdown: 'ext/showdown'
    }
});

