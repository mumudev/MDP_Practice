define(function() {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var util = require("../../util/method.js");
    var url = require("../../util/url.js");
    var htmlTemplate = require("./item.html");
    var View = Backbone.View.extend({
        tagName: "input",

        className: "item-inputText",

       
        events: {
            "click": "select",
            "delete": "delete",
            "backgroundColor": "backgroundColor",
            "fontColor": "fontColor",
            "increaseFontSize": "increaseFontSize",
            "decreaseFontSize": "decreaseFontSize",
        },


        initialize: function(options) {
            this.template = _.template(htmlTemplate);
            this.render(options.data);
        },
        render: function(data) {
            $(this.el).html(this.template( data ));
        },

        select:function(e) {
            util.clearSelected(e);
            $(this.el).children().addClass("selected");
            $.ajax({
                url: url[$(this.el).children()[0].name].action,
                type: "get"
            }).done(function(json) {
                if (json.data) {
                    dropMenuView.render(json.data);
                } else {
                    alert("Error!");
                }
            }).fail(function() {
                console.log("table create error!");
            });
        }
    });
    return View;
});
