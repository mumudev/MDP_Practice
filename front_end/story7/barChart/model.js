define(function () {
    var Backbone = require('Backbone');
    var model = Backbone.Model.extend({
        defaults: {
            data: {
                button: 0,
                div: 0,
                image: 0,
                inputText: 0,
                table: 0
            }
        }
    });
    return model;
});
