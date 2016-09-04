

var clientScript = angular.module('clientScript', []);
clientScript.controller('clientController', function($scope) {

    // Staged Images - eventually stores the image data
    $scope.stages = {1 : null, 2 : null};
    
    // handles a new file selection of an image for stage 1 or stage 2
    $scope.selectStage = function(stage) {
        // TODO
        // must display the 
    };
    
    // crops a selected file based on its preview
    $scope.cropStage = function(stage) {
        // TODO
    }
    
    // submit the stages selected
    $scope.submitStages = function() {
        // TODO
    }
    
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
