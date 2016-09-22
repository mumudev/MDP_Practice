 $(document).ready(function() {
        var appModel = Backbone.Model.extend({
            defaults: function() {
                return {
                    Data: {
                        'domain':'http://admadevwb8001:8001/api/html/elements',
                        'createBtn': '',
                        'actions': {
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

            getElements: function() {
                var self = this;
                $.ajax({
                    type: 'get',
                    url: this.get('Data').domain
                }).done(function(res) {
                    self.trigger('createBtnData', res.data);
                }).fail(function(err) {
                    console.info(err);
                });
            },
            getElementsData: function(tplType) {
                var self = this;
                $.ajax({
                    type: 'get',
                    url: this.get('Data').domain + this.get('Data').data[tplType]
                }).done(function(res) {
                    self.trigger('tplData', res.data, tplType);
                }).fail(function(err) {
                    console.info(err);
                });
            }
        });

        var appView = Backbone.View.extend({
            initialize: function(options) {
                this.model = new options.model();
                this.model.set({
                    fontSize: '20px',
                    curTemplate: '',
                });
                this.bindEvents();
                this.model.getElements();
            },
            showElementMenu: function(data) {
                var ElementMenu = _.template($('#tplElements').html());
                $('#create').append(ElementMenu(data));
            },
            bindEvents: function() {
                var self = this;
                $('#create').on('click', function() {
                    $('#create').find('#elementsMenu').toggle();
                });
                $('body').delegate('#elementsMenu li a', 'click', function() {
                    var tplType = $(this).data('id');
                    self.createHandler(tplType);
                });
                $('body').delegate('[tpl]', 'click', function(e) {
                    var tplType = $(this).attr('tpl');
                    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    if ($(this).hasClass('box-selected')) {
                        $(this).removeClass('box-selected');
                    } else {
                        $(this).addClass('box-selected');
                    }
                    e.stopPropagation();
                    self.createMenu(tplType, {
                        position:'absolute',
                        top: e.clientY +
                            scrollTop + 'px',
                        left: e.clientX + 'px'
                    },$(this).hasClass('box-selected'),$(this));
                });

                this.model.on('createBtnData', function(data) {
                    self.showElementMenu(data);
                });
                this.model.on('tplData', function(data, tplType) {
                    var templateData = self.model.get('templateData') || {};
                    templateData[tplType] = data;
                    self.model.set('templateData', templateData);
                    self.createElements(tplType);
                });
            },
            createHandler: function(tplType) {
                var self = this;
                self.model.set('curTemplate', tplType);
                var templateData = self.model.get('templateData') || {};
                if (templateData[tplType]) {
                    self.createElements(tplType);
                } else {
                    self.model.getElementsData(tplType);
                }
            },
            createElements: function(tplType) {
                var tplDom = this.model.get('tplDom') || {};
                var templateData = this.model.get('templateData') || {};
                if (!tplDom[tplType]) {
                    var renderMethod = this.renderTpl(tplType);
                    tplDom[tplType] = renderMethod(templateData[tplType]);
                    this.model.get('tplDom', tplDom);
                    tplDom[tplType].attr('tpl', tplType);
                    $('#div1').append(tplDom[tplType]);
                } else {
                    $('#div1').append(tplDom[tplType]);
                }
            },
            renderTpl: function(tplType) {
                var self = this;
                var method = {
                    table: self.addTable,
                    div: self.addDiv,
                    button: self.addButton,
                    inputText: self.addInputText,
                    image: self.addImg,
                };
                return method[tplType];
            },
            addTable: function(data) {
                var table= document.createElement('table');
                var tt = "";
                for (var i = 0; i < data.rows; i++) {
                    for (var j = 0; j < data.cols; j++) {
                        var k = -1;
                        while (++k < data.cells.length) {
                            var flag = "false";
                            if (data.cells[k].row == i && data.cells[k].col == j) {
                                tt = tt + "<td>" + data.cells[k].data + "</td>";
                                flag = "true";
                                break;
                            }
                        }
                        if (flag == "false") {
                            tt = tt + "<td></td>";
                        }

                    }
                    tt = tt + "</tr>";
                }
                table.innerHTML = tt;
                return $(table).addClass("table-bordered");
            },
            addDiv: function(data) {
                var div=document.createElement('div');
                div.innerHTML=data.text;
                return $(div);
            },
            addButton: function(data) {
                var button= document.createElement('button');
                $(button).attr({
                    title: data.title,
                }).text(data.text);
                return $(button);
            },
            addInputText: function(data) {
                var input = document.createElement('input');
                input.setAttribute('value', data.text);
                return $(input);
            },
            addImg: function(data) {
                return $('<img>').attr({
                    src: data.image,
                    title: data.title,
                });
            },
            hideMenu:function(){
                $('.dropdown-menu').hide();
            },
            showAcitionMenu: function(tplType,position) {
                $('#Action-'+tplType).css(position).show();
            },
            createMenu: function(tplType, position,isVisible,curDom) {
                this.model.set('curDom',$(curDom));
                this.model.set('curTplType',tplType);
                var actView = this.model.get('actView')||{};
                if(!actView[tplType]){
                    actView[tplType] = new actionsView({
                        tplType: tplType,
                        position: position
                    });
                    actView[tplType].curDom = $(curDom);
                }else{
                    if(isVisible){
                        actView[tplType].curDom = $(curDom);
                        this.showAcitionMenu(tplType,position);
                    }else{
                        actView[tplType].curDom = null;
                    }
                }
                this.model.set('actView',actView);
            }
        });


        var actionsModel = appModel.extend({
            initialize: function(options) {
                this.set('tplType', options.tplType);
                this.getActionsData(options.tplType);
            },

            getActionsData: function(tplType) {
                var self = this;
                $.ajax({
                    type: 'get',
                    url: this.get('Data').domain + this.get('Data').actions[tplType]
                }).done(function(res) {
                    self.trigger('actionsData', res.data, tplType);
                }).fail(function(err) {
                    console.info(err);
                });
            }
        });
        var actionsView = Backbone.View.extend({
            initialize: function(options) {
                this.position = options.position;
                this.popTemplate = _.template($('#tplActions').html());
                this.model = new actionsModel({
                    tplType: options.tplType
                });
                this.curDom = null;
                var self = this;
                this.model.on('actionsData', function(data,tplType) {
                    var dom = $(self.popTemplate({data:data,tplType:tplType})).css(self.position).show();
                    self.renderActions(dom);
                    self.model.off('actionsData');
                });
                this.bindEvents(options.tplType);
            },
            renderActions: function(dom) {
                $('#div2').append(dom);    
            },
            bindEvents: function(tplType) {
                var self = this;
                $('#div2').delegate('#Action-'+tplType+' a', 'click', function() {
                    var method = $(this).attr('value').trim();
                    self[method](self.curDom.removeClass('box-selected'));
                    self.hidePopUp();
                });
            },
            

            hidePopUp:function(){
                $('.dropdown-menu').hide();
            },
            delete: function(ele) {
                ele.remove();
            },
            backgroundColor: function(ele) {
                ele.css('backgroundColor', this.changeColor());
            },
            fontColor: function(ele) {
                console.log(ele);
                ele.css('color', this.changeColor());
            },
            increaseFontSize: function(ele) {
                fontSize = parseInt(fontSize)+2;
                ele.css('fontSize',fontSize + 'px');
            },
            decreaseFontSize: function(ele) {
                fontSize = parseInt(fontSize)-2;
                ele.css('fontSize', fontSize + 'px');
            },
            changeColor:function() {
                return '#' + Math.round(Math.random() * 1000000);
            }

        });
    
    new appView({
            model: appModel,
    });
    var fontSize="20px";
});