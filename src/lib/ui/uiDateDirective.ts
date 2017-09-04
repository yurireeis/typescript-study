angular.module("ui");
angular.module("ui").directive('uiDate', function() {
  return {
    restrict: 'A',
    require : 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      $(element).datepicker({
        dateFormat:'dd/mm/yy',
        language: 'pt-BR',
        pickTime: false,
        startDate: '01-11-2013',
        endDate: '01-11-2030'
      }).on('changeDate', function(e) {
        ngModelCtrl.$setViewValue(e.date.toLocaleDateString());
        scope.$apply();
      });
    }
  };
});
