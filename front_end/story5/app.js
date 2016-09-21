require("bootstrap");
require("./app.css");
var createMenu = require("./menu/createMenu/item.js");
$(document).ready(function () {
    var t = new createMenu({ el: $("#createMenu"), content: $("#content") });
    $("#createBtn").on("click", function (e) {
        t.toggle();
    });
});
