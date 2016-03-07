
BasicGame.Lose = function (game) {

	this.bg;
	this.title_image;

	this.rudEvent_button;
	this.playAgain_button = null;

	this.cursors;
};

BasicGame.Lose.prototype = {

	create: function () {

		// add music
		//this.music = this.add.audio('titleMusic');
		//this.music.play();

	    this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'starfield');

	    this.rudEvent_button = this.add.text(this.camera.x + this.camera.width / 2, this.camera.y + this.camera.height / 2 - 10, 'You should leave the Hyperloop to us, click here to support!', {
	        font: "24px Arial",
	        fill: "#ffffff",
            decoration: "underline",
	        align: "center"
	    });
	    this.rudEvent_button.anchor.set(0.5, 0.5);
	    this.rudEvent_button.inputEnabled = true;
	    this.rudEvent_button.events.onInputDown.add(this.supportUs, this);

	    this.playAgain_button = this.add.text(this.camera.x + this.camera.width / 2, this.camera.y + this.camera.height / 2 + 75, 'Or, Try Again', {
	        font: "24px Arial",
	        fill: "#ffffff",
	        align: "center"
	    });
        this.playAgain_button.anchor.set(0.5, 0.5);
        this.playAgain_button.inputEnabled = true;
        this.playAgain_button.events.onInputDown.add(this.startGame, this);

        

	},

	supportUs: function (pointer) {
	    window.open("https://www.indiegogo.com/projects/help-build-rloop-s-pod-for-spacex-hyperloop-comp#/", "_blank");
	},

	startGame: function (pointer) {
		this.state.start('Game');
	}

};
