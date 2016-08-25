var elementId = {
    combo: "combo",
    content: "content",
    createBtn: "createBtn",
    deleteBtn: "deleteBtn",
    changeBgColorBtn: "changeBgColorBtn",
    changeFontColorBtn: "changeFontColorBtn",
    upFontSizeBtn: "upFontSizeBtn",
    downFontSizeBtn: "downFontSizeBtn"
};
var test = [1, 2, 3];
var itemId = 0;
var selected;
var initMethod = {

    init: function() {
        initMethod._bind();
        menu.style.display = "none";
        document.getElementById("createMenu").style.display = "none";
    },

    _bind: function() {
        document.getElementById("createBtn").onclick = function(e) {
            document.getElementById("createMenu").style.display = "";
        };
        for (var i = 0; i < document.getElementsByName("createBtn").length; i++) {
            document.getElementsByName("createBtn")[i].onclick = bindMethod.create;
        }
        for (var i = 0; i < document.getElementsByName("btn").length; i++) {
            document.getElementsByName("btn")[i].onclick = binding;
        }
        document.onclick = clearBinding;
    },

    cssStyle: function() {}

};

var binding = function(e) {
    var method = null;
    if (this.id == elementId.createBtn) {
        bindMethod.create(e);
    } else if (selected) {
        switch (this.id) {
            case elementId.deleteBtn:
                bindMethod.delete(e);
                break;
            case elementId.changeBgColorBtn:
                bindMethod.changeBgColor(e);
                break;
            case elementId.changeFontColorBtn:
                bindMethod.changeFontColor(e);
                break;
            case elementId.upFontSizeBtn:
                bindMethod.upFontSize(e);
                break;
            case elementId.downFontSizeBtn:
                bindMethod.downFontSize(e);
                break;
        }
    }
};

var clearBinding = function(e) {
    if (navigator.userAgent.indexOf('Mozilla') >= 0 && e.target.localName.match("body")) {
        selected = null;
        menu.style.display = "none";
        if (baseMethod.getElementsByClassName("selected").length) {
            baseMethod.getElementsByClassName("selected")[0].removeClass("selected");
        }
    }else if (e.target.closest&&!e.target.closest("[id^='item'],[id='menu']")) {
        selected = null;
        menu.style.display = "none";
        if (baseMethod.getElementsByClassName("selected").length) {
            baseMethod.getElementsByClassName("selected")[0].removeClass("selected");
        }
    }

};
var menuBinding = function(e) {
    var newX,newY;
    if (navigator.userAgent.indexOf('Firefox') >= 0) {
        newX = e.clientX + document.body.scrollLeft;
        newY = e.clientY + document.body.scrollTop;
    } else {
        newX = window.event.x + document.body.scrollLeft;
        newY = window.event.y + document.body.scrollTop;
    }
    selected = this.id;
    menu = document.all.menu;
    menu.style.display = "";
    menu.style.left = newX;
    menu.style.top = newY;
    if (baseMethod.getElementsByClassName("selected").length) {
        baseMethod.getElementsByClassName("selected")[0].removeClass("selected");
    }
    if (navigator.userAgent.indexOf('Mozilla') >= 0 && e.target.localName.match("body")) {
    }else{
        
    e.target.closest("[id^='item']").addClass("selected");
    }
};

