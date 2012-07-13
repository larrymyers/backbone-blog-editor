/*global define, describe, it, expect*/
define(['models/article'], function(Article) {
    describe('Article', function() {
        it('Should return the title as the header along with the content for allContent', function() {
            var article = new Article({ title: 'foo', content: 'bar'});

            expect(article.allContent()).toEqual("#foo\nbar");
        });

        it('Should mark the article as published when the published_on attribute is set.', function() {
            var article = new Article();

            expect(article.published()).toBe(false);

            article.set('published_on', new Date());

            expect(article.published()).toBe(true);
        });
    });
});