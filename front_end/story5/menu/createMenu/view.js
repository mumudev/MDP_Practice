define(function () {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var url = require("../../util/url.js");
    var htmlTemplate = require("./item.html");
    var views = {
        button: require("../../item/button/item.js"),
        div: require("../../item/div/item.js"),
        image: require("../../item/image/item.js"),
        inputText: require("../../item/inputText/item.js"),
        table: require("../../item/table/item.js")
    };
    var View = Backbone.View.extend({
        template: null,
        tagName: "div",
        context: "",
        className: "createMenu",
        events: {
            'click button': 'create'
        },

        initialize: function (options) {
            this.content = options.content;
            this.template = _.template(htmlTemplate);
            this.render();
        },

        render: function (context) {
            var self = this;
            $.ajax(url.base).done(function (json) {
                if (json.data) {
                    $(self.el).html(self.template({ datas: json.data })); //  渲染模板  
                } else {
                    alert("Error!");
                }
            }).fail(function () {
                console.log("error!");
            });
            return this;
        },
        toggle:function(){
            this.$el.toggle();
        },
        
        create: function (e) {
            var self = this;
            $.when($.ajax({ url: url[e.currentTarget.id].data, type: "get" }),
                $.ajax({ url: url[e.currentTarget.id].action, type: "get" }))
                .done(function (json1, json2) {
                    var item = $("<div></div>");
                    var itemView = new views[e.currentTarget.id]
                    ({ el: item, data: json1[0].data, action: json2[0].data });
                    self.content.append(item);
                }).fail(function () {
                    console.log("table create error!");
                });
        }

    });

    return View;
});
