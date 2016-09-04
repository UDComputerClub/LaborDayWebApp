angular.module('clientScript', ['ngFileUpload'])
.controller('clientController', function($scope) {

    // Staged Images - eventually stores the image data
    $scope.stages = [
        {image:null, shown:false},
        {image:null, shown:false}
    ];
    
    // code from danial
    // http://stackoverflow.com/questions/13963022/angularjs-how-to-implement-a-simple-file-upload-with-multipart-form
    
    // handles a new file selection of an image for stage 1 or stage 2
    $scope.onFileSelect = function(file) {
        console.log("here");
        $scope.stage1Image = getAsDataURL(file);
    }
    $scope.selectStage = function(files,stage) {//, stage) {
        console.log("selectStage");
        $scope.stageImage[stage] = getAsDataURL(file);
        $scope.stageShown[stage] = true;
        var fd = new FormData(); 
        //Take the first selected file
        fd.append("stage"+stage.toString(), files[0]);
    };
    
    // crops a selected file based on its preview
    $scope.cropStage = function(stage) {
        console.log("test");
        // TODO
    };
    
    // submit the stages selected
    $scope.submitStages = function() {
        // TODO
    };
    
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
})
.directive('ldwRender', function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var ctx = element[0].getContext('2d');
            function render() {
                requestAnimationFrame(render);
                scope.$eval(attrs.ldwRender, {'$ctx' : ctx});
            }

            requestAnimationFrame(render);
        }
    };
});
