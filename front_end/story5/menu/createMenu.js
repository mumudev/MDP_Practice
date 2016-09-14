define(function() {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var url = require("../util/url.js");
    var views = {
        button: require("../item/button.js"),
        div: require("../item/div.js"),
        image: require("../item/image.js"),
        inputText: require("../item/inputText.js"),
        table: require("../item/table.js")
    };
    var View = Backbone.View.extend({
        template: null, 
        tagName: "div",

        className: "createMenu",
        events: {
            'click button': 'create'
        },

        initialize: function() {
            this.template = _.template($("#createMenuT").html()); 
            this.render();
        },
        render: function(context) {
            var self = this;
            $.ajax(url.base).done(function(json) {
                if (json.data) {
                    $(self.el).html(self.template({ datas: json.data })); //  渲染模板  
                } else {
                    alert("Error!");
                }
            }).fail(function() {
                console.log("error!");
            });
            return this;
        },
        create: function(e) {

            $.ajax({
                url: url[e.currentTarget.id].data,
                type: "get"
            }).done(function(json) {
                if (json.data) {
                    var item = $("<div></div>");
                    var itemView = new views[e.currentTarget.id]({el:item,data:json.data});
                    $("#content").append(item);
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
