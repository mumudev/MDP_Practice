/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-29 11:21:19
 * @version $Id$
 */
 
define('popupModel',['jquery','appModel','backbone'],function($,appModel,Backbone){
    var popupModel = appModel.extend({
        initialize: function(options) {
            this.set('tplType', options.tplType);
            this.reqActionsData(options.tplType);
        },
        reqActionsData: function(tplType) {
            var self = this;
            $.ajax({
                type: 'get',
                url: this.get('dataAPI').domain + this.get('dataAPI').btnAction[tplType]
            }).done(function(res) {
                self.trigger('actionsData', res.data, tplType);
            }).fail(function(err) {
                console.info(err);
            });
        }
    });
    return popupModel;
});