define([
    'jquery',
    'underscore',
    'backbone',
    'views/bill',
    'collections/bills',
    'text!templates/bills.html'
], function($, _, Backbone, BillView, Bills, billsTemplate) {

    var BillsView = Backbone.View.extend({

        template: _.template(billsTemplate),

        // On initialize, create new bill collection and setup capture handlers for
        // events triggered from parent view (i.e. fetch, addNew, clearPaid)
        initialize: function() {
            this.collection = new Bills();

            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.render, this);
            this.collection.on('change:due', this.resort, this);
            this.collection.on('add remove', this.checkEmpty, this);
            this.collection.on('add remove reset change:amount change:paid', this.updateStatistics, this);

            this.on('fetch', this.fetch, this);
            this.on('addNew', this.addNew, this);
            this.on('clearPaid', this.clearPaid, this);
        },

        // Clear existing rows when reset or manually rendered before appending collection
        render: function() {
            this.$el.html(this.template(this.collection));

            this.addAll();
            this.checkEmpty();

            // Return this to provide access to element
            return this;
        },

        // Collection is sorted by date, so re-sort and re-render when date is updated
        resort: function() {
            this.collection.sort();
            this.render();
        },

        // Display empty placeholder if collection is empty
        checkEmpty: function() {
            $('tr.empty', this.el).toggleClass('hide', this.collection.length > 0);
        },

        updateStatistics: function() {
            var unpaidBills = this.collection.where({ paid: false }),
                total = 0.0;

            if (unpaidBills.length) {
                // For unpaid bills...
                total = _.chain(unpaidBills)
                    // ...get amount...
                    .map(function(bill) {
                        return bill.get('amount')
                    })
                    // ...then sum...
                    .reduce(function(memo, amount) {
                        return memo + amount;
                    })
                    .value();
            }

            // Update parent statistics view
            this.trigger('change', total);
        },

        fetch: function() {
            this.collection.fetch();
        },

        addNew: function() {
            this.collection.create();
        },

        // Find paid bills and destroy. Bill view will remove itself upon destroy
        clearPaid: function() {
            _.each(this.collection.where({ paid: true }), function(bill) {
                bill.destroy();
            });
        },

        addOne: function(bill) {
            var billView = new BillView({ model: bill });
            $('tbody', this.el).append(billView.render().el);
        },

        addAll: function() {
            this.collection.each(this.addOne, this);
        }

    });

    return BillsView;

});