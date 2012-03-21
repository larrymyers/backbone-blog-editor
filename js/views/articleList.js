define(['jquery', 'backbone'], function($, Backbone) {
    return Backbone.View.extend({
        
        tagName: 'li',
        
        events: {
            'click span'   : 'selectArticle',
            'mouseover'    : 'showCloseBtn',
            'mouseout'     : 'hideCloseBtn',
            'click img'    : 'deleteArticle'
        },
        
        initialize: function(options) {
            this.model.bind('change', this.render, this);
            
            this.title = this.make('span');
            this.closeBtn = this.make('img', { src: 'img/close_sm.png', 'class': 'closeBtn' });
            
            this.$el.append(this.closeBtn);
            this.$el.append(this.title);
        },
        
        render: function() {
            $(this.title).html(this.model.get('title'));
            
            if (this.model.published()) {
                this.$el.addClass('published');
            }
            
            return this;
        },
        
        showCloseBtn: function() {
            if (this.model.published()) {
                return;
            }
            
            $(this.closeBtn).show();
        },
        
        hideCloseBtn: function() {
            $(this.closeBtn).hide();
        },
        
        selectArticle: function() {
            this.$el.siblings('li').removeClass('selected');
            this.$el.addClass('selected');
            
            localStorage.setItem('activeArticle', this.model.id);
            this.model.trigger('edit', this.model);
        },
        
        deleteArticle: function() {
            if (confirm('Delete this article?')) {
                this.model.destroy();
                this.remove();
            }
        
        }
    });
});