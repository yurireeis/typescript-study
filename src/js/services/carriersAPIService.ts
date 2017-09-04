angular.module("phoneBook").service("carriersAPI", function ($http, config) {
	this.getCarriers = function () {
		return $http.get(config.baseUrl + "/carriers");
	};
});
