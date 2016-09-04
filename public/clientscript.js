var clientScript = angular.module('clientScript', ['ngFileUpload']);

clientScript.controller('clientController', function($scope, Upload) {
	
    // Staged Images - eventually stores the image data
    $scope.stage1 = null;
    $scope.stage2 = null;
    $scope.stage1Shown = false;
    $scope.stage2Shown = false;
	var animateOn = false;
	var startTime;
	var getMs = function(time){
		return 1000/(1000 * (time + 1));
	};
	var canvasWidth = 300;
	var canvasHeight = 300;
	var image1 = new Image();
	var image2 = new Image();
    
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
    };
    
    // submit the stages selected
    $scope.submitStages = function() {
        // TODO
    };
	
	$scope.initAnimation = function(){
		startTime = new Date();
		Upload.base64DataUrl([$scope.stage1Image, $scope.stage2Image])
			.then(function (urls) {
				image1.src = urls[0];
				image2.src = urls[1];
				animateOn = true;
			});
	};

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

	  ctx.drawImage(isStage1 ? image1 : image2,0,0,canvasWidth,canvasHeight);
	};
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
