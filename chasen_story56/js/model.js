var menuTypeModel = Backbone.Model.extend({
    initialize: function(dataUrl) {
        var self = this;

        var der = $.ajax({
            type: "get",
            url: dataUrl,
        }).promise();

        der.done(function(_data) {
            self.set({
                data: _data
            });
        });
    }
});

var dataUrlModel = Backbone.Model.extend({
    defaults: {
        menuType: "http://admadevwb8001:8001/api/html/elements",
        sampleDatabutton: "http://admadevwb8001:8001/api/html/elements/button/data",
        sampleDatainputText: "http://admadevwb8001:8001/api/html/elements/inputText/data",
        sampleDatatable: "http://admadevwb8001:8001/api/html/elements/table/data",
        sampleDatadiv: "http://admadevwb8001:8001/api/html/elements/div/data",
        sampleDataimage: "http://admadevwb8001:8001/api/html/elements/image/data",
        menuOperatebutton: "http://admadevwb8001:8001/api/html/elements/button/actions",
        menuOperatetable: "http://admadevwb8001:8001/api/html/elements/table/actions",
        menuOperatediv: "http://admadevwb8001:8001/api/html/elements/div/actions",
        menuOperateimage: "http://admadevwb8001:8001/api/html/elements/image/actions",
        menuOperateinputText: "http://admadevwb8001:8001/api/html/elements/inputText/actions"
    }
});
// var dataUrlModel = Backbone.Model.extend({
//     defaults: {
//         menuType: "http://admadevwb8001:8001/api/html/elements",
//         sampleData: {
//             button: "http://admadevwb8001:8001/api/html/elements/button/data",
//             inputText: "http://admadevwb8001:8001/api/html/elements/inputText/data",
//             table: "http://admadevwb8001:8001/api/html/elements/table/data",
//             div: "http://admadevwb8001:8001/api/html/elements/div/data",
//             image: "http://admadevwb8001:8001/api/html/elements/image/data"
//         },
//         menuOperate: {
//             button: "http://admadevwb8001:8001/api/html/elements/button/actions",
//             menuOperateinputText: "http://admadevwb8001:8001/api/html/elements/table/actions",
//             menuOperatetable: "http://admadevwb8001:8001/api/html/elements/div/actions",
//             menuOperatediv: "http://admadevwb8001:8001/api/html/elements/image/actions",
//             menuOperateimage: "http://admadevwb8001:8001/api/html/elements/inputText/actions"
//         }
//     }
// });

var menuOperateModel = Backbone.Model.extend({
    defaults: {
        data: {}
    },
    initialize: function(_dataUrl) {
        var self = this;
        var der = $.ajax({
            type: "get",
            url: _dataUrl,
        }).promise();

        der.done(function(_data) {
            self.set("data", _data);
        });
    }
});

var menuSampleModel = Backbone.Model.extend({
    defaults: {
        data: {}
    },
    initialize: function(_dataUrl) {
        var self = this;
        var der = $.ajax({
            type: "get",
            url: _dataUrl,
        }).promise();

        der.done(function(_data) {
            self.set("data", _data);
        });

        der.fail(function() {
            console.log("failed!!!");
        });
    }
});
