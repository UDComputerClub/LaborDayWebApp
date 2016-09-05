var clientScript = angular.module('clientScript', ['ngFileUpload']);

clientScript.controller('clientController', function($scope, Upload) {
    // Staged Images - eventually stores the image data
    $scope.thumbnailSide = 64;
    $scope.stages = [
        {image:null, imageElem: new Image()},
        {image:null, imageElem: new Image()}
    ];

    // TODO Each style should have its own rendering function
    $scope.evolveStyles = [
        {name: 'Gold/Silver/Crystal'},
        {name: 'Ruby/Sapphire/Emerald'}
    ];

    $scope.evolutionStyle = $scope.evolveStyles[0];

    var animateOn = false;
    var startTime;
    var canvasWidth = 300;
    var canvasHeight = 300;

    // Gets the number of milliseconds for which to display each image when
    // oscillating between images in certain evolution styles.
    var getMs = function(time){
        return 1000/(1000 * (time + 1));
    };

    // code from danial
    // http://stackoverflow.com/questions/13963022/angularjs-how-to-implement-a-simple-file-upload-with-multipart-form

    // handles a new file selection of an image for stage 1 or stage 2
    $scope.onFileSelect = function(file) {
        console.log("here");
        $scope.stage1Image = getAsDataURL(file);
    };
    
    $scope.selectStage = function(stage) {
        console.log("selectStage");
        Upload.base64DataUrl(stage.image)
            .then(function (url) {
                stage.imageElem.src = url;
            });
        //$scope.stageImage[stage] = getAsDataURL(file);
        //$scope.stageShown[stage] = true;
        //var fd = new FormData();
        //Take the first selected file
        //fd.append("stage"+stage.toString(), files[0]);*/
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

    $scope.initAnimation = function(){
        startTime = new Date();
        animateOn = true;
    };

    $scope.drawThumbnail = function(stage, ctx) {
        var side = $scope.thumbnailSide;
        ctx.drawImage(stage.imageElem, 0, 0, side, side);
    }

    $scope.animate = function(ctx) {
        if(animateOn){
            ctx.globalCompositeOperation = 'destination-over';
            ctx.clearRect(0,0,canvasWidth,canvasHeight); // clear canvas

            ctx.fillStyle = 'black';
            ctx.strokeStyle = 'black';
            ctx.save();
            //ctx.translate(150,150);

            var elapsed = new Date() - startTime;
            var isStage1 = (elapsed%(2*getMs(elapsed)))<getMs(elapsed);
            var stage = isStage1 ? stages[0] : stages[1];

            ctx.drawImage(stage.imageElem,0,0,canvasWidth,canvasHeight);
        }
    };

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
