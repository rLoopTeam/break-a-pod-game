
BasicGame.MainMenu = function (game) {

	this.bg;
	this.title_image;

	this.music = null;
	this.playButton = null;

	this.cursors;
};

BasicGame.MainMenu.prototype = {

	create: function () {

		// add music
		//this.music = this.add.audio('titleMusic');
		//this.music.play();

	    this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'starfield');

	    this.title_image = this.add.sprite(this.game.width/2, this.game.height/2, 'title_image');
	    this.title_image.anchor.set(0.5, 0.5);
	    this.title_image.scale.setTo(0.5, 0.5);

        this.playButton = this.add.button((this.game.width/2), (this.game.height/2) + 100, 'button', this.startGame, this, 'over', 'out', 'down');

	},

	update: function () {

		//	Do some nice funky main menu effect here

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

	}

};
