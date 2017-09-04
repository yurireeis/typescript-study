angular.module("phoneBook").controller("listContactCtrl", function ($scope, contactsAPI, serialGenerator) {

	$scope.contact = [];

	var loadContacts = function () {
		contactsAPI.getContacts().success(function (data) {
			$scope.contacts = data.contacts;
		}).error(function (data, status) {
			$scope.error = "Não foi possível carregar os dados!";
		});
	};

	$scope.deleteContact = function (contacts) {
		$scope.contacts = contacts.filter(function (contact) {
			if (!contact.selecionado) return contact;
		});
	};

	$scope.isSelectedContact = function (contacts) {
		return contacts.some(function (contact) {
			return contact.selected;
		});
	};

	$scope.orderBy = function (field) {
		$scope.orderDefinition = field;
		$scope.orderDirection = !$scope.orderDirection;
	};

	loadContacts();

});
