/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-29 11:23:24
 * @version $Id$
 */



define('popupView',['jquery','popupModel','backbone'],function($,popupModel,Backbone){
    var popupView = Backbone.View.extend({
        initialize: function(options) {
            this.position = options.position;
            this.popTemplate = _.template($('#tpl-popup').html());
            this.model = new popupModel({
                tplType: options.tplType,
                parentHandler:options.parentHandler
            });
            this.curDom = null;
            var self = this;
            this.model.on('actionsData', function(data, tplType) {
                var dom = $(self.popTemplate({
                    data: data,
                    tplType: tplType
                })).css(self.position).show();
                self.renderPop(dom);
                self.model.off('actionsData');
            });
            this.bindEvents(options.tplType);
        },
        renderPop: function(dom) {
            $('#popupView').append(dom);
        },
        bindEvents: function(tplType) {
            var self = this;
            $('#popupView').delegate('#pop-' + tplType + ' a', 'click', function() {
                var method = $(this).attr('value').trim();
                self[method](self.curDom.unwrap('.box-selected'));
                //self[method](self.option.template.dom);
                self.hidePopUp();
            });
        },
        hidePopUp: function() {
            $('.dropdown-menu').hide();
        },
        delete: function(dom) {
            dom.remove();
            var tplType = this.model.get('tplType');
            var parent = this.model.get('parentHandler');
            parent.deleteTpl(tplType);
        },
        backgroundColor: function(dom) {
            dom.css('backgroundColor', this.makeColor());
        },
        fontColor: function(dom) {
            console.log(dom);
            dom.css('color', this.makeColor());
        },
        increaseFontSize: function(dom) {
            fontSize = parseInt(fontSize) + 1;
            dom.css('fontSize', fontSize + 'px');
        },
        decreaseFontSize: function(dom) {
            fontSize = parseInt(fontSize) - 1;
            dom.css('fontSize', fontSize + 'px');
        },
        makeColor: function() {
            return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
        }
    });
    return popupView;
});