require("bootstrap");
require("./main.css");
var createMenu = require("./menu/createMenu.js");
var dropMenu = require("./menu/dropMenu.js");

$(document).ready(function() {
    var t = new createMenu({ el: $("#createMenu") });
    $("#createBtn").on("click", function(e) {
        $("#createMenu").toggle();
    });
});
