var clientScript = angular.module('clientScript', ['ngFileUpload']);

clientScript.controller('clientController', function($scope, Upload) {
    // Staged Images - eventually stores the image data
    $scope.thumbnailSide = 64;
    $scope.stages = [
        {image:null, imageElem: new Image(), showLabel: true, name: "POKEMON"},
        {image:null, imageElem: new Image(), showLabel: true, name: "POKEMON"}
    ];

    function renderGen1(ctx) {
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.save();

        var elapsed = new Date() - startTime;
        var isStage1;

		elapsed = elapsed%12000;

		if(elapsed < 3000) {
			isStage1 = 0;
		} else if(elapsed < 3050) {
			isStage1 = 1;
		} else if(elapsed < 4000) {
			isStage1 = 0;
		} else if(elapsed < 4080) {
			isStage1 = 1;
		} else if(elapsed < 5000) {
			isStage1 = 0;
		} else if(elapsed < 8000) {
			isStage1 = elapsed%2;
		} else {
			isStage1 = 1;
		}

        var stage = isStage1 ? $scope.stages[1] : $scope.stages[0];
        
        if(elapsed < 10000){
            if($scope.stages[0].name.length < 8){
                ctx.font = "24px Early GameBoy";
                ctx.fillText("What? " + $scope.stages[0].name, 10, canvasHeight-44); //20 padding plus 24 line height
                ctx.fillText("is evolving!", 10, canvasHeight-10); //10 padding left and below
            }
            else{
                ctx.font = "10px Early GameBoy";
                ctx.fillText("What? " + $scope.stages[0].name, 10, canvasHeight-44); //20 padding plus 24 line height
                ctx.fillText("is evolving!", 10, canvasHeight-10); //10 padding left and below
            }
        }
        else{
            if($scope.stages[0].name.length < 6){
                ctx.font = "24px Early GameBoy";
                ctx.fillText($scope.stages[0].name + " evolved", 10, canvasHeight-44); //20 padding plus 24 line height
            }
            else{
                ctx.font = "10px Early GameBoy";
                ctx.fillText($scope.stages[0].name + " evolved", 10, canvasHeight-44); //20 padding plus 24 line height
            }
            if($scope.stages[1].name.length < 9){
                ctx.font = "24px Early GameBoy";
                ctx.fillText("into " + $scope.stages[1].name + "!", 10, canvasHeight-10); //10 padding left and below
            }
            else{
                ctx.font = "10px Early GameBoy";
                ctx.fillText("into " + $scope.stages[1].name + "!", 10, canvasHeight-10); //10 padding left and below
            }
        }

        ctx.font = "24px Pokemon R/S";
        ctx.fillText("What? Your _____ is evolving!",30,30);

        ctx.drawImage(stage.imageElem, (canvasWidth-spriteDim)/2,
            (canvasHeight-spriteDim)/2, spriteDim, spriteDim);
    }

    // TODO Each style should have its own rendering function
    $scope.evolveStyles = [
        {name: 'Gold/Silver/Crystal', render: renderGen1},
        {name: 'Ruby/Sapphire/Emerald', render: renderGen1}
    ];

    $scope.evolutionStyle = $scope.evolveStyles[0];

    var animateOn = false;
    var startTime;
    var canvasWidth = 320;
    var canvasHeight = 288;
    var spriteDim = 128; //sprites are square

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
		stage.showLabel = false;
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
        ctx.drawImage(stage.imageElem, 0, 0, spriteDim, spriteDim); //this line has issues
    };

    $scope.animate = function(ctx) {
        if(animateOn){
            ctx.clearRect(0,0,canvasWidth,canvasHeight); // clear canvas
            $scope.evolutionStyle.render(ctx);

        }

    // BEGIN GRAYSCALE MINI FUNCTION 
        //var cnv = $scope.getElementById("hiddenCanvas");
        //var temctx = cnv.getContext('2d');
        var img1Width = 128;
        var img1Height = 128;
        var img2Width = 128;
        var img2Height = 128;

        //ctx.drawImage($scope.stages[0].imageElem, 0, 0);
        var img1Pixels = ctx.getImageData(0,0,img1Width,img1Height);
        for(var y = 0; y < img1Pixels.height; y++){
         for(var x = 0; x < img1Pixels.width; x++){
              var i = (y * 4) * img1Pixels.width + x * 4;
              var avg = (img1Pixels.data[i] + img1Pixels.data[i + 1] + img1Pixels.data[i + 2]) / 3;
              img1Pixels.data[i] = avg;
              img1Pixels.data[i + 1] = avg;
              img1Pixels.data[i + 2] = avg;
         }
        }

        ctx.clearRect(128,128,0,0); // clear canvas

        ctx.drawImage($scope.stages[1].imageElem, 0, 0); //this line also has issues
        var img2Pixels = ctx.getImageData(0,0,img2Width,img2Height); 
        for(var y = 0; y < img2Pixels.height; y++){
         for(var x = 0; x < img2Pixels.width; x++){
              var i = (y * 4) * img2Pixels.width + x * 4;
              var avg = (img2Pixels.data[i] + img2Pixels.data[i + 1] + img2Pixels.data[i + 2]) / 3;
              img2Pixels.data[i] = avg;
              img2Pixels.data[i + 1] = avg;
              img2Pixels.data[i + 2] = avg;
         }
        }
        //END GRAYSCALE MINI FUNCTION
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
