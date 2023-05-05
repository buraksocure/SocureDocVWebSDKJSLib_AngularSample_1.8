angular.module('app', [])
.controller('MainController', function($scope) {
  $scope.config = {
    onProgress: function(progress) {
      console.log(progress);
      console.log('progress');
    },
    onSuccess: function(response) {
      console.log(response);
      console.log('success');
    },
    onError: function(error) {
      console.log(error);
      console.log('error');
    },
    qrCodeNeeded: true
  };

  $scope.inputData = {
    "customerUserId": "c8b00a38-06c7-4696-ae26-3879637c44dd",
  };

  $scope.processConfig = {
    "language": "en",
    "flowObject": {
      "name": "socure_default"
    }
  };

  $scope.firstAttribute = 1;
  $scope.sdkKey = "enter_your_sdk_key";
});