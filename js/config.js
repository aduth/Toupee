require.config({

    deps: ['main'],

    paths: {
        jquery: 'vendor/jquery/jquery',
        jqueryui: 'vendor/jquery-ui/jquery-ui',
        underscore: 'vendor/lodash',
        backbone: 'vendor/backbone/backbone',
        localstorage: 'vendor/backbone/localstorage',
        text: 'vendor/require/text'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        jqueryui: {
            deps: ['jquery']
        },
        localstorage: {
            deps: ['backbone']
        }
    }

});
