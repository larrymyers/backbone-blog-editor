/*global define*/
define(['backbone', 'backbone.localStorage', './article'], function(Backbone, Store, Article) {
    return Backbone.Collection.extend({
        model: Article,

        localStorage: new Store('articles'),
        
        url: '/articles/'
    });
});