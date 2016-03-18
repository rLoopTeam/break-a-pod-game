
BasicGame.Lose = function (game) {

	this.bg;
	this.title_image;

	this.rudEvent_button;
	this.playAgain_button = null;

	this.cursors;
	this.score;

};

BasicGame.Lose.prototype = {

	init: function () {
		this.stage.backgroundColor = "#000000";
		this.score = String( Math.floor(this.game['GameData'].score + this.game['GameData'].currentStageScore) );
	},

	create: function () {

		// add music
		//this.music = this.add.audio('titleMusic');
		//this.music.play();

	    this.rudEvent_button = this.add.bitmapText(this.camera.width / 2, 100, 'basic_font_white', 'You should leave the Hyperloop to us, click here to support!', 30)
	    this.rudEvent_button.hitArea = new PIXI.Rectangle(-this.rudEvent_button.width/2, -this.rudEvent_button.height/2, this.rudEvent_button.width, this.rudEvent_button.height);
	    this.rudEvent_button.anchor.set(0.5, 0.5);
	    this.rudEvent_button.inputEnabled = true;
	    this.rudEvent_button.events.onInputDown.add(this.supportUs, this);
	    this.rudEvent_button.events.onInputOver.add(buttonHighlightOn, this);
	    this.rudEvent_button.events.onInputOut.add(buttonHighlightOut, this);

	    // score  
	    this.score = this.add.bitmapText(this.camera.width / 2, 150, 'basic_font_white', 'You scored ' + this.score.substring(0, 13) + ((this.score.length > 13)?"...":""), 60)
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

        this.noHighscores = this.add.bitmapText(this.camera.width / 2, 220, "basic_font_white", "No highscores yet. Be the first!", 30);
		this.noHighscores.anchor.set(0.5, 0.5);
		this.noHighscores.tint = 0x00AA00;
		this.noHighscores.visible = false;

        function buttonHighlightOn(a) {
        	a.tint = 0x003399;
        }
        function buttonHighlightOut(a) {
        	a.tint = 0xFFFFFF;
        }
	},

	//var url = 'https://eu.furcode.co:8080/api/GetUserRank';
	//var url = 'http://eu.furcode.co:8080/api/UpsertUserScore';
	//var payload = JSON.stringify({"playerName":"foxlet"});

	createScoreBoard: function() {
		
		// this should be replaced by a call to a web service
	    var scores = [
			{
				"name":"Paul",
				"score":50050
			}, 
			{
				"name":"Hello world!",
				"score":45007
			},
			{
				"name":"Blah",
				"score":35350
			}
		]

		console.log("create score board")
		var url = "https://soemthing", // change this to list of scores url
			self = this,
			camera = this.camera;

		var payload = {
			"playerName": "foxlet"
		}

		// call api
		//this.callAPI(url, payload, success, failure);

		function success(scores_new) {
			console.log("api results")
			console.log(scores)
			for (var c = 0; c < scores.length && c < 13; c++)
			{
				self.add.bitmapText(camera.width / 2 - 180, 200 + (c*20), 'basic_font_white', scores[c].playerName.substring(0, 13) + ((scores[c].playerName.length > 13)?"...":""), 30);
		        self.add.bitmapText(camera.width / 2 + 100 , 200 + (c*20), 'basic_font_white', String(Math.floor(scores[c].score)).substring(0, 20) + ((scores[c].score.length > 20)?"...":""), 30);
		    }
		}

		function failure() {
			self.noHighscores.visible = true;
		}
	},

	postScore: function() {
	    // get player name
		var url = "http://eu.furcode.co:8080/api/UpsertUserScore"
        var playerName = prompt("Please enter your name", "name");
		
		var payload = {
			// "playerName": playerName, 
			// "score": this.score
		}

		// call api
		this.callAPI(url, payload, success, failure);

		function success(data) {
			console.log("Successfully submitted score")
		}

		function failure() {
			console.log("Something went wrong")
		}

        // go back to main menu
        this.game.state.start('MainMenu');
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
	    window.open("https://www.indiegogo.com/projects/help-build-rloop-s-pod-for-spacex-hyperloop-comp#/", "_blank");
	},

	startGame: function (pointer) {
		console.log("restart game")
		this.game.state.start('Game');
	}
};
