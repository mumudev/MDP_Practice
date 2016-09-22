define(function () {
    var Backbone = require('Backbone');
    var model = Backbone.Model.extend({
        defaults: {
            data: {
            },
            action: [{ "id": "delete", "text": "Delete", "title": "Delete the element from DOM" }],
            selected:false
        }
    });
    return model;
});
