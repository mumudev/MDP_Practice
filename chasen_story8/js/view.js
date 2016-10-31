var menuTypeView = Backbone.View.extend({
    tagName: "div",
    className: "menu_type menu btn-group-vertical",
    initialize: function() {
        this.dataUrl = new dataUrlModel();
        this.model = new menuTypeModel(this.dataUrl.get("menuType"));
        console.log(this.model);
        var self = this;
        $(".head_button[value='Create']").on("click", function() {
            self.render();
        });
        //this.listenTo(this.model, "change", this.render);
    },
    render: function() {
        cancelMenu("need");
        if ($(".menu_type").length > 0) {
            $(".menu_type").html("");
        } else {
            $(".container").append(this.$el);
        }
        for (var i = 0; i < this.model.get("data").data.length; i++) {
            $(".menu_type").append('<input class="menu_button button menu_type_button btn btn-info" type="button" id="' + this.model.get("data").data[i].id + '" value="' + this.model.get("data").data[i].text + '" >');
        }
        var EVT = window.event ? window.event : e;
        var x = EVT.clientX;
        var y = EVT.clientY;
        if (this.el.style.display == "block") {
            this.el.style.display = "none";
        } else {
            this.el.style.left = x + "px";
            this.el.style.top = y + "px";
            this.el.style.display = "block";
        }
    },

});


