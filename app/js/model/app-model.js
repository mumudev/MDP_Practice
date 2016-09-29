/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-29 09:41:14
 * @version $Id$
 */

 define('appModel',['jquery','underscore','backbone'],function($,_,Backbone){
 	var appModel = Backbone.Model.extend({
            defaults: function() {
                return {
                    dataAPI: {
                        // 'domain': 'http://localhost:3000/api/html/elements',
                        'domain': 'http://admadevwb8001:8001/api/html/elements',
                        'createBtn': '',
                        'btnAction': {
                            'button': '/button/actions',
                            'inputText': '/inputText/actions',
                            'table': '/table/actions',
                            'div': '/div/actions',
                            'image': '/image/actions',
                        },
                        'data': {
                            'button': '/button/data',
                            'inputText': '/inputText/data',
                            'table': '/table/data',
                            'div': '/div/data',
                            'image': '/image/data',
                        }
                    }
                };
            },
            initialize: function() {
                //请求createBtn

            },
            reqCreateBtn: function() {
                var self = this;
                $.ajax({
                    type: 'get',
                    url: this.get('dataAPI').domain
                }).done(function(res) {
                    self.trigger('createBtnData', res.data);
                }).fail(function(err) {
                    console.info(err);
                });
            },
            reqTplData: function(tplType) {
                var self = this;
                $.ajax({
                    type: 'get',
                    url: this.get('dataAPI').domain + this.get('dataAPI').data[tplType]
                }).done(function(res) {
                    self.trigger('tplData', res.data, tplType);
                }).fail(function(err) {
                    console.info(err);
                });
            }
    });
    return appModel;
 })

