define(function(require,exports,module){ 
		var app = require('./core.js');
		app.config(require('./config.js'));
		app.value('fbURL', 'https://intense-fire-1848.firebaseio.com/')
		app.factory(require('./factory.js'));
		app.directive(require('./directive'));
		app.controller(require('./controller.js'));	 

});