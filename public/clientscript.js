var clientScript = angular.module('clientScript', ['ngFileUpload']);

clientScript.controller('clientController', function($scope, Upload) {
    // Staged Images - eventually stores the image data
    $scope.thumbnailSide = 64;
    $scope.stages = [
        {image:null, imageElem: new Image()},
        {image:null, imageElem: new Image()}
    ];

    function renderGen1(ctx) {
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.save();

        var elapsed = new Date() - startTime;
        var ms = getMs(elapsed);
        var isStage1 = elapsed % (10*ms) < ms;

        var stage = isStage1 ? $scope.stages[0] : $scope.stages[1];

        var imgFrame = new Image();
        imgFrame.onload = function(){
            ctx.drawImage(imgFrame, 0, canvasHeight-80, canvasWidth,80); //look, the magic numbers work. Magic works. I'm a wizard, Harry. 
        };
        imgFrame.src = 'images/origclassicpokemonframe.PNG';

        ctx.font = "24px Early GameBoy";
        ctx.fillText("What? _____", 15, canvasHeight-44); //20 padding plus 24 line height
        ctx.fillText("is evolving!", 15, canvasHeight-12); //15 padding left, 12 padding below  
        

        ctx.drawImage(stage.imageElem, (canvasWidth-spriteDim)/2,
            (canvasHeight-spriteDim)/2, spriteDim, spriteDim);
    }

    // TODO Each style should have its own rendering function
    $scope.evolveStyles = [
        {name: 'Red/Blue/Green/Yellow', render: renderGen1}//,
        //{name: 'Gold/Silver/Crystal', render: renderGen1},
        //{name: 'Ruby/Sapphire/Emerald', render: renderGen1}
    ];

    $scope.evolutionStyle = $scope.evolveStyles[0];

    var animateOn = false;
    var startTime;
    var canvasWidth = 320;
    var canvasHeight = 288;
    var spriteDim = 128;

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
        ctx.drawImage(stage.imageElem, 0, 0, spriteDim, spriteDim);
    };


    $scope.animate = function(ctx) {
        if(animateOn){
            //ctx.clearRect(0,0,canvasWidth,canvasHeight); // clear canvas
            $scope.evolutionStyle.render(ctx);

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
