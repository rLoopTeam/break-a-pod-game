
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game = game;		//	a reference to the currently running game
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
        
        console.log("game started")
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        //control
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // GUI buttons
        this.menuButton = this.add.button(25, 25, 'button_normal', this.quitGame, this, 'button_hover', 'button_normal', 'button_hover');

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
	},

	update: function () {

		this.physics.arcade.collide(this.player, this.tunnel);
        this.physics.arcade.overlap(this.player, this.end, this.win, null, this);

        // make camera follow player
        this.camera.x = this.player.x - 200;

        this.handleInput();

	},
            
    render: function() {
        this.game.debug.text(this.time.fps || '--', 2, 14, "#00ff00");  
        //console.log(this.game.debug)
    },
    
    resize: function (width, height) {
        this.menuButton.x = 25;
        this.menuButton.y = 25;
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

/*
var cursors;
        var tunnel;

        var mainstate = {

            preload: function() {
                //game.time.advancedTiming = true;
                //game.load.image('sky', 'assets/sky.png');
                game.load.image('wall', 'wall.jpg');
                game.load.image('pod', 'pod.jpg');
                //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
            },
            
            create: function() {
                
                cursors = game.input.keyboard.createCursorKeys();
                
                game.input.keyboard.onUpCallback = function( e ){
                    if(e.keyCode == Phaser.Keyboard.ESC){
                        console.log("pause");
                        game.state.start('menu');
                    }
                };

                game.physics.startSystem(Phaser.Physics.ARCADE);
                
                tunnel = game.add.group();

                tunnel.enableBody = true;

                //game.world.height - 64
                var wall = tunnel.create(0, 0, 'wall');
                wall.scale.setTo(2, 2);
                wall.body.immovable = true;

                var wall2 = tunnel.create(0, game.world.height-16, 'wall');
                wall2.scale.setTo(2, 2);
                wall2.body.immovable = true;

                // player
                player = game.add.sprite(32, game.world.height / 2, 'pod');

                game.physics.arcade.enable(player);

                player.body.bounce.y = 0.2;
                player.body.gravity.y = 300;
                player.body.collideWorldBounds = true;

                player.animations.add('left', [0, 1, 2, 3], 10, true);
                player.animations.add('right', [5, 6, 7, 8], 10, true);

                // var ledge = platforms.create(400, 400, 'wall');
                // ledge.body.immovable = true;
            },

            update: function() {

                game.physics.arcade.collide(player, tunnel);

                //  Reset the players velocity (movement)
                player.body.velocity.x = 0;

                if (cursors.left.isDown)
                {
                    //  Move to the left
                    player.body.velocity.x = -150;

                    player.animations.play('left');
                }
                else if (cursors.right.isDown)
                {
                    //  Move to the right
                    player.body.velocity.x = 150;

                    player.animations.play('right');
                }
                else
                {
                    //  Stand still
                    player.animations.stop();

                    player.frame = 4;
                }

                //  Allow the player to jump if they are touching the ground.
                if (cursors.up.isDown && player.body.touching.down)
                {
                    player.body.velocity.y = -350;
                }
            },
            
            render: function() {
                game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");  
            }
            
        };*/