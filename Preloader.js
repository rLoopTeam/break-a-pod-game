
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
        this.load.image('instructions', 'assets/GUI/instructions.png');
        this.load.image('progressorBackground', 'assets/GUI/track-progress.png');
        this.load.image('progressorMarker', 'assets/GUI/track-progress-marker.png');

		this.load.atlas('start_button', 'assets/GUI/start_button_atlas.png', 'assets/GUI/button_texture_atlas.json');
		this.load.atlas('menu_button', 'assets/GUI/menu_button_atlas.png', 'assets/GUI/button_texture_atlas.json');
		this.load.atlas('mute_button', 'assets/GUI/mute_button_atlas.png', 'assets/GUI/button_texture_atlas.json');
		this.load.atlas('mute_button_muted', 'assets/GUI/mute_button_muted_atlas.png', 'assets/GUI/button_texture_atlas.json');

		// Fonts
		this.load.bitmapFont('basic_font_white', 'assets/fonts/font.png', 'assets/fonts/font.xml');
		

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
		this.load.image('snowy_mountain', 'assets/environment/snowy_mountain.png');
		this.load.image('mountain', 'assets/environment/mountain.png');
		this.load.image('grassy_hill', 'assets/environment/grassy_hill.png');
		this.load.image('grassy_hill_night', 'assets/environment/grassy_hill_night.png');
		this.load.image('snowy_hill', 'assets/environment/snowy_hill.png');

		// skies
        this.load.image('sunny_sky', 'assets/skies/sunny_sky.png'); 
        this.load.image('sun', 'assets/skies/sun.png'); 

        // Effects
        this.load.spritesheet('kaboom', 'assets/sprites/explode.png', 128, 128);

        // Weather 
        this.load.spritesheet('snowflakes', 'assets/sprites/snowflakes.png', 17, 17);
        this.load.spritesheet('snowflakes_large', 'assets/sprites/snowflakes_large.png', 64, 64);


        // Sound
        this.load.audio('titleMusic', 'assets/sound/Totta-HeroQuest-Pophousedub-remix.ogg');
        this.load.audio('level1Music', 'assets/sound/Totta-HeroQuest-Pophousedub-remix.ogg');
        this.load.audio('explosion', 'assets/sound/player_death.wav');
        this.load.audio('hit', 'assets/sound/squit.wav');

        /////// environment set /////
        //night grass
        this.load.image('night_sky', 'assets/environment/night_grass/night_sky.png'); 
        this.load.image('moon', 'assets/environment/night_grass/moon.png'); 
        this.load.image('night_grass', 'assets/environment/night_grass/night_grass.png'); 
        

        //savanah
	    this.load.image('savannah_sky', 'assets/environment/savannah/sky.png'); 
        this.load.image('savannah_sun', 'assets/environment/savannah/sun.png'); 
        this.load.image('savannah_clouds', 'assets/environment/savannah/clouds.png'); 
        this.load.image('savannah_grass', 'assets/environment/savannah/grass.png'); 
        this.load.image('savannah_tree1', 'assets/environment/savannah/tree1.png'); 
        this.load.image('savannah_tree2', 'assets/environment/savannah/tree2.png'); 
        this.load.image('savannah_tree3', 'assets/environment/savannah/tree3.png'); 

        //Night forest
	    this.load.image('forest_night_sky', 'assets/environment/night_forest/sky.png'); 
        this.load.image('forest_night_moon', 'assets/environment/night_forest/moon.png'); 
        this.load.image('forest_night_clouds', 'assets/environment/night_forest/clouds.png'); 
        this.load.image('forest_night_grass', 'assets/environment/night_forest/dark_grass.png'); 
        this.load.image('forest_night_trees1', 'assets/environment/night_forest/trees1.png'); 
        this.load.image('forest_night_trees2', 'assets/environment/night_forest/trees2.png'); 
        this.load.image('forest_night_tree1', 'assets/environment/night_forest/tree1.png'); 
        this.load.image('forest_night_tree2', 'assets/environment/night_forest/tree2.png'); 
        this.load.image('forest_night_tree3', 'assets/environment/night_forest/tree3.png'); 

        //Ocean
	    this.load.image('ocean_sky', 'assets/environment/ocean/sky.png'); 
        this.load.image('ocean_sun', 'assets/environment/ocean/sun.png');  // use existing sun
        this.load.image('ocean_clouds1', 'assets/environment/ocean/ocean_clouds1.png'); 
        this.load.image('ocean_clouds2', 'assets/environment/ocean/ocean_clouds2.png'); 
        this.load.image('ocean_water', 'assets/environment/ocean/ocean_water.png'); 
        this.load.image('ocean_mountains1', 'assets/environment/ocean/ocean_mountains1.png'); 
        this.load.image('ocean_mountains2', 'assets/environment/ocean/ocean_mountains2.png'); 
        this.load.image('fish_left', 'assets/environment/ocean/fish_left.png'); 
        this.load.image('fish_right', 'assets/environment/ocean/fish_right.png'); 

         //Mountain
	    this.load.image('mountain_sky', 'assets/environment/mountain/sky.png'); 
        this.load.image('mountain_clouds', 'assets/environment/mountain/clouds.png');
        this.load.image('mountain_dirt', 'assets/environment/mountain/dirt.png'); 
        this.load.image('mountain_hills', 'assets/environment/mountain/hills.png'); 
        this.load.image('mountain_hills2', 'assets/environment/mountain/hills_far.png'); 
        this.load.image('mountain_mountains', 'assets/environment/mountain/mountains.png'); 

        //Mountain
	    this.load.image('skyline_dawn', 'assets/environment/skyline/sky_dawn.png'); 
	    this.load.image('skyline_dusk', 'assets/environment/skyline/sky_dusk.png'); 
        this.load.image('skyline_ground', 'assets/environment/skyline/ground.png');
        this.load.image('skyline_hills', 'assets/environment/skyline/hills.png'); 
        this.load.image('skyline_hills_mid', 'assets/environment/skyline/hills_mid.png'); 
        this.load.image('skyline_hills_far', 'assets/environment/skyline/hills_far.png'); 
        this.load.image('skyline_far', 'assets/environment/skyline/skyline_far.png'); 
        this.load.image('skyline_mid', 'assets/environment/skyline/skyline_mid.png'); 
        this.load.image('skyline_close', 'assets/environment/skyline/skyline_close.png'); 



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
