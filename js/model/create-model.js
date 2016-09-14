var createBtn = Backbone.Model.extend({
    initialize: function() {
        //var deferred = jQuery.Deferred();
        var self = this;
        $.ajax({
            type: 'get',
            url: domain
        }).done(function(res) {
            self.set({
                btnList: res.data,
            });
        }).fail(function(err) {
            console.info(err);
        });
    }
});