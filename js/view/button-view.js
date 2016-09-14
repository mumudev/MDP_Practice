/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-01 17:37:32
 * @version $Id$
 */

'use strict';
;(function(){
	// Table Item View
    app.TableView = Backbone.View.extend($.extend({
        className:'tpl-button',
        events: {
            'click.tpl-table': 'showAction',
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            if (this.model.changed.id !== undefined) {
                return;
            }
            var self = this
            this.model.on('buttonData', function(res) {
                var table = self.createTemplate(res);
                self.$el.html(table);
            })
            return this;
        },
        createTemplate: (function() {
        }();
    },app.actions));
})();