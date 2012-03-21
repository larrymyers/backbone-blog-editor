define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        defaults: function() {
            return {
                title: 'New Article',
                content: '',
                created_on: new Date(),
                saved_on: null,
                published_on: null
            };
        },
        
        allContent: function() {
            return '#' + this.get('title') + "\n" + this.get('content');
        },
        
        hasUnpublishedContent: function() {
            return published_on < saved_on;
        },
        
        published: function() {
            return this.get('published_on') !== null;
        }
    });
});