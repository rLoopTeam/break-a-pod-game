
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently runningthis.game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to thethis.game camera
    this.cache;		//	thethis.game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	thethis.game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	thethis.game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your ownthis.game called "world" or you'll over-write the world reference.
    
    this.menuButton;
    this.cursors;

    this.player;
    this.carBody;

    this.groundMaterial;
    this.playerMaterial;

    this.playerCollisionGroup;
    this.tunnelCollisionGroup;

    this.tunnelPhysicsData;

    this.CG_world;
};

BasicGame.Game.prototype = {
    preload: function() {
        // numberOfHills, start_y, hill_max_height, tube_length, tube_height, pixelStep
        this.tunnelPhysicsData = this.generateTubePoints(5, (this.world.height / 2) +100, 580, 15000, 200, 15);
        this.load.physics('physicsData', "", this.tunnelPhysicsData);
    },

	create: function () {
        //gametime
        this.time.advancedTiming = true;
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.gravity.y = 300;
        this.physics.p2.restitution = 0.2;

        this.groundMaterial = this.physics.p2.createMaterial('ground');
        this.playerMaterial = this.physics.p2.createMaterial('player');
        this.physics.p2.createContactMaterial(this.playerMaterial, this.groundMaterial, { friction: 1.0,restitution: 0  });

        //control
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // GUI buttons
        //this.menuButton = this.add.button(25, 25, 'button_normal', this.quitGame, this, 'button_hover', 'button_normal', 'button_hover');

        // world
        this.stage.backgroundColor = "#0c9fc7";
        this.world.setBounds(0, 0, 20000, 500);


        var graphics = this.add.graphics(0, 0);

        this.drawTube(graphics, this.tunnelPhysicsData);
        this.addCar();

        window.graphics = graphics;
	},

	update: function () {
        this.camera.x = this.carBody.body.x - 200;
        //this.camera.x = this.player.body.x - 200;
        //this.player.body.velocity.x = 400;
        this.handleInput();

	},

    generateTubePoints: function (numberOfHills, start_y, hill_max_height, tube_length, tube_height, pixelStep){
        var hillStartY          = start_y,
            hillWidth           = tube_length/numberOfHills,
            hillSlices          = hillWidth/pixelStep,
            tunnelPhysicsData   = {"top":[], "bottom":[]},
            prevx               = 0,
            prevy               = 800;

        for (var i = 0; i < numberOfHills; i++) {
            var randomHeight = Math.random()*78.5;
            // this is necessary to make all hills (execept the first one) begin where the previous hill ended
            if (i!=0) {
                hillStartY -= randomHeight;
            }
            // looping through hill slices
            for (var j = 0; j <= hillSlices; j++) {
                    var x           = j * pixelStep + hillWidth * i,
                        y           = hillStartY + randomHeight * Math.cos(2*Math.PI/hillSlices*j),
                        height      = y - prevy,
                        length      = Math.sqrt((pixelStep*pixelStep) + (height*height)),
                        hillPoint   = {"x": x, "y": y},
                        angle       = Math.atan2(y - prevy, x - prevx)

                    var rect = {
                        "density": 2, "friction": 0, "bounce": 0, 
                        "filter": { "categoryBits": 1, "maskBits": 65535 },
                        "shape": [  prevx,800,   prevx,prevy,  hillPoint.x,hillPoint.y,  hillPoint.x,800  ]
                    };
                    tunnelPhysicsData['bottom'].push(rect);

                    prevx = x;
                    prevy = y;
            }
            // this is also necessary to make all hills (execept the first one) begin where the previous hill ended
            hillStartY = hillStartY + randomHeight;
        }
        return tunnelPhysicsData;
    },
    drawTube: function (graphics, points){    
        var totalPoints = points['bottom'].length;    
        var prevx = points['bottom'][0]['shape'][2];
        var prevy = points['bottom'][0]['shape'][3];
        
        graphics.lineStyle(6,0xAAAAAA, 0.8);
        graphics.beginFill(0xFF700B, 1);
        graphics.moveTo(0,800);

        for (var i = 1; i < totalPoints; i++) {
            var x = points['bottom'][i]['shape'][4]
                y = points['bottom'][i]['shape'][5];

            graphics.lineTo(x, y);
            graphics.moveTo(x, y);

            prevx = x;
            prevy = y;
        }

        graphics.lineTo(prevx+500,prevy);
        graphics.endFill();

        // load physics data
        var polygonCollisionSprite = this.add.sprite(0, 0,'wall', true);  
        this.physics.p2.enableBody(polygonCollisionSprite,true);
        //polygonCollisionSprite.body.clearShapes();
        polygonCollisionSprite.body.loadPolygon('physicsData', 'bottom');
        polygonCollisionSprite.body.static = true;
        polygonCollisionSprite.body.addRectangle(10, 50, 0, 400);
        polygonCollisionSprite.body.setMaterial(this.groundMaterial);

    },
            
    render: function() {
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");  
    },
    
    resize: function (width, height) {
        //this.menuButton.x = 25;
        //this.menuButton.y = 25;
    },

    handleInput: function() {
        
        if (this.cursors.right.isDown)
        {
            if (this.wheel_back.body.angularVelocity < 300) 
            {
                this.wheel_back.body.angularVelocity += 10; 
                this.wheel_front.body.angularVelocity += 10;
            }
            this.carBody.body.thrust(200);
        }

        if (this.cursors.up.isDown)
        {
            this.carBody.body.angularVelocity = 2;
        }
        if (this.cursors.down.isDown)
        {
            this.carBody.body.angularVelocity = -2;
        }

        /*if (this.cursors.left.isDown || this.moveLeft) {
            this.player.body.velocity.x -= 25 * Math.cos(this.player.body.angle * Math.PI / 180);
            if (this.player.body.velocity.x < 0) { this.player.body.velocity.x = 0; } // This prevents pod from traveling backwards
            this.player.frame = 2;
        }
        else if (this.cursors.right.isDown || this.moveRight) {
            this.player.body.velocity.x += 10 * Math.cos(this.player.body.angle * Math.PI / 180);
            this.player.frame = 1;
        }*/
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

    },


    addCar: function () {
        var carBody = this.add.sprite(100, 250); //CARBODY
        var wheel_front = this.add.sprite(140, 280); //FRONT WHEEL
        var wheel_back = this.add.sprite(60, 280); //BACK WHEEL 
        //var CG_car = this.physics.p2.createCollisionGroup(); //CAR GROUP
        
        this.physics.p2.updateBoundsCollisionGroup(); 
        this.physics.p2.enable([wheel_front, wheel_back, carBody]);

        carBody.body.setRectangle(30,100);
        carBody.body.debug = true;
        carBody.body.mass = 1;
        carBody.body.angle = 90;
        carBody.body.setMaterial(this.playerMaterial);

        wheel_front.body.setCircle(5);
        wheel_front.body.mass = 0.1;
        wheel_front.body.setMaterial(this.playerMaterial);
    
        wheel_back.body.setCircle(5);
        wheel_back.body.mass = 0.1;
        wheel_back.body.setMaterial(this.playerMaterial);
        
        var spring = this.physics.p2.createSpring(carBody, wheel_front, 70, 150, 10,null,null,[0,30],null);
        var spring_1 = this.physics.p2.createSpring(carBody, wheel_back, 70, 150, 10,null,null,[0,-30],null);

        var constraint = this.physics.p2.createPrismaticConstraint(carBody, wheel_front, false,[0,30],[0,0],[1,0]);
        constraint.lowerLimitEnabled=constraint.upperLimitEnabled = true;
        constraint.upperLimit = -1;
        constraint.lowerLimit = -8;  

        var constraint_1 = this.physics.p2.createPrismaticConstraint(carBody, wheel_back, false,[0,-30],[0,0],[1,0]);
        
        constraint_1.lowerLimitEnabled=constraint_1.upperLimitEnabled = true;
        constraint_1.upperLimit = -1;
        constraint_1.lowerLimit = -8;  

        this.carBody = carBody;
        this.wheel_front = wheel_front;
        this.wheel_back = wheel_back;
    }

};
