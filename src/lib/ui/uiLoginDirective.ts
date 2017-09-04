angular.module("ui").directive("uiLogin", function ($filter) {
	return {
		require: "ngModel",
		link: function (scope, element, attrs, ctrl) {

			ctrl.$parsers.push(function (value) {
				if (value.length === 10) {
					var dateArray = value.split("/");
					return new Date(dateArray[2], dateArray[1]-1, dateArray[0]).getTime();
				}
			});

			ctrl.$formatters.push(function (value) {
				return $filter("date")(value, "dd/MM/yyyy");
			});
		}
	};
});
