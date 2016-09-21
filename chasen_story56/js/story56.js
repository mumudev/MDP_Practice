// var buttonData;
// var textData;
// var tableData;
// var divData;
// var imageData;

// var buttonAct;
// var tableAct;
// var divAct;
// var imageAct;
// var textAct;

/**
    global variable selected Element in contents
*/
var selElement;

// function showTypeMenu(event) {
//     cancelMenu("need");
//     var menuType = document.getElementsByClassName("menu_type")[0];
//     var x = event.clientX;
//     var y = event.clientY;
//     if (menuType.style.display == "block") {
//         menuType.style.display = "none";
//     } else {
//         menuType.style.left = x + "px";
//         menuType.style.top = y + "px";
//         menuType.style.display = "block";
//     }
// }

function unchooseOther(ele) {
    cancelMenu("need");
    var childs = $(ele).parent().children();
    for (i = 0; i < childs.length; i++) {
        if (childs[i] !== selElement) {
            childs[i].style.border = "1px solid black";
        }
    }
}
var cancel = {
    cancelMenu: function() {
        var menu = document.getElementsByClassName("menu");
        for (var i = 0; i < menu.length; i++) {
            menu[i].style.display = "none";
        }
        if (selElement) {
            if (selElement.style.border) {
                selElement.style.border = "1px solid black";
            }
        }
    }
};


function cancelMenu(str) {
    var menu = document.getElementsByClassName("menu");
    for (var i = 0; i < menu.length; i++) {
        menu[i].style.display = "none";
    }
    // if (selElement) {
    //     if (selElement.style.border) {
    //         selElement.style.border = "1px solid black";
    //     }
    // }
}


/**
        cancel choosing other Elements in contents except selElement
*/
function cancelMenu_type() {
    var menuType = document.getElementsByClassName("menu_type")[0];
    menuType.style.display = "none";
}

function cancel() {
    cancelMenu_type();
    cancelMenu();
}


/*document.onclick = function() { cancel(); };*/
