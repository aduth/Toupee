define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/bill.html',
    'jqueryui'
], function($, _, Backbone, billTemplate) {

    var BillView = Backbone.View.extend({

        tagName: 'tr',

        template: _.template(billTemplate),

        events: {
            'click .destroy span': 'clear',
            'click .edit': 'edit',
            'keypress .edit': 'saveIfEnter',
            'focusout .edit': 'clearEdit',
            'change .date-picker': 'updateDate',
            'click .is-paid span ': 'togglePaid'
        },

        initialize: function() {
            this.model.on('change', this.render, this);

            // If model is destroyed, remove view
            this.model.on('destroy', this.remove, this);
        },

        clear: function() {
            this.model.destroy();
        },

        // Upon clicking description or amount, set element as editable
        edit: function(e) {
            $(e.target)
                .attr('contenteditable', '')
                .focus();
        },

        // If editing description or amount, and presses enter key, save
        saveIfEnter: function(e) {
            if (e.which !== 13) {
                return;
            }

            this.clearEdit(e);
        },

        // If editing description or amount, and leaves field, save
        clearEdit: function(e) {
            var $tar = $(e.target);
            if ($tar.is('[contenteditable]')) {
                $tar.removeAttr('contenteditable').blur();
                this.save();
            }
        },

        save: function() {
            // Retrieve values from text (or defaults if empty)
            var updateKeys = ['due', 'description', 'amount'],
                vals = {};
            _.each(updateKeys, function(key) {
                var text = $('.' + key, this.el).text();
                if (text.length) { vals[key] = text; }
            }, this);
            vals = _.defaults(vals, _.pick(this.model.defaults, updateKeys));

            // Convert from text to property type
            vals.due = new Date(Date.parse(vals.due));
            vals.amount = parseFloat(vals.amount) || this.model.defaults.amount;

            // Save
            this.model.save(vals);
        },

        // Upon selecting a date using the date picker, pull value from set field
        // and assign to text display, then save
        updateDate: function() {
            $('.due', this.el).text(
                $('.date-picker', this.el).val()
            );

            this.save();
        },

        // Upon clicking paid checkmark, trigger model to toggle property
        togglePaid: function() {
            this.model.togglePaid();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            // Add jQuery UI date picker
            $('.date-picker', this.el).datepicker({
                buttonImage: 'assets/img/calendar.png',
                buttonImageOnly: true,
                showOn: 'both'
            });

            // Return this to provide access to element
            return this;
        }

    });

    return BillView;

});