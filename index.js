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

var initMethod = {

    init: function() {
        // body...
        initMethod._bind();
    },
    _bind: function() {
        // body...
        for (var i = 0; i < document.getElementsByName("btn").length; i++) {
            document.getElementsByName("btn")[i].onclick = binding;
        }
    }

};

var binding = function(e) {
    var method = null;
    switch (this.id) {
        case elementId.createBtn:
            method = bindMethod.create;
            break;
        case elementId.deleteBtn:
            method = bindMethod.delete;
            break;
        case elementId.changeBgColorBtn:
            method = bindMethod.changeBgColor;
            break;
        case elementId.changeFontColorBtn:
            method = bindMethod.changeFontColor;
            break;
        case elementId.upFontSizeBtn:
            method = bindMethod.upFontSize;
            break;
        case elementId.downFontSizeBtn:
            method = bindMethod.downFontSize;
            break;
    }
    method();
};

var bindMethod = {
    create: function() {
        switch (baseMethod.getComboName()) {
            case "table":
                baseMethod.getContent().appendChild(data.table());
                break;
            case "button":
                baseMethod.getContent().appendChild(data.button());
                break;
            case "inputtext":
                baseMethod.getContent().appendChild(data.inputtext());
                break;
            case "div":
                baseMethod.getContent().appendChild(data.div());
                break;
        }
    },
    delete: function() {
        var comboName = baseMethod.getComboName().toUpperCase();
        var contentList = baseMethod.getContentList();
        for (var i = contentList.length - 1; i >= 0; i--) {
            if (contentList[i].nodeName == comboName) {
                baseMethod.removeElement(contentList[i]);
            }
        }
    },
    changeBgColor: function() {
        var comboName = baseMethod.getComboName().toUpperCase();
        var contentList = baseMethod.getContentList();
        for (var i = 0; i < contentList.length; i++) {
            if (contentList[i].nodeName == comboName) {
                contentList[i].style["background-color"] = "rgb(" + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + ")";
            }
        }
    },

    changeFontColor: function() {
        var comboName = baseMethod.getComboName().toUpperCase();
        var contentList = baseMethod.getContentList();
        for (var i = 0; i < contentList.length; i++) {
            if (contentList[i].nodeName == comboName) {
                contentList[i].style["color"] = "rgb(" + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + "," + Math.ceil(Math.random() * 255) + ")";
            }
        }
    },
    upFontSize: function() {
        var comboName = baseMethod.getComboName().toUpperCase();
        var contentList = baseMethod.getContentList();
        for (var i = 0; i < contentList.length; i++) {
            if (comboName.indexOf(contentList[i].nodeName) != -1) {
                var fontSize = contentList[i].style["font-size"] === "" ?
                    17 : parseInt(contentList[i].style["font-size"].replace(/[^0-9]/ig, "")) + 1;
                contentList[i].style["font-size"] = "" + fontSize + "px";
            }
        }
    },
    downFontSize: function() {
        var comboName = baseMethod.getComboName().toUpperCase();
        var contentList = baseMethod.getContentList();
        for (var i = 0; i < contentList.length; i++) {
            if (comboName.indexOf(contentList[i].nodeName) != -1) {
                var fontSize = contentList[i].style["font-size"] === "" ?
                    15 : parseInt(contentList[i].style["font-size"].replace(/[^0-9]/ig, "")) - 1;
                contentList[i].style["font-size"] = fontSize + "px";
            }
        }
    }
};

var baseMethod = {
    getElementById: function(value) {
        // body...
        return document.getElementById(value);
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
    }

};
var data = {
    table: function() {
        // body...
        var e = document.createElement("table");
        var data = '<tr>' +
            '		<td>element1</td>' +
            '		<td>element2</td>' +
            '		<td>element3</td>' +
            '		<td>element4</td>' +
            '		<td>element5</td>' +
            '	</tr>' +
            '	<tr>' +
            '		<td>element1</td>' +
            '		<td>element2</td>' +
            '		<td>element3</td>' +
            '		<td>element4</td>' +
            '		<td>element5</td>' +
            '	</tr>' +
            '	<tr>' +
            '		<td>element1</td>' +
            '		<td>element2</td>' +
            '		<td>element3</td>' +
            '		<td>element4</td>' +
            '		<td>element5</td>' +
            '	</tr>' +
            '	<tr>' +
            '		<td>element1</td>' +
            '		<td>element2</td>' +
            '		<td>element3</td>' +
            '		<td>element4</td>' +
            '		<td>element5</td>' +
            '	</tr>';
        e.innerHTML = data;
        return e;
    },
    button: function() {
        // body...
        var e = document.createElement("button");
        var data = 'New Button';
        e.innerHTML = data;
        return e;
    },
    inputtext: function() {
        // body...
        var e = document.createElement("input");
        var data = 'This is a input text';
        e.type = "text";
        e.value = data;
        return e;
    },
    div: function() {
        // body...
        var e = document.createElement("div");
        var data = 'This is a div';
        e.innerHTML = data;
        return e;
    }
};

initMethod.init();
