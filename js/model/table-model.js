/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-01 17:31:41
 * @version $Id$
 */
var app = app || {};
(function($) {
    'use strict';
    app.TableModel = Backbone.Model.extend({
        initialize: function() {
            var self = this;
            this.data = $.ajax({
                type: 'get',
                url: domain + dataAPI.data.table
            }).done(function(res) {
                console.log(res);
                self.trigger('tableData', res);
            }).fail(function(err) {
                console.info(err);
            });
        },
    });

    // Tables Collection
    var Tables = Backbone.Collection.extend({
        model: app.TableModel,
        localStorage: new Backbone.LocalStorage('tables-backbone'),
    });
    app.tables = new Tables();

})(jQuery);
