/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-01 17:34:41
 * @version $Id$
 */
'use strict';
var app = app||{};
;(function(){
	app.actions = {
	    showAction: function(e,type) {
	        var self = this;
	        this.popupView = new app.popupView({
	            el: '.popUp',
	            model: new app.popupModel({
	            	url:'table',
	            }),
	        });
	        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	        this.popupView.$el
	            .css({
	                top: e.clientY +
	                    scrollTop - 34 + 'px',
	                left: e.clientX + 'px'
	            }).addClass('show');
	        this.popupView.on('doActions',function(){
	          var action = arguments[0];
	            self[action](Array.prototype.slice.call(arguments,1));
	            self.popupView.remove();
	            $('body').append('<div class="dropdown  popUp" style="position: absolute;z-index:999;"></div>');
	        });    
	    },
	    delete:function(){
	        this.model.destroy();
	    },
	    backgroundColor:function(){
	        this.$el.css('backgroundColor',this.makeColor());
	    },
	    fontColor:function(){
	        this.$el.css('color',this.makeColor());
	    },
	    increaseFontSize:function(){
	        appView.fontSize = parseInt(appView.fontSize)+1+'px';
	        this.$el.css('fontSize',appView.fontSize);
	    },
	    decreaseFontSize:function(){
	        appView.fontSize = parseInt(appView.fontSize)-1+'px'
	        console.log(appView.fontSize)
	        this.$el.css('fontSize',appView.fontSize);
	    },
	    makeColor:function(){
	        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
	    }
	};
})();
