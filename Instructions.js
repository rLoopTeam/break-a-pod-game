
BasicGame.Instructions = function (game) {

	this.bg;
	this.title_image;

	this.rudEvent_button = null;
	this.playAgain_button = null;

	this.cameraSpeed = 10;
	this.pos = 0;

	// environment
    this.environment;
    this.background;
    this.midground;
    this.foreground;

	this.cursors;
	this.score;

};

BasicGame.Instructions.prototype = {

	init: function () {
        var envs = this.game['GameData'].environments,
			totalEnvs = envs.length;
        var levelSelect = this.game['GameData'].startingEnvironment;
        //levelSelect=1

        this.environment = envs[levelSelect];


		this.stage.backgroundColor = "#000000";
		this.score = String( Math.floor(this.game['GameData'].score + this.game['GameData'].currentStageScore) );
		
		var enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.add(this.startGame, this);
	},

	create: function () {

		// add music
		//this.music = this.add.audio('endMusic');
		var trackIndex = Math.floor(12*Math.random() + 1); // select random index for track
        if (!this.sound_music || !this.sound_music.isPlaying) {  
            this.sound_music = this.game.add.sound('endMusic', 0.5, true);
        }
        this.sound_music.loop = true;
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
        
	    // instructions
	    var instructions = this.add.sprite(this.camera.width/2, this.camera.height/2, 'instructions1')	    
	    instructions.anchor.set(0.5, 0.5);

	    var pod1 = this.add.sprite(this.camera.width/2, this.camera.height/2 - 100, 'pod');
	    pod1.scale.set(0.25, 0.25);
	    pod1.x = this.camera.width/2;
	    var pod1tween = this.add.tween(pod1).to( { x: pod1.x + 100 }, 500, Phaser.Easing.Exponential.In, true, 0, 0);
	    pod1tween.onComplete.add(pod1Complete, this);

	    var pod2 = this.add.sprite(this.camera.width/2 - 50, this.camera.height/2 - 50, 'pod');
	    pod2.scale.set(0.25, 0.25);
	    pod2.x = this.camera.width/2;
	    var pod2tween = this.add.tween(pod2).to( { x: pod2.x + 50 }, 500, Phaser.Easing.Exponential.Out, true, 0, 0);
	    pod2tween.onComplete.add(pod2Complete, this);

	    var pod3 = this.add.sprite(this.camera.width/2, this.camera.height/2, 'pod');
	    pod3.scale.set(0.25, 0.25);
	    pod3.angle = 0;
	    var pod3tween = this.add.tween(pod3).to( { angle: 45 }, 500, Phaser.Easing.Exponential.Out, true, 0, 0);
	    pod3tween.onComplete.add(pod3Complete, this);

	    // create score board table from external data		
        this.playAgain_button = this.add.bitmapText(this.camera.width / 2, 500, 'basic_font_white', 'Play now!', 40)
        this.playAgain_button.hitArea = new PIXI.Rectangle(-this.playAgain_button.width/2, -this.playAgain_button.height/2, this.playAgain_button.width, this.playAgain_button.height);
        this.playAgain_button.anchor.set(0.5, 0.5);
        this.playAgain_button.inputEnabled = true;
        this.playAgain_button.events.onInputDown.add(this.startGame, this);
        this.playAgain_button.events.onInputOver.add(buttonHighlightOn, this);
        this.playAgain_button.events.onInputOut.add(buttonHighlightOut, this);

		function pod1Complete() {
			pod1.position.x = this.camera.width/2;
		    pod1tween = this.add.tween(pod1).to( { x: pod1.x + 100 }, 0, Phaser.Easing.Exponential.In, true, 0, 0);
		    pod1tween.onComplete.add(pod1Complete, this);
		}

		function pod2Complete() {
			pod2.position.x = this.camera.width/2 - 50;
		    pod2tween = this.add.tween(pod2).to( { x: pod2.x + 50 }, 0, Phaser.Easing.Exponential.Out, true, 0, 0);
		    pod2tween.onComplete.add(pod2Complete, this);
		}

		var i = 0;
		function pod3Complete() {
			console.log("end loop")
			
		    if (i%2 == 0) {
			    pod3tween = this.add.tween(pod3).to( { angle: 45 }, 0, Phaser.Easing.Exponential.Out, true, 0, 0);
		    } else {
			   	pod3tween = this.add.tween(pod3).to( { angle: -45 }, 0, Phaser.Easing.Exponential.Out, true, 0, 0);
		    }
		    pod3tween.onComplete.add(pod3Complete, this);
		}




        //buttons
        function buttonHighlightOn(a) {
        	a.tint = 0x015975;
        }
        function buttonHighlightOut(a) {
        	a.tint = 0xFFFFFF;
        }
	},

	update: function () {
		this.pos += this.cameraSpeed;
       	var pos = this.pos;
        this.midground.forEach(function (item) {
            if (item.type === 5) { // tileable sprite
                item.tilePosition.x = -(pos * item.parallax) + item.offset.x;
                item.tilePosition.y = item.offset.y;
            }
        })
	},

	addBackground: function () {
        var environmentBackground = this.environment['background'];
        var backgroundGroup = this.background = this.add.group();
        for (var key in environmentBackground) {
            if (environmentBackground.hasOwnProperty(key)) {
                if (environmentBackground[key].type === "unique") {

                    var unique = backgroundGroup.create(environmentBackground[key].position.x, environmentBackground[key].position.y, environmentBackground[key].texture);
                    unique.fixedToCamera = environmentBackground[key].fixedToCamera;

                } else if (environmentBackground[key].type === "unique_randomized") {

                    var textures = environmentBackground[key].textures;
                    var texture_index = Math.floor(textures.length*Math.random());
                    var texture_name = textures[texture_index];
                    var unique = backgroundGroup.create(environmentBackground[key].position.x, environmentBackground[key].position.y, texture_name);
                    unique.fixedToCamera = environmentBackground[key].fixedToCamera;
                
                }
            }
        }
    },

    addMidground: function () {
        
        var environmentMidground = this.environment['midground'];
        var midgroundGroup = this.midground = this.add.group();
        for (var key in environmentMidground) {
            if (environmentMidground.hasOwnProperty(key)) {

                if (environmentMidground[key].type === "unique") {

                    midgroundGroup.create(environmentMidground[key].position.x, environmentMidground[key].position.y, environmentMidground[key].texture);

                } else if (environmentMidground[key].type === "repeat") {

                    var tileable = this.add.tileSprite(environmentMidground[key].position.x, environmentMidground[key].position.y, this.camera.width, this.cache.getImage(environmentMidground[key].texture).height, environmentMidground[key].texture);
                    tileable.fixedToCamera = true;
                    tileable.tileScale = { "x": environmentMidground[key].tileScale.x, "y": environmentMidground[key].tileScale.y };
                    tileable.tilePosition = { "x": environmentMidground[key].tilePosition.x, "y": environmentMidground[key].tilePosition.y };

                    // need to pass some data to the update function so store it on the object
                    tileable['parallax'] = environmentMidground[key].parallax;
                    tileable['offset'] = environmentMidground[key].tilePosition;
                    midgroundGroup.add(tileable);

                }
            }
        }
    },

    addForeground: function () {
        this.foreground = this.add.group();

    },


	startGame: function (pointer) {
		console.log("restart game")
		this.sound_music.stop(); 
		this.game.state.start('Game');
	}
};
