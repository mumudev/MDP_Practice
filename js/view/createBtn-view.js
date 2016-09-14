
'use strict';
var app = app || {};
;(function() {
    app.creatBtnView = Backbone.View.extend({
        template:_.template($('#tpl-createBtn').html()),
        initialize:function() {
            this.$list = $('.template-list');
            this.render();
        },
        render:function() {
            var self = this;
            this.model.on('change:btnList', function() {
                var btnList = self.model.get('btnList');
                self.$el.append(self.template(self.model.attributes.btnList));
            });
        },
        toggle:function() {
            var self = this;
            if (!self.$el.hasClass('show')) {
                self.$el.addClass('show');
            } else {
                self.$el.removeClass('show');
            }
        },
        events:{
            'click.dropdown-toggle':'toggle',
            'click .dropdown-menu li a':'createHandler',
        },
        createHandler:function(e) {
            console.log(e.target.className);
            app.tables.create({
                className:e.target.className
            });
        },
    });
})();
