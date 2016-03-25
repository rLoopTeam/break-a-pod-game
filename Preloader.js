
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {


		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(this.camera.width/2, this.camera.height/2 + 35, 'preloaderBackground');
        this.background.anchor.set(0.5,0.5)
		this.preloadBar = this.add.sprite(this.camera.width/2 - 107, this.camera.height/2 + 44, 'preloaderBar');
        this.preloadBar.scale.set(1,1)

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	You can find all of these assets in the Phaser Examples repository
		this.load.image('title_image', 'assets/sprites/title_image.png');
		this.load.image('win_stage', 'assets/sprites/win_stage.png');
	    this.load.image('starfield', 'assets/skies/deep-space.jpg');

        // GUI assets
        this.load.image('instructions1', 'assets/GUI/instructions.png');
        this.load.image('instructions', 'assets/GUI/instructions2.png');
        this.load.image('topUI', 'assets/GUI/topUI.png');
        this.load.image('highscore_screen', 'assets/GUI/highscore_screen.png');
        this.load.image('progressorBackground', 'assets/GUI/UI.png');
        this.load.image('progressorMarker', 'assets/GUI/distance_marker.png');
        this.load.image('health_indicator', 'assets/GUI/health_percent.png');

		//this.load.atlas('menu_button', 'assets/GUI/menu_button_atlas.png', 'assets/GUI/button_texture_atlas.json');
        this.load.atlas('menu_button', 'assets/GUI/menu_button_atlas2.png', 'assets/GUI/button_texture_atlas2.json');
		this.load.atlas('mute_button', 'assets/GUI/mute_button_atlas.png', 'assets/GUI/button_texture_atlas.json');
		this.load.atlas('mute_button_muted', 'assets/GUI/mute_button_muted_atlas.png', 'assets/GUI/button_texture_atlas.json');
        this.load.atlas('start_button', 'assets/GUI/start_sprite_sheet.png', 'assets/GUI/button_texture_atlas.json');
        this.load.spritesheet('start_button_spritesheet', 'assets/GUI/start_sprite_sheet.png', 150, 52);

		// Fonts
		this.load.bitmapFont('basic_font_white', 'assets/fonts/font.png', 'assets/fonts/font.xml');
		

		///////////
		// WORLD
		///////////
		// player
        //this.load.image('pod', 'assets/sprites/rPod.png');
        this.load.spritesheet('pod', 'assets/sprites/rPod.png', 269, 93);

	    // props
        this.load.image('pusher', 'assets/sprites/pusher.png');
	    this.load.image('wall', 'assets/sprites/wall.jpg');
		this.load.image('pylon', 'assets/sprites/pylon.png');
        this.load.image('power_pickup', 'assets/sprites/power_pickup.png');

		// skies
        this.load.image('sunny_sky', 'assets/skies/sunny_sky.png'); 
        this.load.image('sun', 'assets/skies/sun.png'); 

        // Effects
        this.load.spritesheet('kaboom', 'assets/sprites/explode.png', 128, 128);

        // Weather 
        this.load.spritesheet('snowflakes', 'assets/sprites/snowflakes.png', 17, 17);
        this.load.spritesheet('snowflakes_large', 'assets/sprites/snowflakes_large.png', 64, 64);


        // Sound
        // tracks
        //this.load.audio('titleMusic', 'assets/sound/Totta-HeroQuest-Pophousedub-remix.ogg'); // title song
        this.load.audio('titleMusic', 'assets/sound/music/07_Home_at_Last.ogg'); // title song
        this.load.audio('endMusic', 'assets/sound/music/we_are_resistors.ogg');
        this.load.audio('track1', 'assets/sound/music/01_Super_Secret_Tune.ogg');
        this.load.audio('track2', 'assets/sound/music/01_The_Misadventure_Begins.ogg');
        this.load.audio('track3', 'assets/sound/music/02_Dont_be_a_Bitch_Remix.ogg');
        this.load.audio('track4', 'assets/sound/music/04_Delicious_Keys.ogg');
        this.load.audio('track5', 'assets/sound/music/05_No_Fight_but_Cool.ogg');
        this.load.audio('track6', 'assets/sound/music/07_Waterski_Me.ogg');
        this.load.audio('track7', 'assets/sound/music/08_Chip_Woke_up_This_Morning.ogg');
        this.load.audio('track8', 'assets/sound/music/chibi_ninja_EDIT.ogg');
        this.load.audio('track9', 'assets/sound/music/HHavok-main.ogg');
        this.load.audio('track10', 'assets/sound/music/Jumpshot.ogg');
        this.load.audio('track11', 'assets/sound/music/Weareallunderstars_EDIT.ogg');


        //this.load.audio('explosion', 'assets/sound/player_death.wav');
        this.load.audio('explosion', 'assets/sound/explosion.wav');
        //this.load.audio('hit', 'assets/sound/squit.wav');
        this.load.audio('hit1', 'assets/sound/hit1.wav');
        this.load.audio('hit2', 'assets/sound/hit2.wav');
        this.load.audio('hit3', 'assets/sound/hit3.wav');
        this.load.audio('click', 'assets/sound/click.wav');

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

        //Snow 
        this.load.image('snow_ground', 'assets/environment/snow/snow_ground.png'); 
        this.load.image('snow_hills_close', 'assets/environment/snow/hills_close.png'); 
        this.load.image('snow_hills_middle', 'assets/environment/snow/hills_middle.png'); 
        this.load.image('snow_hills_far', 'assets/environment/snow/hills_far.png'); 
        this.load.image('snow_light', 'assets/environment/snow/snow_light.png'); 
        this.load.image('snow_dark', 'assets/environment/snow/snow_dark.png'); 
        this.load.image('snow_background', 'assets/environment/snow/snow_background.png'); 
        this.load.image('snow_clouds', 'assets/environment/snow/clouds.png'); 

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
