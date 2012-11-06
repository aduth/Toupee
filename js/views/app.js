define([
    'backbone',
    'views/bills',
    'text!templates/statistics.html'
], function(Backbone, BillsView, statisticsTemplate) {

    // Application view is a parent view responsible for capturing and delegating
    // events to sub-views, and displaying information relevant to the entire application
    var AppView = Backbone.View.extend({

        // Delegate events for bill creation and clear
        events: {
            'click .addNew': 'addNew',
            'click .clearPaid': 'clearPaid'
        },

        // Compile template for statistics display (total due)
        statisticsTemplate: _.template(statisticsTemplate),

        // When initializing application view, create new bills view to handle display
        // of individual bill records
        initialize: function() {
            var billsView = new BillsView({ el: this.$('.bills') });
            billsView.on('change', this.updateStatistics, this);
            billsView.fetch();
            this.billsView = billsView;
        },

        // Update statistics with the new total amount due. This is triggered from the
        // bills sub-view
        updateStatistics: function(total) {
            $('.statistics', this.el).html(
                this.statisticsTemplate({ total: total })
            );
        },

        // Delegate "Add new bill" button event to bills sub-view
        addNew: function() {
            this.billsView.trigger('addNew');
        },

        // Delegate "Clear paid bills" button event to bills sub-view
        clearPaid: function() {
            this.billsView.trigger('clearPaid');
        },

        // Nothing to render itself, but return this to provide access to element
        render: function() {
            return this;
        }

    });

    return AppView;

});