define('appView',['jquery','underscore','backbone','popupView'],function($,_,Backbone,popupView){
    var appView = Backbone.View.extend({
        initialize: function(options) {
            this.model = new options.model();
            this.model.set({
                curTemplate: '',
                tplNum: new(Backbone.Model.extend({
                    defaults: function() {
                        return {
                            table: 0,
                            button: 0,
                            inputText: 0,
                            div: 0,
                            image: 0
                        };
                    }
                }))()
            });
            var btn = '<div class="dropdown createBtn">' + '<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' + 'create' + '<span class="caret"></span>' + '</button>';
            this.$el.append(btn);
            this.bindEvents();
            this.model.reqCreateBtn();
            this.createSvg();
            this.$el.append('<div id="' + options.tplContainer.replace('#', '') + '"></div>');
        },
        createSvg: function() {
            var svg = '<svg id="testSvg" xmlns="http://www.w3.org/2000/svg" width="500" height="300" version="1.1"></svg>';
            this.$svg = $(svg);
            this.$el.append(this.$svg);
            this.renderSVG(this.$svg, this.tplObj);
        },
        showCreateBtn: function(data) {
            var createBtnHandler = _.template($('#tpl-createBtn').html());
            $('.createBtn').append(createBtnHandler(data));
        },
        bindEvents: function() {
            var self = this;
            $('.createBtn').on('click', function() {
                $('.createBtn').find('#btnListView').toggle();
            });
            $('body').delegate('#btnListView li a', 'click', function() {
                var tplType = $(this).data('id');
                self.createTplhandler(tplType);
            });
            $('body').delegate('[tpl]', 'click', function(e) {
                var tplType = $(this).attr('tpl');
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if ($(this).parent().hasClass('box-selected')) {
                    $(this).unwrap('.box-selected');
                } else {
                    $(this).wrap('<div class="box-selected"></div>');
                }
                e.stopPropagation();
                self.createPop(tplType, {
                    position: 'absolute',
                    top: e.clientY +
                        scrollTop + 'px',
                    left: e.clientX + 'px'
                }, $(this).parent().hasClass('box-selected'), $(this));
            });

            this.model.on('createBtnData', function(data) {
                self.showCreateBtn(data);
            });
            this.model.on('tplData', function(data, tplType) {
                var templateData = self.model.get('templateData') || {};
                templateData[tplType] = data;
                self.model.set('templateData', templateData);
                self.createTemplate(tplType);
            });
            this.model.get('tplNum').on('change', function() {
                console.log(arguments);
                self.renderSVG(self.$svg, self.model.get('tplNum').attributes);
            })
        },
        createTplhandler: function(tplType) {
            var self = this;
            self.model.set('curTemplate', tplType);
            var templateData = self.model.get('templateData') || {};
            if (templateData[tplType]) {
                self.createTemplate(tplType);
            } else {
                self.model.reqTplData(tplType)
            }
        },
        createTemplate: function(tplType) {
            this.setTplNum(tplType, this.getTplNum(tplType) + 1);
            var tplDOM = this.model.get('tplDOM') || {}
            var templateData = this.model.get('templateData') || {};
            if (!tplDOM[tplType]) {
                var renderMethod = this.renderTpl(tplType);
                tplDOM[tplType] = renderMethod(templateData[tplType]);
                this.model.get('tplDOM', tplDOM);
                tplDOM[tplType].attr('tpl', tplType);
                $('#template-list').append(tplDOM[tplType]);
            } else {
                $('#template-list').append(tplDOM[tplType]);
            }
        },
        deleteTpl:function(tplType){
            this.setTplNum(tplType, this.getTplNum(tplType) - 1);
        },
        hidePopUp:function(){
            $('.dropdown-menu').hide();
        },
        showPopup: function(tplType,position) {
            $('#pop-'+tplType).css(position).show();
        },
        renderTpl: function(tplType) {
            var self = this;
            var method = {
                table: self.createTable,
                div: self.createDiv,
                button: self.createButton,
                inputText: self.createInput,
                image: self.createImage,
            }
            return method[tplType];
        },
        createTable: function(data) {
            function Table(data) {
                this.rowCount = 0;
                this.cellCount = 0;
                this.data = data; //只取一次
                this.init(data);
            }
            Table.prototype = {
                constructor: Table,
                init: function(res) {
                    this.rowCount = data.rows;
                    this.cellCount = data.cols;
                    this.cellData = data.cells;

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
                    var table = document.createElement('table');
                    for (var i = 0; i < this.rowCount; i++) {
                        var tr = document.createElement('tr');
                        for (var j = 0; j < this.cellCount; j++) {
                            var td = document.createElement('td');
                            if (sortResult[i * this.rowCount + j]) {
                                var oText = document.createTextNode(sortResult[i * this.rowCount + j].data);
                            } else {
                                var oText = document.createTextNode('');
                            }
                            td.appendChild(oText);
                            tr.appendChild(td);
                        }
                        oFragmeng.appendChild(tr);
                    }
                    table.appendChild(oFragmeng)
                    this.table = table;
                }
            }
            return $(new Table(data).table);
        },
        createDiv: function(data) {
            return $(data.text);
        },
        createButton: function(data) {
            return $('<button>').attr({
                title: data.title,
            }).text(data.text);
        },
        createInput: function(data) {
            var input = document.createElement('input');
            input.setAttribute('placeholder', data.text)
            return $(input);
        },
        createImage: function(data) {
            return $('<img>').attr({
                src: data.image,
                title: data.title,
            });
        },
        createPop: function(tplType, position, isVisible, curDom) {
            this.model.set('curDom', $(curDom));
            this.model.set('curTplType', tplType);
            var popview = this.model.get('popview') || {};
            if (!popview[tplType]) {
                popview[tplType] = new popupView({
                    tplType: tplType,
                    position: position,
                    parentHandler:this,
                });
                popview[tplType].curDom = $(curDom)
            } else {
                if (isVisible) {
                    popview[tplType].curDom = $(curDom)
                    this.showPopup(tplType, position);
                } else {
                    popview[tplType].curDom = null;
                    $('.dropdown-menu').hide();
                }
            }
            this.model.set('popview', popview);
        },
        addElt: function(svg, name, attrs) {
            var svgNS = "http://www.w3.org/2000/svg"
            var ele = document.createElementNS(svgNS, name);
            if (attrs === undefined) {
                attrs = {};
            }
            for (var key in attrs) {
                if (key === 'text') {
                    ele.innerHTML = attrs[key];
                    continue;
                }
                ele.setAttributeNS(null, key, attrs[key]);
            }
            svg.append(ele);
        },
        renderSVG: function(svg, tplObj) {
            svg.empty();
            this.addElt(svg, 'line', {
                x1: "0",
                y1: "260",
                x2: "500",
                y2: "260",
                style: "stroke:rgb(99,99,99);stroke-width:2"
            });
            this.addElt(svg, 'text', {
                x: "150",
                y: "290",
                style: "fill:green;font-size:16;line-height:20;",
                text: 'table'
            });
            this.addElt(svg, 'text', {
                x: "200",
                y: "290",
                style: "fill:green;font-size:16;line-height:20;",
                text: 'button'
            });
            this.addElt(svg, 'text', {
                x: "250",
                y: "290",
                style: "fill:green;font-size:16;line-height:20;",
                text: 'input'
            });
            this.addElt(svg, 'text', {
                x: "300",
                y: "290",
                style: "fill:green;font-size:16;line-height:20;",
                text: 'div'
            });
            this.addElt(svg, 'text', {
                x: "350",
                y: "290",
                style: "fill:green;font-size:16;line-height:20;",
                text: 'image'
            });
            var i = 0;
            for (var key in tplObj) {
                i++;
                if (!tplObj[key]) {
                    continue;
                }
                var item = {
                    width: "48",
                    x: 50 * (i + 2),
                    y: 260 - tplObj[key] * 10,
                    height: tplObj[key] * 10,
                    style: ";fill:rgb(0,0,255);stroke-width:1;stroke:#209222;"
                };
                this.addElt(svg, 'rect', item);
            }
        },
        getTplNum: function(tplType) {
            var tplNum = this.model.get('tplNum');
            return tplNum.get(tplType);
        },
        setTplNum: function(tplType, num) {
            var tplNum = this.model.get('tplNum');
            return tplNum.set(tplType, num);
        }
    });
    return appView;

});
