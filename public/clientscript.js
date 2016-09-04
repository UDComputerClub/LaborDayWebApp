

var clientScript = angular.module('clientScript', ['ngFileUpload']);

clientScript.controller('clientController', function($scope) {

    // Staged Images - eventually stores the image data
    $scope.stage1 = null;
    $scope.stage2 = null;
    $scope.stage1Shown = false;
    $scope.stage2Shown = false;
    console.log("got here");
    
    // code directly from danial
    // http://stackoverflow.com/questions/13963022/angularjs-how-to-implement-a-simple-file-upload-with-multipart-form
    $scope.onFileSelect = function(file) {
        console.log("here");
        $scope.stage1Image = getAsDataURL(file);
    }
    
    // handles a new file selection of an image for stage 1 or stage 2
    $scope.selectStage = function(files) {//, stage) {
        //if (TODO error check) {
            console.log("here1");
            stage=1;
            if (stage == 1) {
                $scope.stage1Shown = true;
            }
            if (stage == 2) {
                $scope.stage2Shown = true;
            }
            var fd = new FormData(); 
            //Take the first selected file
            fd.append("stage"+stage.toString(), files[0]);

            /*uploadUrl, fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).success( ...all right!... ).error( ..damn!... );*/
            
        //}
    };
    
    // crops a selected file based on its preview
    $scope.cropStage = function(stage) {
        console.log("test");
        // TODO
    }
    
    // submit the stages selected
    $scope.submitStages = function() {
        // TODO
    }
    
    // tried code from Fabio
    // http://stackoverflow.com/questions/13963022/angularjs-how-to-implement-a-simple-file-upload-with-multipart-form
    
    // tried code directly from pawel
    // http://stackoverflow.com/questions/19986178/displaying-an-image-after-uploading-in-angular-js
    
    // tried code directly from Endy Tjahjono
    // http://stackoverflow.com/questions/17063000/ng-model-for-input-type-file
    
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
