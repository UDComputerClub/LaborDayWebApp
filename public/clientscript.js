var clientScript = angular.module('clientScript', ['ngFileUpload']);

clientScript.controller('clientController', function($scope, Upload) {

    //preload the text frame image
    //TODO upload other generation frames also
    var imgFrameLoaded = false;
    var imgFrame = new Image();
    imgFrame.onload = function(){
        imgFrameLoaded = true; 
    };
    imgFrame.src = 'images/origclassicpokemonframe.PNG';
    
    // Staged Images - eventually stores the image data
    $scope.thumbnailSide = 64;
    $scope.stages = [
        {image:null, imageElem: new Image(), fabricImage: null, name: "POKEMON ONE",
            drawing: false, number: 1, showLabel: true},
        {image:null, imageElem: new Image(), fabricImage: null, name: "POKEMON TWO",
            drawing: false, number: 2, showLabel: true}
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

        if(imgFrameLoaded){
            ctx.drawImage(imgFrame, 0, canvasHeight-frameHeight, canvasWidth,frameHeight); //look, the magic numbers work. Magic works. I'm a wizard, Harry.
        } else {
            console.log("failed to load text frame")
        }
        var part1 = 1800;
        var part2 = part1+50;
        var part3 = part2+800;
        var part4 = part3+80;
        var part5 = part4+500;
        var part6 = 7300;
        var padBottom = 15;
        var padLeft = 15;
        var charLimit = 10;

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
            if($scope.stages[0].name.length < charLimit){
                ctx.font = "16px Font";
                ctx.fillText("What? " + $scope.stages[0].name, padLeft, canvasHeight-44); //20 padding plus 24 line height
                ctx.fillText("is evolving!", padLeft, canvasHeight-padBottom); 
            }
            else{
                ctx.font = "10px Font";
                ctx.fillText("What? " + $scope.stages[0].name, padLeft, canvasHeight-44); //20 padding plus 24 line height
                ctx.fillText("is evolving!", padLeft, canvasHeight-padBottom); 
            }
        }
        else{
            if($scope.stages[0].name.length < 10 || $scope.stages[1].name.length < charLimit){
                ctx.font = "16px Font";
                ctx.fillText($scope.stages[0].name + " evolved", padLeft, canvasHeight-44); //20 padding plus 24 line height
                ctx.fillText("into " + $scope.stages[1].name + "!", padLeft, canvasHeight-padBottom); 
            }
            else{
                ctx.font = "10px Font";
                ctx.fillText($scope.stages[0].name + " evolved", padLeft, canvasHeight-44); //20 padding plus 24 line height
                ctx.fillText("into " + $scope.stages[1].name + "!", padLeft, canvasHeight-padBottom); 
            }
        }

        ctx.drawImage(stage.imageElem, (canvasWidth-spriteDim)/2,
            (canvasHeight-spriteDim-frameHeight)/2, spriteDim, spriteDim);
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
    var frameHeight = 80;

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
        startTime = new Date() - 15000;
        animateOn = true;
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
