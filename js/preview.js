/*global $, _, Backbone, Showdown*/

define(['jquery','backbone','showdown'], function($, Backbone, Showdown) {
    return Backbone.View.extend({
            
        events: {
            'click .previewCloseBtn': 'destroy'
        },
        
        initialize: function(options) {
            var self = this;
            
            self.content = options.content || 'No content.';
            self.shadow = $(self.make('div', { 'class': 'previewShadow' }));
            self.shadow.click(_.bind(self.destroy, self));
            self.closeBtn = $(self.make('img', { 'class': 'previewCloseBtn', src: '/img/close.png' }));
            
            $(self.el).addClass('previewModal').append(self.closeBtn);
        },
        
        render: function() {
            var converter = new Showdown.converter(),
                htmlContent = converter.makeHtml(this.content),
                height = $(window).height(),
                width = $(window).width();
            
            this.shadow.height(height).width(width);
            
            var content = this.make('div', { 'class': 'previewContent' });
            
            $(content).append(htmlContent);
            $(this.el).append(content);
            
            $(this.el).width(Math.min(width*0.8, 600));
            var centerWidth = width/2 - $(this.el).width()/2;
            
            $(this.el).css('left', centerWidth + 'px').height(height - 90);
            $(content).height(height - 90);
            
            $('body').append(this.shadow);
            $('body').append(this.el);
        },
        
        destroy: function() {
            this.shadow.remove();
            this.remove();
        }
        
    });
});