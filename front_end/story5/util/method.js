define(function () {
    var method = {

        getRandomColor: function () {
            return "rgb(" + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + ")";
        },

        AdaptHeight: function () {
            var pageHeight = $(document).height() > $(window).height() ? $(document).height() : $(window).height();
            height = pageHeight - 44;
            $('.container').css('height', height);
        },

        mergeJson: function () {
            var resultJsonObject = {};
            for (var arg in arguments) {
                for (var attr in arg) {
                    resultJsonObject[attr] = jsonbject1[attr];
                }
            }
            return resultJsonObject;
        },

        clearBinding: function (e) {
            if (!(e.target.closest(".item" )| |e.target.close st("#dropMenu"))&&$("#dropMenu")){
                $("#dropMenu").remove();
            }
            // if (!e.target.closest("#createBtn") && $("#dropMenu")) {
            //     $("#createMenu").hide();
            // }
        }

    };
    return method;
});
