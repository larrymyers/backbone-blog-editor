/*global $, jQuery, _, Backbone, require, MarkdownPreview*/

define(['jquery','backbone','backbone.localStorage'], function($, Backbone, Store) {
    var Article = Backbone.Model.extend({
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
    
    var ArticleList = Backbone.Collection.extend({
        model: Article,

        localStorage: new Store('articles'),
        
        url: '/articles/'
    });
    
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
            this.$('#article_title').val(this.model.get('title')).attr('disabled', this.model.published());
            this.$('#article_content').val(this.model.get('content'));
        },
        
        preview: function() {
            var self = this;
            
            require(['preview'], function(MarkdownPreview) {
                new MarkdownPreview({ content: self.model.allContent() }).render();
            });
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
    
    /**
     * ListView for selecting an article to edit.
     */
    var ArticleListView = Backbone.View.extend({
        
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
            
            $(this.el).append(this.closeBtn);
            $(this.el).append(this.title);
        },
        
        render: function() {
            $(this.title).html(this.model.get('title'));
            
            if (this.model.published()) {
                $(this.el).addClass('published');
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
            $(this.el).siblings('li').removeClass('selected');
            $(this.el).addClass('selected');
            
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
    
    var Editor = Backbone.View.extend({
        
        el: '#editor',
        
        articles: new ArticleList(),
        
        events: {
            'click #new_article': 'createArticle'
        },
        
        initialize: function(options) {
            var self = this;
            
            self.editView = new ArticleEditView();
            
            self.articles.bind('reset', self.renderArticleList, self);
            self.articles.fetch();
            
            $(window).resize(function() {
                self.setContentHeight();
            });
            
            self.setContentHeight();
        },
        
        setContentHeight: function() {
            var elt = $('#article_content'),
                wh = $(document).height(),
                offset = elt.offset();
            
            elt.height(wh - offset.top - 60);
        },
        
        renderArticleList: function() {
            var self = this;
            var activeId = localStorage.getItem('activeArticle');
            
            $('#articles_list').empty();
            
            self.articles.each(function(article) {
                var view = new ArticleListView({ model: article });
                
                article.bind('edit', self.editView.editArticle, self.editView);
                $('#articles_list').append(view.render().el);
                
                if (activeId === article.id) { view.selectArticle(); }
            });
        },
        
        createArticle: function() {
            var article = this.articles.create({ active: true });
            var view = new ArticleListView({ model: article });
            
            article.bind('edit', this.editView.editArticle, this.editView);
            $('#articles_list').append(view.render().el);
            
            view.selectArticle();
        }
    });
    
    return Editor;
});