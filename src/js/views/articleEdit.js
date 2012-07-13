/*global define*/
define(['backbone','preview'], function(Backbone, MarkdownPreview) {
    return Backbone.View.extend({
        
        el: '#edit_form',
        
        events: {
            'keypress #article_title': 'autoSave',
            'keypress #article_content': 'autoSave',
            'click #preview': 'preview',
            'click #publish': 'publish'
        },
        
        initialize: function() {
            this.$('#article_title').val('');
            this.$('#article_content').val('');
        },
        
        render: function() {
            this.$('#article_title').val(this.model.get('title')).attr('disabled', this.model.published());
            this.$('#article_content').val(this.model.get('content'));
        },
        
        preview: function() {
            new MarkdownPreview({ content: this.model.allContent() }).render();
        },
        
        publish: function() {
            this.model.save({
                saved_on: new Date(),
                published_on: new Date()
            });
        },
        
        autoSave: function() {
            var self = this;
            
            if (self.autoSaveId || !self.model) { return; }
            
            self.autoSaveId = setTimeout(function() {
                self.autoSaveId = null;
                self.model.save({
                    title: self.$('#article_title').val(),
                    content: self.$('#article_content').val(),
                    saved_on: new Date()
                });
            }, 2000);
        },
        
        editArticle: function(model) {
            // cleanup previous article before switching
            if (this.autoSaveId) {
                clearTimeout(this.autoSaveId);
                this.autoSaveId = null;
                
                this.model.save({
                    title: this.$('#article_title').val(),
                    content: this.$('#article_content').val(),
                    saved_on: new Date()
                });
            }
            
            // set the new article to the edit view and re-render
            this.model = model;
            this.render();
        }
    });
});