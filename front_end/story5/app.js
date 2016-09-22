require("bootstrap");
require("./app.css");
var CreateMenuView = require("./menu/createMenu/view.js");
var CreateMenuModel = require("./menu/createMenu/model.js");
var Util = require("./util/method.js");
$(document).ready(function () {
    var model = new CreateMenuModel();
    var view = new CreateMenuView({ el: $("#createMenu"), content: $("#content"), model: model });
    $("#createBtn").on("click", function (e) {
        view.toggle();
    });
    $(document).on("click",Util.clearBinding);
    Util.AdaptHeight();
});
