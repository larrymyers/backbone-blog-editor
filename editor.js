(function($) {
    var Article = Backbone.Model.extend({
        defaults: function() {
            return {
                title: 'New Article',
                content: '',
                created_on: new Date(),
                saved_on: null,
                published_on: null
            }
        }
    });
    
    var ArticleList = Backbone.Collection.extend({
        model: Article,
        
        url: '/articles/',
    });
    
    /**
     * View for editing / publishing an article.
     */
    var ArticleEditView = Backbone.View.extend({
        
        el: '#edit_form',
        
        events: {
            'keypress #article_title': 'autoSave',
            'keypress #article_content': 'autoSave',
            'click #preview': 'preview',
            'click #publish': 'publish'
        },
        
        initialize: function(options) {
            this.$('#article_title').val('');
            this.$('#article_content').val('');
        },
        
        render: function() {
            this.$('#article_title').val(this.model.get('title'));
            this.$('#article_content').val(this.model.get('content'));
        },
        
        preview: function() {
            new ArticlePreview({ model: this.model }).render();
        },
        
        publish: function() {
            
        },
        
        autoSave: function() {
            var self = this;
            
            if (self.autoSaveId || !self.model) { return; }
            
            self.autoSaveId = setTimeout(function() {
                console.log('autosaved model ' + self.model.id);
                self.autoSaveId = null;
                self.model.save({
                    title: self.$('#article_title').val(),
                    content: self.$('#article_content').val()
                });
            }, 2000);
        },
        
        editArticle: function(model) {
            this.model = model;
            this.render();
        }
    });
    
    var ArticlePreview = Backbone.View.extend({
        
        initialize: function(options) {
            $(this.el).addClass('modal');
            this.shadow = $(this.make('div', { class: 'shadow' }));
        },
        
        render: function() {
            var converter = new Showdown.converter(),
                htmlContent = converter.makeHtml(this.model.get('content')),
                height = $(window).height(),
                width = $(window).width();
            
            this.shadow.height(height).width(width);
            
            $(this.el).html(htmlContent);
            
            var centerWidth = width/2 - $(this.el).width()/2;
            
            $(this.el).css('left', centerWidth + 'px')
            
            $('body').append(this.shadow);
            $('body').append(this.el);
        }
    });
    
    /**
     * ListView for selecting an article to edit.
     */
    var ArticleListView = Backbone.View.extend({
        
        tagName: 'li',
        
        events: {
            'click': 'selectArticle'
        },
        
        initialize: function(options) {
            this.model.bind('change', this.render, this);
        },
        
        render: function() {
            $(this.el).html(this.model.get('title'));
            
            return this;
        },
        
        selectArticle: function() {
            this.model.trigger('edit', this.model);
        }
    });
    
    var Editor = Backbone.View.extend({
        
        el: '#wrapper',
        
        articles: new ArticleList(),
        
        events: {
            'click #new_article': 'createArticle'
        },
        
        initialize: function(options) {
            this.editView = new ArticleEditView();
            
            this.articles.bind('reset', this.renderArticleList, this);
            
            this.articles.fetch();
        },
        
        renderArticleList: function() {
            var self = this;
            
            $('#articles_list').empty();
            
            self.articles.each(function(article) {
                var view = new ArticleListView({ model: article });
                
                article.bind('edit', self.editView.editArticle, self.editView);
                $('#articles_list').append(view.render().el);
            });
        },
        
        createArticle: function() {
            var article = this.articles.create();
            var view = new ArticleListView({ model: article });
            
            article.bind('edit', this.editView.editArticle, this.editView);
            $('#articles_list').append(view.render().el);
        }
    });
    
    window.Editor = Editor;
})(jQuery);