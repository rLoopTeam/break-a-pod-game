
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
	    this.rudEvent_button.anchor.set(0.5, 0.5);
	    this.rudEvent_button.inputEnabled = true;
	    this.rudEvent_button.events.onInputDown.add(this.supportUs, this);

	    // score  
	    this.score = this.add.bitmapText(this.camera.width / 2, 150, 'basic_font_white', 'You scored ' + this.score.substring(0, 13) + ((this.score.length > 13)?"...":""), 60)
	    this.score.anchor.set(0.5,0.5)
	    
	    // create score board table from external data
	    this.createScoreBoard();
		
		this.postScore_button = this.add.bitmapText(this.camera.width / 2 - 90, 500, 'basic_font_white', 'Share your score', 30)
        this.postScore_button.anchor.set(0.5, 0.5);
        this.postScore_button.inputEnabled = true;
        this.postScore_button.events.onInputDown.add(this.postScore, this);

        this.playAgain_button = this.add.bitmapText(this.camera.width / 2 + 80, 500, 'basic_font_white', 'or, Try Again', 30)
        this.playAgain_button.anchor.set(0.5, 0.5);
        this.playAgain_button.inputEnabled = true;
        this.playAgain_button.events.onInputDown.add(this.startGame, this);
	},

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
			},
			{
				"name":"Hey",
				"score":34021
			},
			{
				"name":"Stuff",
				"score":34000
			},
			{
				"name":"Paul",
				"score":33500
			}, 
			{
				"name":"Hello world!",
				"score":33020
			},
			{
				"name":"Blah",
				"score":28020
			},
			{
				"name":"Hey",
				"score":28000
			},
			{
				"name":"Stuff",
				"score":5000
			},
			{
				"name":"Paul",
				"score":3200
			}, 
			{
				"name":"Hello world!",
				"score":1233
			},
			{
				"name":"Blah",
				"score":233
			},
			{
				"name":"Hey",
				"score":112
			},
			{
				"name":"Stuff",
				"score":6
			}
		]

	    for (var c = 0; c < 13; c++)
	    {
	        var name = this.add.bitmapText(this.camera.width / 2 - 180, 200 + (c*20), 'basic_font_white', scores[c].name.substring(0, 13) + ((scores[c].name.length > 13)?"...":""), 30);
	        var score = this.add.bitmapText(this.camera.width / 2 + 100 , 200 + (c*20), 'basic_font_white', String(Math.floor(scores[c].score)).substring(0, 20) + ((scores[c].score.length > 20)?"...":""), 30);
	    }
	},
	supportUs: function (pointer) {
	    window.open("https://www.indiegogo.com/projects/help-build-rloop-s-pod-for-spacex-hyperloop-comp#/", "_blank");
	},

	startGame: function (pointer) {
		this.state.start('Game');
	},
	postScore: function() {
	    // get player name
        var playerName = prompt("Please enter your name", "name");

        // when player clicked ok, post the data and go back to main menu
        var data = { "name": playerName, "score": this.score };
        // ... Post "data" somewhere ...

        // go back to main menu
        this.state.start('MainMenu');
	}
};