var elements = Backbone.View.extend({
    tagName: "div",
    initialize: function(objs) {
        //this.el = document.getElementById("contents_p");
        this.dataUrl = new dataUrlModel();
        var self = this;
        this.eleCounter = this.model;
        this.operateView = objs.operateView;
        this.modelButton = new menuSampleModel(this.dataUrl.get("sampleDatabutton"));
        this.modelInputText = new menuSampleModel(this.dataUrl.get("sampleDatainputText"));
        this.modelTable = new menuSampleModel(this.dataUrl.get("sampleDatatable"));
        this.modelDiv = new menuSampleModel(this.dataUrl.get("sampleDatadiv"));
        this.modelImage = new menuSampleModel(this.dataUrl.get("sampleDataimage"));
        //this.listenTo(this.eleCounter, "change", this.renderSVG);
        // this.modelButton = {};
        // this.listenTo(self.modelButton, "change:data", function() {
        //     console.log("Change!");
        //     self.render.call(self, self.eletype);
        // });
        $(".container").delegate(".menu_type_button", "click", function() {
            self.eletype = this.id;
            self.model = new menuSampleModel(self.dataUrl.get("sampleData" + self.eletype));
            self.render.call(self, self.eletype);
        });

    },
    render: function(eletype) {
        // var content = document.getElementById("contents_p");
        var newNode = this.initializeNode.call(this, eletype);
        if (newNode) {
            this.el.appendChild(newNode);
            this.eleCounter.set("" + eletype, (this.eleCounter.get("" + eletype) + 1));
        }
        cancelMenu_type();
        return this;
    },
    initializeNode: function(eletype) {
        var newNode = null;
        if (eletype) {
            if (eletype == "inputText") {
                newNode = document.createElement("input");
                $(newNode).addClass(eletype + "s");
                newNode.type = "text";
                $(newNode).addClass("form-control");
                newNode.style.width = "150px";
                newNode.style.height = "40px";
                //$(newNode).addClass("");
            } else if (eletype == "image") {
                newNode = document.createElement("img");
                $(newNode).addClass(eletype + "s");
                $(newNode).addClass("img-rounded");
            } else if (eletype == "button") {
                newNode = document.createElement("button");
                $(newNode).addClass(eletype + "s");
                $(newNode).addClass("btn");
                //$(newNode).addClass("btn-default");
                newNode.style.cursor = "pointer";
                newNode.style.width = "150px";
                newNode.style.height = "50px";
            } else if (eletype == "table") {
                newNode = document.createElement(eletype);
                $(newNode).addClass(eletype + "s");
                $(newNode).addClass("table");
                $(newNode).addClass("table-striped");
                // newNode.style.width = "130px";
                // newNode.style.height = "130px";
            } else {
                newNode = document.createElement(eletype);
                $(newNode).addClass(eletype + "s");
                $(newNode).addClass("text-info");
                newNode.style.width = "130px";
                newNode.style.height = "130px";
            }
            /*bind event to the created elements */

            //TODO ··············································································
            this.bindEventOnCtdEle.call(this, newNode);
            //TODO··············································································
            newNode.style.float = "left";
            newNode.style.border = "1px solid black";
            newNode.style.fontSize = "15px";
            newNode = this.addNodeExampleContent.call(this, newNode, self);
        }
        return newNode;
    },
    bindEventOnCtdEle: function(newNode) {
        var self = this;
        $(newNode).bind("click", function operate() {
            //cancelMenu();
            selElement = this;
            console.log(selElement.style.fontSize);
            //cancel choosing other Elements in contents except selElement
            unchooseOther(selElement);
            var eletype1 = this.tagName.toLowerCase();
            console.log(eletype1);
            self.operateView.render(eletype1);
        });
    },
    addNodeExampleContent: function(newNode) {
        var eletype = newNode.tagName.toLowerCase();
        newNode = $(newNode);
        if (eletype == "table") {
            //define a variable to loop through(traverse) the CellData Array
            var cells_index = 0;
            for (var i = 0; i < this.modelTable.get("data").data.rows; i++) {
                if (i === 0) {
                    newNode.append("<thead></thead>");
                    newNode.children("thead").append("<tr></tr>");
                } else if (i === 1) {
                    newNode.append("<tbody></tbody>").append("<tr></tr>");
                } else {
                    newNode.children("tbody").append("<tr></tr>");
                }
                for (var j = 0; j < this.modelTable.get("data").data.cols; j++) {
                    newNode.find("tr:eq(" + i + ")").append("<td></td>");
                    //currentCell in returned CellData Array 
                    var curCell = this.modelTable.get("data").data.cells[cells_index];
                    //if currentCell's row amd col will be show in the current item of Table 
                    if (curCell.row == i && curCell.col == j) {
                        //set the currentCell's data into the current item 
                        newNode.find("tr:eq(" + i + ")").children("td:eq(" + j + ")").text(curCell.data);
                        //jump into the next one in the returned CellData Array
                        cells_index++;
                    }
                }
            }
        } else if (eletype == "input") {
            newNode.val(this.modelInputText.get("data").data.text);
        } else if (eletype == "div") {
            newNode.html(this.modelDiv.get("data").data.text);
        } else if (eletype == "button") {
            newNode.html(this.modelButton.get("data").data.text);
            newNode.css("cursor", "pointer");
            newNode.attr("title", this.modelButton.get("data").data.title);
        } else {
            newNode.attr("src", this.modelImage.get("data").data.image);
            newNode.attr("title", this.modelImage.get("data").data.title);
        }
        return newNode[0];
    },
    // addNodeExampleContent: function(newNode) {
    //     console.log("sample-----------------------------------------------");
    //     console.log(this.model);
    //     console.log("sample-----------------------------------------------");
    //     var eletype = newNode.tagName.toLowerCase();
    //     newNode = $(newNode);
    //     if (eletype == "table") {
    //         //define a variable to loop through(traverse) the CellData Array
    //         var cells_index = 0;
    //         for (var i = 0; i < this.model.get("data").data.rows; i++) {
    //             if (i === 0) {
    //                 newNode.append("<thead></thead>");
    //                 newNode.children("thead").append("<tr></tr>");
    //             } else if (i === 1) {
    //                 newNode.append("<tbody></tbody>").append("<tr></tr>");
    //             } else {
    //                 newNode.children("tbody").append("<tr></tr>");
    //             }
    //             for (var j = 0; j < this.model.get("data").data.cols; j++) {
    //                 newNode.find("tr:eq(" + i + ")").append("<td></td>");
    //                 //currentCell in returned CellData Array 
    //                 var curCell = this.model.get("data").data.cells[cells_index];
    //                 //if currentCell's row amd col will be show in the current item of Table 
    //                 if (curCell.row == i && curCell.col == j) {
    //                     //set the currentCell's data into the current item 
    //                     newNode.find("tr:eq(" + i + ")").children("td:eq(" + j + ")").text(curCell.data);
    //                     //jump into the next one in the returned CellData Array
    //                     cells_index++;
    //                 }
    //             }
    //         }
    //     } else if (eletype == "input") {
    //         newNode.val(this.model.get("data").data.text);
    //     } else if (eletype == "div") {
    //         newNode.html(this.model.get("data").data.text);
    //     } else if (eletype == "button") {
    //         newNode.html(this.model.get("data").data.text);
    //         newNode.css("cursor", "pointer");
    //         newNode.attr("title", this.model.get("data").data.title);
    //     } else {
    //         newNode.attr("src", this.model.get("data").data.image);
    //         newNode.attr("title", this.model.get("data").data.title);
    //     }
    //     return newNode[0];
    // }

});

