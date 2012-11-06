require([
    'views/app'
], function(AppView) {

    // Initialize and render application view
    new AppView({ el: '#appView' }).render();

});