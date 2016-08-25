$("#createMenu").hide();
$("#menu").hide();
$("#createBtn").on("click", function(e) {
    $("#createMenu").toggle();
});
$("body").on("click", function(e) {
    if (!e.target.closest("[id^='item'],[id='menu'],[id^='createBtn']")) {
        $("#createMenu").hide();
        $("#menu").hide();
    }
});
