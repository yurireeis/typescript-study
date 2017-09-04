angular.module("phoneBook").factory("timestampInterceptor", function () {
  return {
    // o config é o objeto da request contendo todos os dados
    request: function (config) {
      var url = config.url;

      // essa validação serve para pular arquivos provenientes da view (que podem sim ser passíveis de cache)
      if (url.indexOf('view') > -1) return config;

      var timestamp = new Date().getTime();

      // interceptando a url para passar o timestamp via query string
      // isso pode ser útil para burlar mecanismos de cache
      config.url = url + "?timestap=" + timestamp;

      console.log(config);
      return config;
    }
  }
});
