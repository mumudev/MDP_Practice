 function Bootstrap(){}
 Bootstrap.prototype.addBootstrapClass=function(){
    $("img").addClass("img-circle");
    $("[type='button']").addClass("btn-info");
    $("[type='text']").addClass("form-control");
    $("table").addClass("table-bordered table-striped");
    $("div.createdElements").addClass("form-group");
};