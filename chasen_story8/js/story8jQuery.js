$(document).ready(function() {
    //------------------------------------------------------------------------------------------------
    // var urldata = new dataUrlModel();
    // var samplemodel = new menuSampleModel(urldata.get("sampleData" + eletype));
    var counterModel = new eleCounterModel();
    var v1 = new menuTypeView();
    // new elements({ el: $("#contents_p") });
    var v3 = new menuOperateView({
        model: counterModel,
        el: "div.menu_act"
    });
    var v2 = new elements({
        model: counterModel,
        operateView: v3,
        el: "#contents_p"
    });
    var v4 = new SVGView({
        model: counterModel,
        el: "svg"
    });
});
