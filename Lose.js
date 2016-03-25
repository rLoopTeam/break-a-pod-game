
BasicGame.Lose = function (game) {

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

BasicGame.Lose.prototype = {

	init: function () {
        var envs = this.game['GameData'].environments,
			totalEnvs = envs.length;
        var levelSelect = this.game['GameData'].endingEnvironment;
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

		this.add.sprite(0, 0, 'highscore_screen');

	    this.rudEvent_button = this.add.bitmapText(this.camera.width / 2, 100, 'basic_font_white', 'The Hyperloop is tough. Join us to help make it a reality.', 30)
	    this.rudEvent_button.hitArea = new PIXI.Rectangle(-this.rudEvent_button.width/2, -this.rudEvent_button.height/2, this.rudEvent_button.width, this.rudEvent_button.height);
	    this.rudEvent_button.anchor.set(0.5, 0.5);
	    this.rudEvent_button.inputEnabled = true;
	    this.rudEvent_button.events.onInputDown.add(this.supportUs, this);
	    this.rudEvent_button.events.onInputOver.add(buttonHighlightOn, this);
	    this.rudEvent_button.events.onInputOut.add(buttonHighlightOut, this);

	    // score  
	    this.score = this.add.bitmapText(this.camera.width / 2, 140, 'basic_font_white', 'You scored ' + this.score.substring(0, 13) + ((this.score.length > 13)?"...":""), 60)
	    this.score.anchor.set(0.5,0.5)
	    
	    // create score board table from external data
	    this.createScoreBoard();
		
        this.playAgain_button = this.add.bitmapText(this.camera.width / 2, 500, 'basic_font_white', 'Try Again', 40)
        this.playAgain_button.hitArea = new PIXI.Rectangle(-this.playAgain_button.width/2, -this.playAgain_button.height/2, this.playAgain_button.width, this.playAgain_button.height);
        this.playAgain_button.anchor.set(0.5, 0.5);
        this.playAgain_button.inputEnabled = true;
        this.playAgain_button.events.onInputDown.add(this.startGame, this);
        this.playAgain_button.events.onInputOver.add(buttonHighlightOn, this);
        this.playAgain_button.events.onInputOut.add(buttonHighlightOut, this);

		this.postScore_button = this.add.bitmapText(this.camera.width / 2, 540, 'basic_font_white', 'Submit score', 30)
        this.postScore_button.hitArea = new PIXI.Rectangle(-this.postScore_button.width/2, -this.postScore_button.height/2, this.postScore_button.width, this.postScore_button.height);
        this.postScore_button.inputEnabled = true;
        this.postScore_button.anchor.set(0.5, 0.5);
        this.postScore_button.events.onInputDown.add(this.postScore, this);
        this.postScore_button.events.onInputOver.add(buttonHighlightOn, this);
        this.postScore_button.events.onInputOut.add(buttonHighlightOut, this);

        this.noHighscores = this.add.bitmapText(this.camera.width / 2, 220, "basic_font_white", "No highscores yet. Be the first!", 20);
		this.noHighscores.anchor.set(0.5, 0.5);
		this.noHighscores.tint = 0x00AA00;
		this.noHighscores.visible = false;

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

	createScoreBoard: function() {
		
		// this should be replaced by a call to a web service
	    var scores = [
			{
				"playerName":"Paul",
				"score":50050
			}, 
			{
				"playerName":"Hello world!",
				"score":45007
			},
			{
				"playerName":"Blah",
				"score":35350
			}
		]

		console.log("create score board")
		var url = "https://eu.furcode.co:8080/api/GetNearUsers", // change this to list of scores url
			self = this,
			camera = this.camera;

		var payload = {
			//"playerName": "foxlet"
		}

		// call api
		this.callAPI(url, payload, success, failure);

		function success(scores_new) {
			console.log("api results")
			console.log(scores)
			for (var c = 0; c < scores.length && c < 13; c++)
			{
				self.add.bitmapText(camera.width / 2 - 160, 200 + (c*20), 'basic_font_white', scores[c].playerName.substring(0, 13) + ((scores[c].playerName.length > 13)?"...":""), 30);
		        self.add.bitmapText(camera.width / 2 + 100 , 200 + (c*20), 'basic_font_white', String(Math.floor(scores[c].score)).substring(0, 20) + ((scores[c].score.length > 20)?"...":""), 30);
		    }
		}

		function failure() {
			self.noHighscores.visible = true;
		}
	},

	postScore: function() {
	    // get player name
		var url = "http://eu.furcode.co:8080/api/UpsertUserScore";
        var playerName = prompt("Please enter your name", "name");
		var score = this.score;

		if ( playerName && isSafeCharacters(playerName) ) {
			var payload = {
				"playerName": playerName, 
				"score": score
			}

			// call api
			//this.callAPI(url, payload, success, failure);

			function success(data) {
				console.log("Successfully submitted score")
			}

			function failure() {
				console.log("Something went wrong")
			}

	        // go back to main menu
	        this.game.state.start('MainMenu');
	    } else {
	    	alert("Only letters, numbers and underscores are allowed")
	    }

	    function isSafeCharacters(str) {
			return str.match(/^[a-z0-9_]+$/)
		}
	},

	callAPI: function (url, payload, callbacksuccess, callbackfailure) {
		var instance = new XMLHttpRequest()

		if (instance) {
		    instance.open('POST', url);
		    instance.setRequestHeader("Content-type", "application/json");
		    instance.onreadystatechange = handler;
		    instance.send(JSON.stringify(payload));
		} else {
			console.log("Could not get scores.");
			callbackfailure();
		}

		function handler(evtXHR) {
			if (instance.readyState == 4 && instance.status==200)
			{
				callbacksuccess(instance.responseText);
			} else {
				callbackfailure();
			}
		}
	},

	supportUs: function (pointer) {
	    this.sound_music.stop(); 
	    window.open("https://www.indiegogo.com/projects/help-build-rloop-s-pod-for-spacex-hyperloop-comp#/", "_blank");
	},

	startGame: function (pointer) {
		console.log("restart game")
		this.sound_music.stop(); 
		this.game.state.start('Game');
	}
};
