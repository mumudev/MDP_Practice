$(function() {
var barModel=Backbone.Model.extend({
        defaults:{
            tableCount:0,

        }
    });
    
var barChart=Backbone.View.extend({
    el:'#clear',
    template:_.template($('#barChart').html()),
    initialize:function(){
        var model=this.model;
        this.listenTo(model, "change", this.render);
        this.render();
        this.bindEvents();
    },
    events: {
            "mouseover rect": "hover",
            "mouseout rect": "hoverOut"
    },
    render:function(){
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    bindEvents:function(){
        var self=this;
        $('#div0').delegate('#elementsMenu li a', 'click',
            function() {
                setInterval(
                    function(){
                        self.tableCounting();
                        self.buttonCounting();
                        self.inputTextCounting();
                        self.divCounting();
                        self.imgCounting();

                },200);

            });
    
        },
    tableCounting:function(){
            // alert($('#table').attr('id'));
            var tableCount=$('[tpl="table"]').length;
            var updateWidth=20*tableCount;
            this.model.set('TWid',updateWidth);
            this.model.set('tableCount',tableCount);
    },
    buttonCounting:function(){
            var buttonCount=$('[tpl="button"]').length;
            var updateWidth=20*buttonCount;
            this.model.set('BWid',updateWidth);
            this.model.set('buttonCount',buttonCount);
    },
    inputTextCounting:function(){
            var inputCount=$('[tpl="inputText"]').length;
            var updateWidth=20*inputCount;
            this.model.set('IWid',updateWidth);
            this.model.set('inputCount',inputCount);
    },
    divCounting:function(){
            var divCount=$('[tpl="div"]').length;
            var updateWidth=20*divCount;
            this.model.set('DWid',updateWidth);
            this.model.set('divCount',divCount);
    },
    imgCounting:function(){
            var imgCount=$('[tpl="image"]').length;
            var updateWidth=20*imgCount;
            this.model.set('IgWid',updateWidth);
            this.model.set('imgCount',imgCount);
    },
    hover:function(e){
            var element=$(e.target).attr('id');
            $('#'+element+'Count').css('fill','yellow');
            $(element+'[tpl]').addClass('selected');

    },
    hoverOut:function(e){
            var element=$(e.target).attr('id');
            $('#'+element+'Count').css('fill','none');
            $(element+'[tpl]').removeClass('selected');
    }
});

var barChartModel= new barModel({
            TWid:0,
            BWid:0,
            IWid:0,
            DWid:0,
            IgWid:0,
            tableCount:0,
            buttonCount:0,
            inputCount:0,
            divCount:0,
            imgCount:0,
});

 var chartView= new barChart({
     model:barChartModel,
 });

});