var clientScript = angular.module('clientScript', ['ngFileUpload']);

clientScript.controller('clientController', function($scope, Upload) {
    // Staged Images - eventually stores the image data
    $scope.thumbnailSide = 64;
    $scope.stages = [
        {image:null, imageElem: new Image(), showLabel: true,
				name: "POKEMON 1"},
        {image:null, imageElem: new Image(), showLabel: true,
				name: "POKEMON 2"}
    ];

    function renderGen1(ctx) {
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'black';
        ctx.save();

        var elapsed = new Date() - startTime;
        var isStage1;

        if(elapsed > 12852) {
            startTime = new Date();
            document.getElementById("audio").currentTime = 0;
            document.getElementById("audio").play()
        };

        var part1 = 1800;
        var part2 = part1+50;
        var part3 = part2+800;
        var part4 = part3+80;
        var part5 = part4+500;
        var part6 = 7300;
		if(elapsed < part1) {
			isStage1 = 0;
		} else if(elapsed < part2) {
			isStage1 = 1;
		} else if(elapsed < part3) {
			isStage1 = 0;
		} else if(elapsed < part4) {
			isStage1 = 1;
		} else if(elapsed < part5) {
			isStage1 = 0;
		} else if(elapsed < part6) {
			isStage1 = elapsed%2;
		} else {
			isStage1 = 1;
		}

        var stage = isStage1 ? $scope.stages[1] : $scope.stages[0];
        
        if(elapsed < 10000){
            ctx.font = "16px Font";
            ctx.fillText("What? " + $scope.stages[0].name, 10, canvasHeight-44); //20 padding plus 24 line height
            ctx.fillText("is evolving!", 10, canvasHeight-10); //10 padding left and below
        }
        else{
            ctx.font = "16px Font";
            ctx.fillText($scope.stages[0].name + " evolved", 10, canvasHeight-44); //20 padding plus 24 line height
            ctx.fillText("into " + $scope.stages[1].name + "!", 10, canvasHeight-10); //10 padding left and below
        }
        //this block draws the frame and the text inside
        var imgFrame = new Image();
        imgFrame.onload = function(){
            ctx.drawImage(imgFrame, 0, canvasHeight-80, canvasWidth,80); //look, the magic numbers work. Magic works. I'm a wizard, Harry. 
        };
        imgFrame.src = 'images/origclassicpokemonframe.PNG';


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
            })
            .then(function() {
                stage.fabricImage = new fabric.Image(stage.imageElem)
            })
            .then(function() {
                stage.drawing = true;
            });
		stage.showLabel = false;
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
		if(($scope.stages[0].image != null) &&
				($scope.stages[1].image != null)) {
        	startTime = new Date() - 15000;
        	animateOn = true;
		} else {
			var ctx = document.getElementById("theCanvas").getContext("2d");
			ctx.clearRect(0,0,canvasWidth,canvasHeight); // clear canvas
			ctx.font = "16px Font";
            ctx.fillText("PLEASE UPLOAD BOTH STAGES.", 10,
					canvasHeight/2-16);
		}
    };

    $scope.drawThumbnail = function(stage, ctx) {
        // sorry if this is bad angular, Brian
        if (stage.drawing) {
            stage.drawing = false;

            var fabThumbnail = new fabric.Canvas("thumb"+stage.number, {
                isDrawingMode: true
            });

            var imgInstance = new fabric.Image(stage.imageElem, {
                left: 0,
                top: 0,
            });
            imgInstance.width = spriteDim;
            imgInstance.height = spriteDim;

            fabThumbnail.add(imgInstance);

            fabThumbnail.freeDrawingBrush.color = "black";
            fabThumbnail.freeDrawingBrush.width = 2;

            fabThumbnail.on('path:created', function(options) {
                var path = options.path;
                fabThumbnail.isDrawingMode = false;
                fabThumbnail.remove(imgInstance);
                fabThumbnail.remove(path);
                fabThumbnail.clipTo = function(ctx) {
                    path.render(ctx);
                };
                fabThumbnail.add(imgInstance);
                stage.imageElem.src = fabThumbnail.toDataURL();
            });
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
