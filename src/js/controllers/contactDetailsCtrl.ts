angular.module("phoneBook").controller("contactDetailsCtrl", function ($scope, $routeParams, contactsAPI) {
	contactsAPI.getContact($routeParams.id).success(function (contact) {
        $scope.contact = contact;
    });
});
