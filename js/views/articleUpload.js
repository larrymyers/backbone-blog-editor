define(['underscore',
        'backbone',
        'models/article'], 
function(_, Backbone, Article) {
    return Backbone.View.extend({

        events: {
            'change #upload': 'saveFiles'
        },

        saveFiles: function() {
            var fileList = this.$('#upload').get(0).files,
                articles = this.collection;

            _.each(fileList, function(file) {
                var reader = new FileReader(file),
                    article = new Article();

                article.set('title', file.name);
                
                reader.onload = function(evt) {
                    var data = evt.target.result;
                    article.set('content', data);
                    articles.add(article);
                    article.save();
                };

                reader.readAsText(file);
            });
        }
    });
});
