define(function() {
    var method = {

        getRandomColor: function() {
            return "rgb(" + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + ")";
        },

        AdaptHeight: function() {
            var pageHeight = $(document).height() > $(window).height() ? $(document).height() : $(window).height();
            height = pageHeight - 44;
            $('.container').css('height', height);
        },

        clearSelected: function(e) {
            if (navigator.userAgent.indexOf('Mozilla') >= 0 && e.target.localName.match("body")) {
                $("#menu").hide();
                $("#createMenu").hide();
                if ($(".selected").length) {
                    $(".selected").eq(0).removeClass("selected");
                }
            } else if (e.target.closest && !e.target.closest("[id^='item'],[id='menu']")) {
                $("#menu").hide();
                if ($(".selected").length) {
                    $(".selected").eq(0).removeClass("selected");
                }
            }
            if (e.target.closest && !e.target.closest("[id='createBtn'],[id='createMenu']")) {
                $("#createMenu").hide();
            }
        },
        request:function(url) {
            var data = null;
            $.ajax(url.base).done(function(json) {
                if (json.data) {
                   data = json.data;
                } else {
                    alert("Error!");
                }
            }).fail(function() {
                console.log("error!");
            });
            return data;
        }

    };
    return method;
});
