angular.module("phoneBook").factory("loadingInterceptor", function ($q, $rootScope) {
  return {

    // quando uma request for disparada entra em status true
    request: function (config) {
      $rootScope.loading = true;
      return config;
    },

    // quando uma request falhar o loading entra em status false
    requestError: function () {
      $rootScope.loading = false;
      return $q.reject(rejection);
    },

    // quando receber uma response finaliza o loading na requisição
    response: function (response) {
      $rootScope.loading = false;
      return response;
    },

    // quando receber um erro na response finaliza o loading
    responseError: function (rejection) {
      $rootScope.loading = false;
      return $q.reject(rejection);
    }

  }
});