var menuOperateView = Backbone.View.extend({
    counter: {},
    initialize: function() {
        this.counter = this.model;
        this.dataUrl = new dataUrlModel();
        this.modelButton = new menuOperateModel(this.dataUrl.get("menuOperatebutton"));
        this.modelInputText = new menuOperateModel(this.dataUrl.get("menuOperateinputText"));
        this.modelTable = new menuOperateModel(this.dataUrl.get("menuOperatetable"));
        this.modelDiv = new menuOperateModel(this.dataUrl.get("menuOperatediv"));
        this.modelImage = new menuOperateModel(this.dataUrl.get("menuOperateimage"));
        var self = this;
        this.bindEventToOpreItem(self);
    },
    render: function(eletype) {
        cancelMenu("need");
        this.$el.html("");
        var _data = null;
        if (eletype == "input") {
            _data = this.modelInputText.get("data");
        } else if (eletype == "button") {
            _data = this.modelButton.get("data");
        } else if (eletype == "table") {
            _data = this.modelButton.get("data");
        } else if (eletype == "img") {
            _data = this.modelImage.get("data");
        } else {
            _data = this.modelDiv.get("data");
        }
        this.appendItem(_data);
        var EVT = window.event ? window.event : e;
        var x = EVT.clientX;
        var y = EVT.clientY;
        if (selElement.style.border == "2px solid blue") {
            selElement.style.border = "1px solid black";
            cancelMenu();
        } else {
            selElement.style.border = "2px solid blue";
            this.$el.css("left", x + "px");
            this.$el.css("top", y + "px");
            this.$el.css("display", "block");
        }

        return this;
    },

    _delete: function() {
        //$(selElement).remove();
        selElement.parentNode.removeChild(selElement);
        var deltype = selElement.tagName.toLowerCase();
        if (deltype == "img") {
            self.counter.set("image", (self.counter.get("image") === 0 ? 0 : self.counter.get("image") - 1));
        } else if (deltype == "input") {
            self.counter.set("inputText", (self.counter.get("inputText") === 0 ? 0 : self.counter.get("inputText") - 1));
        } else {
            self.counter.set("" + deltype, (self.counter.get("" + deltype) === 0 ? 0 : self.counter.get("" + deltype) - 1));
        }
        cancel.cancelMenu();
    },
    backcolor: function() {
        selElement.style.backgroundColor = "rgb(" + Math.round(Math.random() * 255) +
            "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")";
        cancel.cancelMenu();
    },
    fontcolor: function() {
        selElement.style.color = "rgb(" + Math.round(Math.random() * 255) +
            "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")";
        cancel.cancelMenu();
    },
    _fontSize: function() {
        var operate = this.value.charAt(this.value.length - 1);
        if (operate == "+") {
            selElement.style.fontSize = (parseInt(selElement.style.fontSize, 10) + 2) + "px";
            cancel.cancelMenu();
        } else {
            selElement.style.fontSize = (parseInt(selElement.style.fontSize, 10) - 2) + "px";
            cancel.cancelMenu();
        }
    },
    bindEventToOpreItem: function(self) {
        this.$el.delegate("input:first", "click", function() {
            //$(selElement).remove();
            selElement.parentNode.removeChild(selElement);
            var deltype = selElement.tagName.toLowerCase();
            if (deltype == "img") {
                self.counter.set("image", (self.counter.get("image") === 0 ? 0 : self.counter.get("image") - 1));
            } else if (deltype == "input") {
                self.counter.set("inputText", (self.counter.get("inputText") === 0 ? 0 : self.counter.get("inputText") - 1));
            } else {
                self.counter.set("" + deltype, (self.counter.get("" + deltype) === 0 ? 0 : self.counter.get("" + deltype) - 1));
            }
            cancel.cancelMenu();

        });
        this.$el.delegate("input:eq(1)", "click", this.backcolor);
        this.$el.delegate("input:eq(2)", "click", this.fontcolor);
        this.$el.delegate("input:gt(2)", "click", this._fontSize);
    },
    appendItem: function(act) {
        var actArray = act.data;
        for (var i = 0; i < actArray.length; i++) {
            var newOne = $('<input class="head_button menu_button btn btn-info" type="button" title="' + actArray[i].title + '"value="' + actArray[i].text + '">');
            this.$el.append(newOne);
        }
    }

});


var SVGView = Backbone.View.extend({
    initialize: function() {
        //this.$el = $("" + selector_str);
        //this.eleCounter = _counterModel;
        this.eleCounter = this.model;
        this.listenTo(this.eleCounter, "change", this.render);
    },
    render: function() {
        //console.log(this.flag(this.eleCounter.get("button"), this.eleCounter.previous("button")));
        // $("svg rect.rect_button").css("height", (this.eleCounter.get("button") * 20 + 0.5) + "px");
        // $("svg rect.rect_table").css("height", this.eleCounter.get("table") * 20 + 0.5 + "px");
        // $("svg rect.rect_input").css("height", this.eleCounter.get("inputText") * 20 + 0.5 + "px");
        // $("svg rect.rect_div").css("height", this.eleCounter.get("div") * 20 + 0.5 + "px");
        // $("svg rect.rect_image").css("height", this.eleCounter.get("image") * 20 + 0.5 + "px");
        $("svg rect.rect_button").animate({
            height: this.flag(this.eleCounter.get("button"), this.eleCounter.previous("button"))
            //height: "+=20px"
        });
        $("svg rect.rect_table").animate({
            height: this.flag(this.eleCounter.get("table"), this.eleCounter.previous("table"))
        });
        $("svg rect.rect_input").animate({
            height: this.flag(this.eleCounter.get("inputText"), this.eleCounter.previous("inputText"))
        });
        $("svg rect.rect_div").animate({
            height: this.flag(this.eleCounter.get("div"), this.eleCounter.previous("div"))
        });
        $("svg rect.rect_image").animate({
            height: this.flag(this.eleCounter.get("image"), this.eleCounter.previous("image"))
        });
    },
    flag: function(number1, number2) {
        if (number1 === 0) {
            if (number2 !== 0) {
                return "-=19.5px";
            } else {
                return "0.5px";
            }
        }
        console.log(number1);
        var _flag = number1 - number2 > 0 ? "+" : "-";

        console.log((""+_flag + "=20px"));
        return ""+_flag + "=20px";
    }

});
