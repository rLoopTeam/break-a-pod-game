
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
    this.menuButton;
    this.cursors;

    this.player;
};

BasicGame.Game.prototype = {

	create: function () {
        //gametime
        this.game.time.advancedTiming = true;

        console.log("game started")
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        //control
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // GUI buttons
        //this.menuButton = this.add.button(25, 25, 'button_normal', this.quitGame, this, 'button_hover', 'button_normal', 'button_hover');

        // world
        this.stage.backgroundColor = "#0c9fc7";
        
        // set world size
        this.world.setBounds(0, 0, 20000, 500);

        this.tunnel = this.add.group();

        this.tunnel.enableBody = true;

        var wall = this.tunnel.create(0, 0, 'wall');
        wall.scale.setTo(2, 2);
        wall.body.immovable = true;

        var wall2 = this.tunnel.create(0, this.world.height-16, 'wall');
        wall2.scale.setTo(2, 2);
        wall2.body.immovable = true;

        var booster = this.add.sprite(300, this.world.height-41, 'booster');



        // player
        this.player = this.add.sprite(32, this.world.height / 2, 'pod');

        this.physics.arcade.enable(this.player);

        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        //player.body.collideWorldBounds = true;

        var graphics = this.game.add.graphics(100, 100);
        
        // draw a second shape
        /*graphics.moveTo(210,300);
        graphics.lineTo(450,320);
        graphics.lineTo(570,350);
        graphics.quadraticCurveTo(600, 0, 480,100);
        graphics.lineTo(330,120);
        graphics.lineTo(410,200);
        graphics.lineTo(210,300);
        graphics.endFill();*/
        
        var length = 300,
            depth = 500,
            resolution = 10,
            floor_position = {"x": 0, "y": 500};

        graphics.moveTo(floor_position.x, 800);

        graphics.lineStyle(10, 0xFF0000, 0.8);
        graphics.beginFill(0xFF700B, 1);
        
        for ( var i = 0; i < (length*resolution); i++ ) {
            graphics.lineTo(floor_position.x + i*10, floor_position.y + Math.sin( i )*10);
        }
        graphics.lineTo(length*resolution, floor_position.y);
        graphics.endFill();

        /*graphics.lineTo(450,320);
        graphics.lineTo(570,350);
        graphics.quadraticCurveTo(600, 0, 480,100);
        graphics.lineTo(330,120);
        graphics.lineTo(410,200);
        graphics.lineTo(210,300);
        graphics.endFill();*/

        window.graphics = graphics;
	},

	update: function () {

		this.physics.arcade.collide(this.player, this.tunnel);
        this.physics.arcade.overlap(this.player, this.end, this.win, null, this);

        // make camera follow player
        this.camera.x = this.player.x - 200;

        this.handleInput();

	},
            
    render: function() {
        try{
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");  
        } catch(e){
            console.log("===render error====")
            console.log(e)
        }
        
    },
    
    resize: function (width, height) {
        //this.menuButton.x = 25;
        //this.menuButton.y = 25;
    },

    handleInput: function() {
        if (this.cursors.left.isDown || this.moveLeft) {
            this.player.body.velocity.x = -200;
            this.player.frame = 2;
        }
        else if (this.cursors.right.isDown || this.moveRight) {
            this.player.body.velocity.x = 200;
            this.player.frame = 1;
        }
        else {
            this.player.body.velocity.x = 0;
        }

        if (this.player.body.velocity.x == 0)
            this.player.animations.play('idle');
    },

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
        console.log("go back to main menu")
		this.state.start('MainMenu');

	},

    win: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        console.log("go back to win screen")
        this.state.start('Win');

    }
};
