angular.module("phoneBook").controller("loginCtrl", function ($location, $scope, contactsAPI) {

	$scope.operadoras = [];

	$scope.successfulLogin = function (contact) {
		// implement loginApiService
		contact.serial = serialGenerator.generate();
		contactsAPI.saveContact(contact).success(function (data) {
			delete $scope.contact;
			$scope.contactForm.$setPristine();
			$location.path("/contacts");
		});
	};

});
