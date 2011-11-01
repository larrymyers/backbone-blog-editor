(function($) {
    window.MarkdownPreview = Backbone.View.extend({
        
        events: {
            'click .modalCloseBtn': 'destroy'
        },
        
        initialize: function(options) {
            var self = this;
            
            self.shadow = $(self.make('div', { class: 'shadow' }));
            self.shadow.click(_.bind(self.destroy, self));
            self.closeBtn = $(self.make('img', { class: 'modalCloseBtn', src: '/close.png' }));
            
            $(self.el).addClass('modal').append(self.closeBtn);
        },
        
        render: function() {
            var converter = new Showdown.converter(),
                htmlContent = converter.makeHtml(this.model.get('content')),
                height = $(window).height(),
                width = $(window).width();
            
            this.shadow.height(height).width(width);
            
            var content = this.make('div', { class: 'modalContent' });
            
            $(content).append('<h1>' + this.model.get('title') + '</h1>');
            $(content).append(htmlContent);
            $(this.el).append(content);
            
            var centerWidth = width/2 - $(this.el).width()/2;
            
            $(this.el).css('left', centerWidth + 'px').height(height - 90);
            $(content).height(height - 90);
            
            $('body').append(this.shadow);
            $('body').append(this.el);
        },
        
        destroy: function() {
            // TODO remove shadow click handler
            this.shadow.remove();
            this.remove();
        }
    });
})(jQuery);