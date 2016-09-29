$(function() {
    var AppModel = Backbone.Model.extend({
        defaults: function() {
            return {
                dataAPI: {
                    'btnValue': 'Create',
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
            };
        },
        reqCreateBtnMenu: function() {
            var self = this;
            $.ajax({
                type: 'get',
                url: this.get('dataAPI').domain
            }).done(function(response) {
                self.trigger('createBtnMenuData', response.data);
            }).fail(function(error) {
                console.info(error);
            });
        },
        reqEleData: function(eleType) {
            var self = this;
            $.ajax({
                type: 'get',
                url: this.get('dataAPI').domain + this.get('dataAPI').data[eleType]
            }).done(function(response) {
                self.trigger('createEleData', response.data, eleType);
            }).fail(function(error) {
                console.info(error);
            });
        },
        reqActionData: function(eleType) {
            var self = this;
            this.fetch({
                url: this.get('dataAPI').domain + this.get('dataAPI').actions[eleType],
                success: function(model, res) {
                    self.trigger('createActionData', res.data, eleType);
                },
                error: function(error) {
                    console.info(error);
                }
            });
        }
    });

    var CreateBtnView = Backbone.View.extend({
        className: 'dropdown',
        initialize: function(options) {
            this.model = new options.model;
            this.render();
        },
        template: _.template($('#tpl-createBtn').html()),
        render: function() {
            var value = this.model.get('dataAPI').btnValue;
            this.$el.html(this.template({ btnValue: value }));
            $('#content').append(this.el);
            return this;
        }
    });

    var EleMenuView = Backbone.View.extend({
        className: 'eleMenu',
        initialize: function(options) {
            this.model = new options.model();
            this.model.reqCreateBtnMenu();
            this.bindEvents();
        },
        bindEvents: function() {
            var self = this;
            $('#createBtn').on('click', function(e) {
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                self.$el.show();
                $('.PopupMenu').hide();
            });

            this.model.on('createBtnMenuData', function(data) {
                self.renderBtnMenu(data);
            });
            $('body').delegate('#btnMenu li a', 'click', function() {
                var eleType = $(this).data('id');
                var templateData = self.model.get('templateData') || {};
                if (templateData[eleType]) {
                    self.createTemplate(eleType);
                } else {
                    self.model.reqEleData(eleType);
                }
            });
            this.model.on('createEleData', function(data, eleType) {
                var templateData = self.model.get('templateData') || {};
                templateData[eleType] = data;
                self.model.set('templateData', templateData);
                self.createTemplate(eleType);
            });
            $(document).on('click', function() {
                self.hideMenu();
                $('.PopupMenu').hide();
            });
        },
        template: _.template($('#tpl-eleMenu').html()),
        renderBtnMenu: function(data) {
            this.$el.html(this.template(data));
            $('.dropdown').append(this.el);
            this.hideMenu();
        },
        bindMethod: function(eleType) {
            var self = this;
            var method = {
                table: self.createTable,
                div: self.createDiv,
                button: self.createButton,
                inputText: self.createInput,
                image: self.createImage,
            };
            return method[eleType];
        },
        createTemplate: function(eleType) {
            var eleDOM = this.model.get('eleDOM') || {};
            var templateData = this.model.get('templateData') || {};
            var methodName = this.bindMethod(eleType);
            eleDOM[eleType] = methodName(templateData[eleType]);
            this.model.set('eleDOM', eleDOM);
            eleDOM[eleType].attr('etype', eleType);
            $('#content').append(eleDOM[eleType]);
            this.hideMenu();
        },
        createTable: function(data) {
            var mytable = document.createElement("table");
            var rows = data.rows;
            var cols = data.cols;
            for (var j = 0; j < rows; j++) {
                var mycurrent_row = document.createElement("tr");
                for (var i = 0; i < cols; i++) {
                    var mycurrent_cell = document.createElement("td");
                    var find = false;
                    for (var k = 0; k < data.cells.length; k++) {
                        if (j == data.cells[k].row && i == data.cells[k].col) {
                            var currenttext = document.createTextNode(data.cells[k].data);
                            find = true;
                            break;
                        }
                    }
                    if (find == false) {
                        var currenttext = document.createTextNode('');
                    }
                    mycurrent_cell.appendChild(currenttext);
                    mycurrent_row.appendChild(mycurrent_cell);
                }
                mytable.appendChild(mycurrent_row);
            }
            mytable.setAttribute("class", 'table');
            return $(mytable);
        },
        createDiv: function(data) {
            return $(data.text);
        },
        createButton: function(data) {
            return $('<button>').attr({
                title: data.title,
                class: "btn btn-info"
            }).text(data.text);
        },
        createInput: function(data) {
            var inputText = document.createElement('input');
            inputText.setAttribute('value', data.text);
            return $(inputText);
        },
        createImage: function(data) {
            return $('<img>').attr({
                src: data.image,
                title: data.title,
            });
        },
        hideMenu: function() {
            this.$el.hide();
        }
    });
    var PopupMenuView = Backbone.View.extend({
        className: 'PopupMenu',
        initialize: function(options) {
            var self = this;
            this.model = new options.model;
            this.curEle = null;
            this.eleType = null;
            this.bindEvents();
        },
        template: _.template($('#tpl-popupMenu').html()),
        bindEvents: function() {
            var self = this;
            $('body').delegate('[etype]', 'click', function(e) {
                //$(this).css('border','2px blue solid');
                $(this).addClass('selected');

                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
                eleType = $(this).attr('etype');
                self.model.set('eleType', eleType);
                self.model.set('curEle', $(this));

                var templateData = self.model.get('templateData') || {};
                if (!templateData[eleType]) {
                    self.model.reqActionData(eleType);
                } else {
                    self.createMenuData(templateData[eleType], eleType);
                }
                self.showMenu();                
                $('.eleMenu').hide();

            });
            self.model.on('createActionData', function(data, eleType) {
                var templateData = self.model.get('templateData') || {};
                templateData[eleType] = data;
                self.model.set('templateData', templateData);
                if (!templateData[eleType]) {
                    self.model.reqActionData(eleType);
                }
                self.renderActionMenu(templateData[eleType], eleType);
            });
            $(document).on('click', function() {
                self.hideMenu();
                $('.PopupMenu').hide();
            });
        },
        bindActionEvents: function() {
            var self = this;
            var eleType = self.model.get('eleType');
            $('body').delegate('#pop-' + eleType + ' a', 'click', function(e) {
                var method = $(this).attr('value').trim();
                var ele = self.model.get('curEle');
                self[method](ele);
                self.hideMenu();
                ele.removeClass('selected');
            });
        },
        createMenuData: function(data, eleType) {
            this.$el.html(this.template({ data: data, eleType: eleType }));
            $('#content').append(this.el);
        },
        renderActionMenu: function(data, eleType) {
            this.createMenuData(data, eleType);
            this.bindActionEvents();
        },
        hideMenu: function() {
            this.$el.hide();
        },
        showMenu: function() {
            var menu = this.$el;
            var evt = window.event || arguments.callee.caller.arguments[0];
            var rightedge = window.screen.availWidth - evt.clientX;
            var bottomedge = window.screen.availHeight - evt.clientY;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            if (rightedge < menu.offsetWidth)
                menu.css('left', function() {
                    return scrollLeft + evt.clientX - menu.offsetWidth + "px";
                });
            else
                menu.css('left', function() {
                    return scrollLeft + evt.clientX + "px";
                });

            if (bottomedge < menu.offsetHeight)
                menu.css('top', function() {
                    return scrollTop + evt.clientY - menu.offsetHeight + "px";
                });
            else
                menu.css('top', function() {
                    return scrollTop + evt.clientY + "px";
                });
            menu.show();
        },
        delete: function(ele) {
            ele.remove();
        },
        backgroundColor: function(ele) {
            ele.css('backgroundColor', this.randomColor());
        },
        fontColor: function(ele) {
            ele.css('color', this.randomColor());
        },
        changeFontSize: function(ele, operator) {
            var current_fontSize = ele.css('font-Size');
            if (operator == '+') {
                var font_Size = parseInt(current_fontSize) + 1;
            } else if (operator == '-') {
                var font_Size = parseInt(current_fontSize) - 1;
            }
            current_fontSize = font_Size + "px";
            ele.css('font-size', current_fontSize);
        },
        increaseFontSize: function(ele) {
            var self = this;
            self.changeFontSize(ele, '+');
        },
        decreaseFontSize: function(ele, tplType) {
            var self = this;
            self.changeFontSize(ele, '-', tplType);
        },
        randomColor: function() {
            return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
        }
    });

    var AppView = Backbone.View.extend({
        initialize: function(options) {
            this.model = new options.model;
            this.createBtnView = new CreateBtnView(options);
            this.eleMenuView = new EleMenuView(options);
            this.popupMenuView = new PopupMenuView(options);
        }
    });

    var appView = new AppView({
        model: AppModel
    });

});
