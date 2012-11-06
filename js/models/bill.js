define([
    'backbone'
], function(Backbone) {

    var Bill = Backbone.Model.extend({

        defaults: {
            due: new Date(), // Only calculated on initial load (intentional)
            description: '[Click to edit description]',
            amount: 0.0,
            paid: false
        },

        togglePaid: function() {
            this.save({ 'paid': !this.get('paid') });
        },

        parse: function(bill) {
            // Date is stored as string, so parse before setting attribute
            bill.due = new Date(Date.parse(bill.due));

            return bill;
        }

    });

    return Bill;

});