(function() {

    function configure($mdThemingProvider) {
	    // Configure a dark theme with primary foreground yellow
	    $mdThemingProvider
	    	.theme('docs-dark', 'default')
	    	.primaryPalette('yellow')
	    	.dark()
    		.foregroundPalette['3'] = 'yellow';
	};

	angular.module('myOnotes.services', []);
	angular.module('myOnotes.controllers', ['ngMaterial', 'myOnotes.services'])
		.config(['$mdThemingProvider', configure]);

	angular.module('myOnotes', ['ngMaterial', 'myOnotes.controllers', 'myOnotes.services'])
        .config(['$mdThemingProvider', configure])
        .run([])
        .constant([]);	

}());