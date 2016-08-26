$(document).ready(function() {
    loading();
    $.ajax({
        type: "get",
        url: "http://admadevwb8001:8001/api/html/elements",
        success: function(data) {
            alert(data);
            createList = eval(data);
        }
    });
    // $.get("http://admadevwb8001:8001/api/html/elements", function(data) {
    //     alert(data);
    // });
    alert("111" + createList);
});
