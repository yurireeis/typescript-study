angular.module("phoneBook").controller("newContactCtrl", function ($location, $scope, contactsAPI, carriersAPI, serialGenerator) {

	$scope.carriers = [];

	var loadCarriers = function () {
		carriersAPI.getCarriers().success(function (data) {
			$scope.carriers = data.carriers;
		});
	};

	$scope.addContact = function (contact) {
		contactsAPI.saveContact(contact).success(function (data) {
			delete $scope.contact;
			$scope.contactForm.$setPristine();
			$location.path("/contacts");
		});
	};

	loadCarriers();

});
