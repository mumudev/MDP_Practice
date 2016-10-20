$(function() {
    var appModel = Backbone.Model.extend({
        defaults: {

            Url: {
                'domain': 'http://admadevwb8001:8001/api/html/elements',

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

        },

        initialize: function() {

},
        getElements: function() {
            var self = this;
            $.ajax({
                type: 'get',
                url: this.get('Url').domain
            }).done(function(res) {
                self.trigger('menu1', res.data);
            }).fail(function(err) {
                console.info(err);
            });
        },
        getElementsData: function(eleType) {
            var self = this;
            $.ajax({
                type: 'get',
                url: this.get('Url').domain + this.get('Url').data[eleType]
            }).done(function(res) {
                self.trigger('create', res.data, eleType);
            }).fail(function(err) {
                console.info(err);
            });
        }

    });

    var appView = Backbone.View.extend({

        initialize: function(options) {
            this.model = new options.model();
            this.model.set({
                fontSize: '16px',
            });

            this.bindEvents();
            this.model.getElements();
        },

        createElementMenu: function(data) {
            var ElementMenu = _.template($('#tplElements').html());
            $('#create').append(ElementMenu(data));

        },
        bindEvents: function() {
            var self = this;
            $('#create').on('click',
            function() {

                $('#elementsMenu').show();

            });

            this.model.on('menu1',
            function(data) {
                self.createElementMenu(data);
            });

            $('#div0').delegate('#elementsMenu li a', 'click',
            function() {
                $('#elementsMenu').hide();
                var eleType = $(this).data('id');
                var templateData = self.model.get('templateData') || {};
                if (templateData[eleType]) {
                    self.createElements(eleType);
                } else {
                    self.model.getElementsData(eleType);
                }
            });

            $('#div1').delegate('[tpl]', 'click',
            function(e) {
                var eleType = $(this).attr('tpl');
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                if ($(this).hasClass('box-selected')) {
                    $(this).removeClass('box-selected');
                } else {
                    $(this).addClass('box-selected');
                }
                e.stopPropagation();
                self.createMenu(eleType, {
                    position: 'absolute',
                    top: e.clientY + scrollTop + 'px',
                    left: e.clientX + 'px'
                },
                $(this));

            });

            this.model.on('create',
            function(data, eleType) {
                var templateData = self.model.get('templateData') || {};
                templateData[eleType] = data;
                self.model.set('templateData', templateData);
                self.createElements(eleType);
            });

        },

        createElements: function(eleType) {
            var tplDom = this.model.get('tplDom') || {};
            var templateData = this.model.get('templateData') || {};
            var renderMethod = this.renderElements(eleType);
            tplDom[eleType] = renderMethod(templateData[eleType]);
            this.model.get('tplDom', tplDom);
            tplDom[eleType].attr('tpl', eleType);
            $('#div1').append(tplDom[eleType]);

        },
        renderElements: function(eleType) {
            var self = this;
            var method = {
                table: self.addTable,
                div: self.addDiv,
                button: self.addButton,
                inputText: self.addInputText,
                image: self.addImg,
            };
            return method[eleType];
        },
        addTable: function(data) {

            var table = document.createElement('table');
            var tt = "";
            for (var i = 0; i < data.rows; i++) {
                for (var j = 0; j < data.cols; j++) {
                    var k = -1;
                    while (++k < data.cells.length) {
                        var flag = false;
                        if (data.cells[k].row == i && data.cells[k].col == j) {
                            tt = tt + "<td>" + data.cells[k].data + "</td>";
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        tt = tt + "<td></td>";
                    }

                }
                tt = tt + "</tr>";
            }
            table.innerHTML = tt;
            return $(table).addClass("table table-bordered table-striped");

        },

        addDiv: function(data) {
            var div = document.createElement('div');
            div.innerHTML = data.text;
            return $(div);
        },
        addButton: function(data) {
            var button = document.createElement('button');
            $(button).attr({
                title: data.title,
            }).text(data.text);
            return $(button).addClass("btn-lg btn-success");
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
            }).addClass('img-circle');
        },

        showAcitionMenu: function(eleType, position) {
            $('#Action-' + eleType).css(position).show();
        },
        // create action Menu
        createMenu: function(eleType, position, curDom) {
            var actView = this.model.get('actView') || {};
            if (!actView[eleType]) {
                actView[eleType] = new actionsView({
                    eleType: eleType,
                    position: position
                });
            } else {
                this.showAcitionMenu(eleType, position);
            }
            actView[eleType].curDom = $(curDom);
            this.model.set('actView', actView);
        }

    });
    var actionsModel = appModel.extend({
        initialize: function(options) {
            this.set('eleType', options.eleType);
            this.getActionsData(options.eleType);
        },

        getActionsData: function(eleType) {
            var self = this;
            $.ajax({
                type: 'get',
                url: this.get('Url').domain + this.get('Url').actions[eleType]
            }).done(function(res) {
                self.trigger('actionsData', res.data, eleType);
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
                eleType: options.eleType
            });
            this.curDom = null;
            var self = this;
            this.model.on('actionsData',
            function(data, eleType) {
                var dom = $(self.popTemplate({
                    data: data,
                    eleType: eleType
                })).css(self.position).show();
                self.renderActions(dom);
                self.model.off('actionsData');
            });
            this.bindEvents(options.eleType);
        },
        renderActions: function(dom) {
            $('#div2').append(dom);
        },
        bindEvents: function(eleType) {
            var self = this;
            $('#div2').delegate('#Action-' + eleType + ' a', 'click',
            function(e) {
                var method = $(this).attr('value').trim();
                self[method](self.curDom.removeClass('box-selected'));
                e.stopPropagation();
                self.hideMenu();

            });

        },
        hideMenu: function() {
            $(document).on('click',
            function() {
                $('[name="action"]').hide();
            });
        },
        delete: function(ele) {
            ele.remove();
            $('.dropdown-menu').hide();

        },
        backgroundColor: function(ele) {
            ele.css('backgroundColor', this.changeColor());
        },
        fontColor: function(ele) {
            ele.css('color', this.changeColor());
        },
        increaseFontSize: function(ele) {
            var fontSize = ele.css('font-size');
            fontSize = parseInt(fontSize) + 2;
            ele.css('fontSize', fontSize + 'px');
        },
        decreaseFontSize: function(ele) {
            var fontSize = ele.css('font-size');
            fontSize = parseInt(fontSize) - 2;
            ele.css('fontSize', fontSize + 'px');
        },
        changeColor: function() {
            return '#' + Math.round(Math.random() * 1000000);

        }
    });

    new appView({
        model: appModel,
    });

});