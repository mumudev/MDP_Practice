/**
 * 
 * @authors hobo (you@example.org)
 * @date    2016-09-29 09:45:23
 * @version 1.1.0
 */

　
require.config({
    paths: {
        "jquery": "jquery.min",
　　　　"underscore": "underscore",
　　　　"backbone": "backbone",
        "appView": './view/app-view',
        "popupView":'./view/popup-view',
        "appModel": './model/app-model',
        "popupModel": './model/popup-model'
    }
});
var fontSize = '11px';
require(['jquery','appView','appModel'], function ($,appView, appModel){
　　　　// some code here
		    new appView({
            model: appModel,
            el: '#mvc-app',
            tplContainer: '#template-list'
        });
});
