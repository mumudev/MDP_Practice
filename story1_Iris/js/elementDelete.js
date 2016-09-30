function deleteElements() {
    var childs = getSelectedChilds();

    for(var i = childs.length - 1; i >= 0;  -- i) {
        document.getElementById("new-item").removeChild(childs[i]);
    }
};
