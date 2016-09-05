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
        var isStage1 = elapsed % (2*ms) < ms;

        var stage = isStage1 ? $scope.stages[0] : $scope.stages[1];

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
        var side = $scope.thumbnailSide;
        ctx.drawImage(stage.imageElem, 0, 0, side, side);
    };

	//helper func for grayscaling the images
	$scope.grayscale = function(){
	  var cnv = getElementbyId("hiddenCanvas");
	  var ctx = cnv.getContext('2d');
	  var img1Width = image1.width;
	  var img1Height = image1.height;
	  var img2Width = image2.width;
	  var img2Height = image2.height;

	  ctx.drawImage(image1, 0, 0);
	  var imgPixels = ctx.getImageData(0,0,img1Width,img1Height);
	  for(var y = 0; y < imgPixels.height; y++){
	     for(var x = 0; x < imgPixels.width; x++){
	          var i = (y * 4) * imgPixels.width + x * 4;
	          var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
	          imgPixels.data[i] = avg;
	          imgPixels.data[i + 1] = avg;
	          imgPixels.data[i + 2] = avg;
	     }
	  }
	  var background = p.color(0,0,0,0);

	  //for (var i = 0; i < 


	  ctx.clearRect(128,128,0,0); // clear canvas

	  ctx.drawImage(image2, 0, 0);
	  var imgPixels = ctx.getImageData(0,0,img2Width,img2Height);
	  for(var y = 0; y < imgPixels.height; y++){
	     for(var x = 0; x < imgPixels.width; x++){
	          var i = (y * 4) * imgPixels.width + x * 4;
	          var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
	          imgPixels.data[i] = avg;
	          imgPixels.data[i + 1] = avg;
	          imgPixels.data[i + 2] = avg;
	     }
	  }

	};

    $scope.animate = function(ctx) {
        if(animateOn){
            ctx.clearRect(0,0,canvasWidth,canvasHeight); // clear canvas
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
