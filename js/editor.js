define(['jquery','backbone','models/articles','views/articleEdit', 'views/articleList'], 
function($, Backbone, ArticleList, ArticleEditView, ArticleListView) {
    return Backbone.View.extend({
        
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
});