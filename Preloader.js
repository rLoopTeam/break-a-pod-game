
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {


		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		var graphic = this.loadingGraphic = this.add.sprite(this.camera.width/2, this.camera.height/2, 'loading');
		graphic.anchor.set(0.5, 0.5);
		this.background = this.add.sprite(this.camera.width/2 - 70, this.camera.height/2 + 35, 'preloaderBackground');
		this.preloadBar = this.add.sprite(this.camera.width/2 - 70, this.camera.height/2 + 35, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	You can find all of these assets in the Phaser Examples repository
		this.load.image('title_image', 'assets/sprites/title_image.png');
		this.load.image('rud_event', 'assets/sprites/rud_event.png');
		this.load.image('win_stage', 'assets/sprites/win_stage.png');
	    this.load.image('starfield', 'assets/skies/deep-space.jpg');

        // GUI assets
        this.load.image('progressorBackground', 'assets/GUI/track-progress.png');
        this.load.image('progressorMarker', 'assets/GUI/track-progress-marker.png');

		this.load.atlas('button', 'assets/GUI/button_texture_atlas.png', 'assets/GUI/button_texture_atlas.json');
		this.load.atlas('start_button', 'assets/GUI/start_button_atlas.png', 'assets/GUI/button_texture_atlas.json');
		this.load.atlas('menu_button', 'assets/GUI/menu_button_atlas.png', 'assets/GUI/button_texture_atlas.json');

		this.load.image('button_normal', 'assets/GUI/button_normal.png');
		this.load.image('button_pressed', 'assets/GUI/button_pressed.png');
		this.load.image('button_selected', 'assets/GUI/button_selected.png');

		///////////
		// WORLD
		///////////
		// player
        this.load.image('pod', 'assets/sprites/rPod.png');

	    // props
        this.load.image('pusher', 'assets/sprites/pusher.png');
	    this.load.image('wall', 'assets/sprites/wall.jpg');
	    this.load.image('booster', 'assets/sprites/booster.png');
	    this.load.image('end_sign', 'assets/sprites/end_sign.png');
		this.load.image('pylon', 'assets/sprites/pylon.png');

		// environment
		this.load.image('grassy_hill', 'assets/environment/grassy_hill.png');        
		this.load.image('grassy_hill_night', 'assets/environment/grassy_hill_night.png');
		this.load.image('snowy_hill', 'assets/environment/snowy_hill.png');

		// skies
        this.load.image('sunny_sky', 'assets/skies/sunny_sky.png'); 
        this.load.image('night_sky', 'assets/skies/night_sky.png'); 
        this.load.image('sun', 'assets/skies/sun.png'); 
        this.load.image('moon', 'assets/skies/moon.png'); 

        // Effects
        this.load.spritesheet('kaboom', 'assets/sprites/explode.png', 128, 128);

        // Weather 
        this.load.spritesheet('snowflakes', 'assets/sprites/snowflakes.png', 17, 17);
        this.load.spritesheet('snowflakes_large', 'assets/sprites/snowflakes_large.png', 64, 64);


        // Sound
        this.load.audio('level1Music', 'assets/sound/Totta-HeroQuest-Pophousedub-remix.ogg');
        this.load.audio('explosion', 'assets/sound/player_death.wav');
        this.load.audio('hit', 'assets/sound/squit.wav');

	    
	},

	create: function () {
		console.log("go to main menu")
		//this.state.start('MainMenu');
		this.state.start('MainMenu');

	},
	update: function () {
		// waits for music to be decoded before going to main menu
		/*if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}*/
	}

};
