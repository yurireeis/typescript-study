angular.module("phoneBook").factory("errorInterceptor", function ($q, $location) {
  return {
    // aqui você define como lidar com requests rejeitadas
    responseError: function (rejection) {

      // caso ocorra um 404 o usuário é direcionado a página de erro
      if (rejection.status === 404) $location.path("/error");

      console.log(rejection);
      return $q.reject(rejection);
    }
  }
});
