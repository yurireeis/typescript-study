angular.module("phoneBook").config(function ($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "../view/login.html",
		controller: "loginCtrl"
	});
	$routeProvider.when("/contacts", {
		templateUrl: "../view/contacts.html",
		controller: "listContactCtrl"
		// resolve : {
		// 	contatos: function (contactsAPI) {
		// 		return contactsAPI.getContacts();
    //         }
		// }
	});

	$routeProvider.when("/newContact", {
		templateUrl: "../view/newContact.html",
		controller: "newContactCtrl"
        // resolve: {
		    // operadoras: function (carrierAPI) {
		    //     return carrierAPI.getCarriers();
        //     }
        // }
	});

	$routeProvider.when("/contact/:id", {
	    templateUrl: "view/contactDetails.html",
        controller: "contactDetailsCtrl",
        // resolve: {
	      //   contato: function (contactsAPI, $route) {
	      //       // pega o id corrente da rota
	      //       return contactsAPI.getContact($route.current.params.id);
        //     }
        // }
    });

		$routeProvider.when("/error", {
			templateUrl: "view/error.html"
		});

	$routeProvider.otherwise({
		redirectTo: "/login"
	});

});
