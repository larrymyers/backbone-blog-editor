define(['backbone.localStorage', './article'], function(Store, Article) {
    return Backbone.Collection.extend({
        model: Article,

        localStorage: new Store('articles'),
        
        url: '/articles/'
    });
});