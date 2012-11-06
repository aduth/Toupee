# Toupée

[http://aduth.github.com/Toupee/](http://aduth.github.com/Toupee/)

Toupée ("ToPay") is an experimental bill tracking application inspired by [TodoMVC](http://addyosmani.github.com/todomvc/), a popular learning application used to demonstrate JavaScript MV* frameworks.

## Why

The project is a personal exploration of modern JavaScript best practices and design patterns. Specifically, it makes extensive use of [RequireJS](http://requirejs.org/) for modularisation and the [Backbone.js](http://backbonejs.org/) MV* framework.

## Development stack

The following frameworks and tools were used:

* [RequireJS](http://requirejs.org/) - for JavaScript modularization
* [Backbone.js](http://backbonejs.org/) - for JavaScript model/view structure
* [jQuery](http://jquery.com) and [jQuery UI](http://jqueryui.com) (date picker)
* [SASS](http://sass-lang.com/) with [Bourbon](http://bourbon.io/) and [Neat](http://neat.bourbon.io/) - for maintainable stylesheets and responsive layout
* [normalize.css](http://necolas.github.com/normalize.css/) - for a consistent base browser style

## Running locally

Running locally requires [Node.js](http://nodejs.org) and
[grunt-bbb](http://github.com/backbone-boilerplate/grunt-bbb). After installed, run the following commands in the project directory:

    bbb debug
    bbb server:debug

You should then be able to navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

## Credits

Some best practices and project structure influenced by:

* [Backbone Patterns](http://ricostacruz.com/backbone-patterns/)
* [Backbone Boilerplate](https://github.com/tbranyen/backbone-boilerplate)
* [TodoMVC: Backbone.js and RequireJS implementation](https://github.com/addyosmani/todomvc/tree/gh-pages/dependency-examples/backbone_require)
* [GitHub Viewer](https://github.com/tbranyen/github-viewer)

## License

Copyright (c) 2012 Andrew Duthie
Released under the MIT License