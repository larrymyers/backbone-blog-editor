/*global define, describe, it, expect*/
define(['jquery','preview'], function($, MarkdownPreview) {
    describe('MarkdownPreview', function() {
        it('Should be initialized with an object containing the content.', function() {
            var view = new MarkdownPreview({ content: 'Test' });
            
            expect(view.content).toBe('Test');
        });
        
        it('Should be attached to the DOM on render as a modal dialog and shadow overlay.', function() {
            var view = new MarkdownPreview({ content: 'Test' });
            
            expect($(view.el).parent().length).toBe(0);
            expect(view.shadow.parent().length).toBe(0);
            
            view.render();
            
            expect($(view.el).parent().get(0)).toBe(document.body);
            expect(view.shadow.parent().get(0)).toBe(document.body);
            
            view.destroy();
        });
        
        it('Should destroy the view when the close button is clicked.', function() {
            var view = new MarkdownPreview({ content: 'Test' });
            
            view.render();
            
            expect($(view.el).parent().get(0)).toBe(document.body);
            
            $('.previewCloseBtn').click();
            
            expect($(view.el).parent().length).toBe(0);
        });
        
        it('Should destroy the view when the shadow overlay is clicked.', function() {
            var view = new MarkdownPreview({ content: 'Test' });
            
            view.render();
            
            expect($(view.el).parent().get(0)).toBe(document.body);
            
            view.shadow.click();
            
            expect($(view.el).parent().length).toBe(0);
        });
    });
});
