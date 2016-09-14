/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-01 17:37:32
 * @version $Id$
 */

'use strict';
;(function(){
	// Table Item View
    app.TableView = Backbone.View.extend($.extend({
        tagName: 'table',
        className:'tpl-table tpl',
        //template: _.template($('#item-template').html()),
        events: {
            'click.tpl': 'createView',
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        createView:function(e){
        	this.showAction(e,'table')
        },
        render: function() {
            if (this.model.changed.id !== undefined) {
                return;
            }
            var self = this
            this.model.on('tableData', function(res) {
                var table = self.createTableTemplate(res);
                self.$el.html(table);
            })
            return this;
        },
        createTableTemplate: (function() {
            var instance;

            function Table(data) {
                this.rowCount = 0;
                this.cellCount = 0;
                this.data = data; //只取一次
                this.init(data);
            }
            Table.prototype = {
                constructor: Table,
                init: function(res) {
                    this.rowCount = res.data.rows;
                    this.cellCount = res.data.cols;
                    this.cellData = res.data.cells;

                    var sortResult = this.sort();
                    this.newTableTemplate()
                },
                sort: function() {
                    this.sortResult = this.cellData.sort(function(td0, td1) {
                        if (td0.row === td1.row) {
                            return td0.col - td1.col;
                        } else {
                            return td0.row - td1.row;
                        }
                    });
                },
                newTableTemplate: function() {
                    var sortResult = this.sortResult;
                    var oFragmeng = document.createDocumentFragment();

                    for (var i = 0; i < this.rowCount; i++) {
                        var tr = document.createElement('tr');
                        for (var j = 0; j < this.cellCount; j++) {
                            var td = document.createElement('td');
                            if (sortResult[i * this.rowCount + j]) {
                            	var     oText = document.createTextNode(sortResult[i * this.rowCount + j].data);
                            } else {
                        		var     oText = document.createTextNode('');
                            }
                            td.appendChild(oText);
                            tr.appendChild(td);
                        }
                        oFragmeng.appendChild(tr);
                    }
                    this.table = oFragmeng;
                }
            };
            return function(data) {
                var self = this;
                if (instance && instance.table) {
                    return instance.table;
                } else {
                    var table = new Table(data).table;
                    return table;
                }
            }
        })()
    },app.actions));
})();