define(function () {
    var Backbone = require('Backbone');
    var _ = require("underscore");
    var url = require("../../util/url.js");
    var htmlTemplate = require("./item.html");
    var views = {
        button: require("../../item/button/view.js"),
        div: require("../../item/div/view.js"),
        image: require("../../item/image/view.js"),
        inputText: require("../../item/inputText/view.js"),
        table: require("../../item/table/view.js")
    };
    var Models = {
        button: require("../../item/button/model.js"),
        div: require("../../item/div/model.js"),
        image: require("../../item/image/model.js"),
        inputText: require("../../item/inputText/model.js"),
        table: require("../../item/table/model.js")
    };
    var View = Backbone.View.extend({
        template: null,
        tagName: "div",
        context: "",
        className: "createMenu",
        model:null,
        events: {
            'click button': 'create'
        },

        initialize: function (options) {
            this.content = options.content;
            this.template = _.template(htmlTemplate);
            this.model = options.model;
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
                    var itemModel = new Models[e.currentTarget.id]({data: json1[0].data, action: json2[0].data });
                    var itemView = new views[e.currentTarget.id]
                    ({ el: item,model: itemModel});
                    self.content.append(item);
                }).fail(function () {
                    console.log("table create error!");
                });
        }

    });

    return View;
});
