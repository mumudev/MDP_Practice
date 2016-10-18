function Actions(){
}
Actions.prototype.actions={
    delete:function(){
      var $s=$(".selected");
      $s.remove();
      $(".dropdown-menu").remove();
    },
    backgroundColor: function(){
      $(".selected").css("background-color",this._getRandomColor());
    },
    fontColor:function() {
      $(".selected").css("color",this._getRandomColor());
    },
    increaseFontSize: function(){
      this._setFontSize('+');
    },
    decreaseFontSize: function(){
          this._setFontSize('-');
    },
    _getRandomColor: function(){
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    _setFontSize: function(type) {
          var $s=$(".selected");
          var fontSize=$s.css("font-size");
          fontSize = eval((parseInt(fontSize)+type+2)) + "px";
          $s.css("font-size",fontSize);
    },
    changeStyleBorder:function(element) {
        $(".createdElements").css("border","2px solid gray");
        element.style.border = "2px solid blue";
    },
};