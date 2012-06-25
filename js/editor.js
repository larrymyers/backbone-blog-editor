define(['jquery',
        'backbone',
        'models/articles',
        'views/articleEdit', 
        'views/articleList',
        'views/articleUpload'], 
function($, Backbone, ArticleList, ArticleEditView, ArticleListView, ArticleUpload) {
    return Backbone.View.extend({
        
        el: '#editor',
        
        articles: new ArticleList(),
        
        events: {
            'click #new_article': 'createArticle'
        },
        
        initialize: function(options) {
            var self = this;

            self.editView = new ArticleEditView();
            self.uploadView = new ArticleUpload({ el: '.article_upload', collection: self.articles });

            self.articles.on('add', self.renderArticle, self);
            self.articles.on('reset', self.renderArticleList, self);
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

        renderArticle: function(article) {
            var self = this,
                activeId = localStorage.getItem('activeArticle'),
                view = new ArticleListView({ model: article });
                
            article.on('edit', self.editView.editArticle, self.editView);
            self.$('#articles_list').append(view.render().el);
            
            if (activeId === article.id) { view.selectArticle(); }
        },
        
        renderArticleList: function() {
            var self = this;
            
            $('#articles_list').empty();
            
            self.articles.each(_.bind(self.renderArticle, self));
        },
        
        createArticle: function() {
            var article = this.articles.create({ active: true });
            var view = new ArticleListView({ model: article });
            
            article.on('edit', this.editView.editArticle, this.editView);
            $('#articles_list').append(view.render().el);
            
            view.selectArticle();
        }
    });
});