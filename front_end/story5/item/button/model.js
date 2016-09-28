define(function () {
    var Backbone = require('Backbone');
    var model = Backbone.Model.extend({
        name:"button",
        defaults: {
            data: {

            },
            action: [{ "id": "delete", "text": "Delete", "title": "Delete the element from DOM" }, 
            { "id": "backgroundColor", "text": "Background Color", "title": "Change background color for current element" }, 
            { "id": "fontColor", "text": "Font Color", "title": "Change font color for current element" }, 
            { "id": "increaseFontSize", "text": "Font Size +", "title": "Increase font size for current element" }, 
            { "id": "decreaseFontSize", "text": "Font Size -", "title": "Decrease font size for current element" }],
            selected:false
        }
    });
    return model;
});
