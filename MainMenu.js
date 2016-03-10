
BasicGame.MainMenu = function (game) {

	this.bg;
	this.title_image;

	this.cameraSpeed = 20;
	this.pos = 0;

	// environment
    this.environment;
    this.background;
    this.midground;
    this.foreground;

	this.music = null;
	this.playButton = null;

	this.cursors;
};

BasicGame.MainMenu.prototype = {
	init: function(){
		var envs = this.game['GameData'].environments,
            totalEnvs = envs.length;
        var levelSelect = Math.floor(Math.random() * totalEnvs);

        this.environment = envs[levelSelect];
        this.levelLength = this.game['GameData'].baseLevelLength * (Math.random() + 1);

	},
	create: function () {

        //Audio
        this.sound_music = this.add.sound('titleMusic');
        this.sound_music.play();   

        // set world settings and player start position
        this.startPos = { "x": 150, "y": (this.world.height / 2) + 47 };
        this.stage.backgroundColor = "#0c9fc7";
        this.world.setBounds(0, 0, this.levelLength + this.flatStartLength + this.flatEndLength, 500);


		this.addBackground();
        this.addMidground();
        var graphics = this.add.graphics(0, 0);
        //this.drawTube(graphics, this.tunnelPhysicsData);
        this.addForeground();

	    this.title_image = this.add.sprite(this.game.width/2, this.game.height/2, 'title_image');
	    this.title_image.anchor.set(0.5, 0.5);
	    //this.title_image.scale.setTo(1, 1);

        this.playButton = this.add.button(this.game.width/2, (this.game.height/2) + 200, 'start_button', this.startGame, this, 'over', 'out', 'down');
        this.playButton.anchor.set(0.5, 0.5);


	},

	update: function () {

		// camera follow pod
        //this.camera.x += this.cameraSpeed;

        // update background
        //this.background.x = this.camera.x;

        // update midground
        //var camera = this.camera;
        this.pos += this.cameraSpeed;
       	var pos = this.pos;
        this.midground.forEach(function (item) {
            if (item.type === 5) { // tileable sprite
                item.tilePosition.x = -(pos * item.parallax) + item.offset.x;
                item.tilePosition.y = item.offset.y;
            }
        })

	},

	resize: function (width, height) {

		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

	    this.bg.width = width;
	    this.bg.height = height;

	    //this.title_image.anchor.set(0.5, 0.5);
	    this.title_image.x = this.game.width/2;
	    this.title_image.y = this.game.height/2;
	    this.title_image.scale.setTo(0.5, 0.5);

	    this.playButton.x = this.game.width/2;
	    this.playButton.y = (this.game.height/2)+100;
	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	},

	addBackground: function () {
        var environmentBackground = this.environment['background'];
        var backgroundGroup = this.background = this.add.group();
        for (var key in environmentBackground) {
            if (environmentBackground.hasOwnProperty(key)) {
                //alert(key + " -> " + background[key]);
                var unique = backgroundGroup.create(environmentBackground[key].position.x, environmentBackground[key].position.y, environmentBackground[key].texture);
                unique.fixedToCamera = environmentBackground[key].fixedToCamera;
            }
        }
    },

    addMidground: function () {
        
        var environmentMidground = this.environment['midground'];
        var midgroundGroup = this.midground = this.add.group();
        for (var key in environmentMidground) {
            console.log(key)
            if (environmentMidground.hasOwnProperty(key)) {

                if (environmentMidground[key].type === "unique") {

                    midgroundGroup.create(environmentMidground[key].position.x, environmentMidground[key].position.y, environmentMidground[key].texture);

                } else if (environmentMidground[key].type === "repeat") {

                    var tileable = this.add.tileSprite(0, 0, this.camera.width, this.camera.height, environmentMidground[key].texture);
                    tileable.tilePosition = { "x": environmentMidground[key].position.x, "y": environmentMidground[key].position.y };
                    tileable.fixedToCamera = true;
                    tileable.scale = { "x": environmentMidground[key].scale.x, "y": environmentMidground[key].scale.y };

                    // need to pass some data to the update function so store it on the object
                    tileable['parallax'] = environmentMidground[key].parallax;
                    tileable['offset'] = environmentMidground[key].position;
                    midgroundGroup.add(tileable);

                } else if (environmentMidground[key].type === "fog") {

                    var poly = new Phaser.Polygon(0,0,  this.camera.width,0,  this.camera.width,this.camera.height,   -this.camera.width,this.camera.height);
                    var graphics = this.add.graphics(0, 0);
                    graphics.fixedToCamera = true;
                    graphics.beginFill(environmentMidground[key].color, environmentMidground[key].opacity);
                    //graphics.fillAlpha = environmentMidground[key].opacity;
                    graphics.drawPolygon(poly.points);
                    graphics.endFill();
                    //this.graphics = graphics;
                }

            }

        }
    },
    addForeground: function () {
        this.foreground = this.add.group();

    },
    // generateTubePoints: function (numberOfHills, start_y, hill_max_height, tube_length, tube_height, pixelStep) {
    //     var hillStartY = start_y,
    //         hillWidth = tube_length / numberOfHills,
    //         hillSlices = hillWidth / pixelStep,
    //         tunnelPhysicsData = { "top": [], "bottom": [], "pylons": [] },
    //         prevx,
    //         prevy;

    //     // Generate flat at beginning
    //     var rect = {
    //         "density": 2, "friction": 0, "bounce": 0,
    //         "filter": { "categoryBits": 1, "maskBits": 65535 },
    //         "shape": [this.flatStartLength, hillStartY + 100, 0, hillStartY + 100, 0, hillStartY, this.flatStartLength, hillStartY]
    //     };
    //     tunnelPhysicsData['bottom'].push(rect);

    //     var topRect = {
    //         "density": 2, "friction": 0, "bounce": 0,
    //         "filter": { "categoryBits": 1, "maskBits": 65535 },
    //         "shape": [this.flatStartLength, hillStartY - tube_height - 100, this.flatStartLength, hillStartY - tube_height, 0, hillStartY - tube_height, 0, hillStartY - tube_height - 100]
    //     };
    //     tunnelPhysicsData['top'].push(topRect);

    //     prevx = this.flatStartLength;
    //     prevy = start_y;

    //     for (var i = 0; i < numberOfHills; i++) {
    //         var randomHeight = Math.random() * 78.5;
    //         // this is necessary to make all hills (execept the first one) begin where the previous hill ended
    //         if (i == 0) {
    //             hillStartY = prevy - randomHeight;
    //         } else {
    //             hillStartY -= randomHeight;
    //         }

    //         // looping through hill slices
    //         for (var j = 0; j <= hillSlices; j++) {
    //             var x = j * pixelStep + hillWidth * i + this.flatStartLength,
    //                 y = hillStartY + randomHeight * Math.cos(2 * Math.PI / hillSlices * j),
    //                 height = y - prevy,
    //                 length = Math.sqrt((pixelStep * pixelStep) + (height * height)),
    //                 hillPoint = { "x": x, "y": y },
    //                 angle = Math.atan2(y - prevy, x - prevx)

    //             var rect = {
    //                 "density": 2, "friction": 0, "bounce": 0,
    //                 "filter": { "categoryBits": 1, "maskBits": 65535 },
    //                 "shape": [prevx, hillPoint.y + 100, prevx, prevy, hillPoint.x, hillPoint.y, hillPoint.x, hillPoint.y + 100]
    //             };
    //             tunnelPhysicsData['bottom'].push(rect);

    //             var topRect = {
    //                 "density": 2, "friction": 0, "bounce": 0,
    //                 "filter": { "categoryBits": 1, "maskBits": 65535 },
    //                 "shape": [prevx, hillPoint.y - tube_height - 100, hillPoint.x, hillPoint.y - tube_height - 100, hillPoint.x, hillPoint.y - tube_height, prevx, prevy - tube_height]
    //                 //"shape": [prevx, hillPoint.y - tube_height, prevx, hillPoint.y - tube_height - 10, hillPoint.x, hillPoint.y - tube_height-10, hillPoint.x, hillPoint.y - tube_height]
    //             };
    //             tunnelPhysicsData['top'].push(topRect);

    //             prevx = x;
    //             prevy = y;
    //         }
    //         tunnelPhysicsData['pylons'].push({ position: { "x": prevx, "y": prevy } });

    //         // this is also necessary to make all hills (execept the first one) begin where the previous hill ended
    //         hillStartY = hillStartY + randomHeight;
    //     }

    //     prevx += pixelStep;

    //     // Generate flat at end
    //     var rect = {
    //         "density": 2, "friction": 0, "bounce": 0,
    //         "filter": { "categoryBits": 1, "maskBits": 65535 },
    //         "shape": [prevx, prevy + 100, prevx, prevy, prevx + this.flatEndLength, prevy, prevx + this.flatEndLength, prevy + 100]
    //     };
    //     tunnelPhysicsData['bottom'].push(rect);

    //     var topRect = {
    //         "density": 2, "friction": 0, "bounce": 0,
    //         "filter": { "categoryBits": 1, "maskBits": 65535 },
    //         "shape": [prevx, prevy - tube_height - 100, prevx + this.flatEndLength, prevy - tube_height - 100, prevx + this.flatEndLength, prevy - tube_height, prevx, prevy - tube_height]
    //     };
    //     tunnelPhysicsData['top'].push(topRect);

    //     return tunnelPhysicsData;
    // },
    // drawTube: function (graphics, points) {

    //     var totalPoints = points['bottom'].length;
    //     var prevx = points['bottom'][0]['shape'][2];
    //     var prevy = points['bottom'][0]['shape'][3];

    //     var totalPylons = points['pylons'].length;

    //     //==================//
    //     // draw tube
    //     //==================//
    //     graphics.beginFill(0xAAAAAA, 0.75);
    //     btm_prevx = points['bottom'][0]['shape'][4];
    //     btm_prevy = points['bottom'][0]['shape'][5];
    //     top_prevx = points['top'][0]['shape'][4];
    //     top_prevy = points['top'][0]['shape'][5];
    //     for (var i = 1; i < totalPoints; i++) {
    //         var btm_x = points['bottom'][i]['shape'][4],
    //             btm_y = points['bottom'][i]['shape'][5],
    //             top_x = points['top'][i]['shape'][4],
    //             top_y = points['top'][i]['shape'][5];

    //         // Solid gray background
    //         graphics.lineStyle(6, 0xAAAAAA, 0);
    //         graphics.drawPolygon([btm_prevx, btm_prevy, top_prevx, top_prevy, top_x, top_y, btm_x, btm_y]);

    //         // Black outline
    //         graphics.lineStyle(6, 0x000000, 1);
    //         graphics.moveTo(btm_prevx, btm_prevy);
    //         graphics.lineTo(btm_x, btm_y);
    //         graphics.moveTo(top_prevx, top_prevy);
    //         graphics.lineTo(top_x, top_y);
    //         btm_prevx = btm_x;
    //         btm_prevy = btm_y;
    //         top_prevx = top_x;
    //         top_prevy = top_y;
    //     }


    //     //==================//
    //     // draw pylons
    //     //==================//
    //     for (var i = 0; i < totalPylons; i++) {
    //         var x = points['pylons'][i]['position'].x,
    //             y = points['pylons'][i]['position'].y;
    //         var pylon = this.add.sprite(x, y - this.tubeHeight - 20, 'pylon');
    //         //pylon.anchor.setTo(0.5, 0.1);
    //     }

    // }

};
