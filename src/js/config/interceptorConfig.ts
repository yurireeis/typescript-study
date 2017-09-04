angular.module("phoneBook").config(function ($httpProvider) {
  $httpProvider.interceptors.push("timestampInterceptor");
  $httpProvider.interceptors.push("errorInterceptor");
  $httpProvider.interceptors.push("loadingInterceptor");
});
