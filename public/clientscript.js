

var clientScript = angular.module('clientScript', []);
clientScript.controller('clientController', function($scope) {

    // Staged Images - eventually stores the image data
    $scope.stages = {1 : null, 2 : null};
    $scope.stagestatus = {1 : false, 2 : false};
    
    // handles a new file selection of an image for stage 1 or stage 2
    $scope.selectStage = function(stage) {
        //if (TODO error check) {
            $scope.stagestatus[stage] = true;
        //}
    };
    
    // crops a selected file based on its preview
    $scope.cropStage = function(stage) {
        // TODO
    }
    
    // submit the stages selected
    $scope.submitStages = function() {
        // TODO
    }
    
    // code directly from Endy Tjahjono
    // http://stackoverflow.com/questions/17063000/ng-model-for-input-type-file
    $scope.directive("fileread", [function () {
        return {
            $scope: {
                fileread: "="
            },
            link: function ($scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        $scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);
    
    /*
    // show the image uploaded 
    $scope.imageShown = false;
    $scope.showImage = function () {
        //find image, if it exists
        if ( exists) {
            $scope.imageShown = true;
        }
        $scope.imageShown = true;
    };
    */
});