var bindMethod = {
    create: function(e) {
        switch (e.currentTarget.id) {
            case "createTextBtn":
                baseMethod.getContent().appendChild(data.table());
                break;
            case "createButtonBtn":
                baseMethod.getContent().appendChild(data.button());
                break;
            case "createInputBtn":
                baseMethod.getContent().appendChild(data.inputtext());
                break;
            case "createdivBtn":
                baseMethod.getContent().appendChild(data.div());
                break;
        }
        baseMethod.getElementById("item" + itemId).onclick = menuBinding;
        document.getElementById("createMenu").style.display = "none";
        itemId++;
    },

    delete: function(e) {
        var item = baseMethod.getElementById(selected);
        baseMethod.removeElement(item);
        menu.style.display = "none";
    },

    changeBgColor: function(e) {
        var item = baseMethod.getElementById(selected);
        item.style["background-color"] = "rgb(" + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + ")";

    },

    changeFontColor: function(e) {
        var item = baseMethod.getElementById(selected);
        item.style["color"] = "rgb(" + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + ")";

    },

    upFontSize: function(e) {
        var item = baseMethod.getElementById(selected);
        var fontSize = item.style["font-size"] === "" ?
            17 : parseInt(item.style["font-size"].replace(/[^0-9]/ig, "")) + 1;
        item.style["font-size"] = "" + fontSize + "px";
    },

    downFontSize: function(e) {
        var item = baseMethod.getElementById(selected);
        var fontSize = item.style["font-size"] === "" ?
            15 : parseInt(item.style["font-size"].replace(/[^0-9]/ig, "")) - 1;
        item.style["font-size"] = fontSize + "px";
    }

};

var baseMethod = {
    getElementById: function(value) {
        // body...
        var element = document.getElementById(value);
        return baseMethod.baseElement(element);
    },
    getElementsByClassName: function(value) {
        // body...
        var elements = document.getElementsByClassName(value);
        for (var i = elements.length - 1; i >= 0; i--) {
            elements[i] = baseMethod.baseElement(elements[i]);
        }
        return elements;
    },
    baseElement: function(element) {
        element.hasClass = function(className) {
            return this.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        };
        element.addClass = function(className) {
            if (!this.hasClass(className)) this.className += " " + className;
        };
        element.removeClass = function(className) {
            if (this.hasClass(className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                this.className = this.className.replace(reg, '');
            }
        };
        return element;
    },
    getComboName: function() {
        // body...
        return document.getElementById(elementId.combo).value;
    },
    getContent: function() {
        // body...
        return document.getElementById(elementId.content);
    },
    getContentList: function() {
        // body...
        return document.getElementById(elementId.content).childNodes;
    },
    removeElement: function(_element) {
        var _parentElement = _element.parentNode;
        if (_parentElement) {
            _parentElement.removeChild(_element);
        }
    },


};
var data = {
    table: function() {
        // body...
        var e = document.createElement("table");
        e.id = "item" + itemId;
        var data = '<tr>' +
            '       <th>element1</th>' +
            '       <th>element2</th>' +
            '       <th>element3</th>' +
            '       <th>element4</th>' +
            '       <th>element5</th>' +
            '   </tr>' +
            '   <tr>' +
            '       <td>element1</td>' +
            '       <td>element2</td>' +
            '       <td>element3</td>' +
            '       <td>element4</td>' +
            '       <td>element5</td>' +
            '   </tr>' +
            '   <tr>' +
            '       <td>element1</td>' +
            '       <td>element2</td>' +
            '       <td>element3</td>' +
            '       <td>element4</td>' +
            '       <td>element5</td>' +
            '   </tr>' +
            '   <tr>' +
            '       <td>element1</td>' +
            '       <td>element2</td>' +
            '       <td>element3</td>' +
            '       <td>element4</td>' +
            '       <td>element5</td>' +
            '   </tr>';
        e.innerHTML = data;
        e.className = "table";
        e.setAttribute("cellspacing", "0px");
        return e;
    },
    button: function() {
        // body...
        var e = document.createElement("button");
        e.id = "item" + itemId;
        var data = 'New Button';
        e.innerHTML = data;
        e.className = "btn-default";
        return e;
    },
    inputtext: function() {
        // body...
        var e = document.createElement("input");
        e.id = "item" + itemId;
        var data = 'This is a input text';
        e.type = "text";
        e.value = data;
        e.className = "inputtext";
        return e;
    },
    div: function() {
        // body...
        var e = document.createElement("div");
        e.id = "item" + itemId;
        var data = 'This is a div';
        e.innerHTML = data;
        e.className = "div";
        return e;
    }
};

initMethod.init();
