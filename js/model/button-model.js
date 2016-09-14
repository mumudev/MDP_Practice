/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-01 18:19:11
 * @version $Id$
 */
var app = app || {};
(function($) {
    'use strict';
    app.ButtonModel = Backbone.Model.extend({
        initialize: function() {
            var self = this;
            this.data = $.ajax({
                type: 'get',
                url: domain + dataAPI.data.table
            }).done(function(res) {
                console.log(res);
                self.trigger('buttonData', res);
            }).fail(function(err) {
                console.info(err);
            });
        },
    });

    // Tables Collection
    var Buttons = Backbone.Collection.extend({
        model: app.ButtonModel,
        localStorage: new Backbone.LocalStorage('tables-backbone'),
    });
    app.tables = new Buttons();

})(jQuery);
