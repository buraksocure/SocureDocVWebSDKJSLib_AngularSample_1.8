(function() {
  angular.module('app')
    .directive('socure', function() {
      return {
        restrict: 'E',
        scope: {
          config: '=',
          inputData: '=',
          processConfig: '=',
          firstAttribute: '=',
          sdkKey: '='
        },
        templateUrl: 'socureDirective.html',
        link: function(scope, element, attrs) {
          scope.sdkInitiated = false;

          scope.onScriptLoad = function() {
            scope.initSocure();
          };

          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://websdk.socure.com/bundle.js';
          script.onload = scope.onScriptLoad;
          element[0].appendChild(script);

          scope.initSocure = function() {
            scope.start = function() {
              if (scope.sdkInitiated) {
                scope.clearSession();
                console.log('cleaned');
                scope.sdkInitiated = false;
              }

              SocureInitializer.init(scope.sdkKey)
                .then(function(lib) {
                  lib.init(scope.sdkKey, "#websdk", scope.config).then(function() {
                    lib.start(scope.firstAttribute, scope.inputData, scope.processConfig).then(function(response) {
                      console.log(response);
                      scope.sdkInitiated = true;
                    },
                    function(error) {
                      console.log(error);
                    });
                  });
                });
            };

            scope.clearSession = function() {
              Socure.cleanup();
              Socure.reset();
              sessionStorage.removeItem('documentVerificationToken');
              sessionStorage.removeItem('publicApiKey');
              localStorage.removeItem('devicer_id');
              console.log("Socure DocV Session cleaned!");
            };

            scope.start();
          };
        }
      };
    });
})();
