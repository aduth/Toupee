define([
    'backbone',
    'models/bill',
    'localstorage'
], function(Backbone, Bill, Store) {

    var Bills = Backbone.Collection.extend({

        model: Bill,

        localStorage: new Store('bills'),

        // Sort models on date attribute
        // TODO: Allow sorting on different attributes?
        comparator: function(bill) {
            return bill.get('due');
        }

    });

    return Bills;

});