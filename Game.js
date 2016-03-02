
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

    // world settings
    this.levelLength = 30000;
    this.tubeHeight = 200;

    // global vars
    this.menuButton;
    this.cursors;

    this.carBody;

    this.groundMaterial;
    this.playerMaterial;

    this.tunnelPhysicsData;

    this.CG_world;

    this.Timer_text;
    this.Speed_text;
};



BasicGame.Game.prototype = {
    preload: function() {
        // numberOfHills, start_y, hill_max_height, tube_length, tube_height, pixelStep
        this.tunnelPhysicsData = this.generateTubePoints(15, (this.world.height / 2) +100, 580, this.levelLength, this.tubeHeight, 80);
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
        
        // GUI
        this.trackProgressorBackground = this.add.sprite(this.camera.x, this.camera.y,'progressorBackground');  
        this.trackProgressorBackground.anchor.setTo(0, 0.5);
        this.trackProgressorMarker = this.add.sprite(this.camera.x, this.camera.y,'progressorMarker'); 
        this.trackProgressorMarker.anchor.setTo(0.5, 0.5);
        this.menuButton = this.add.button(this.camera.x, this.camera.y, 'button_normal', this.quitGame, this, 'button_hover', 'button_normal', 'button_hover');
        this.menuButton.scale.set(0.5, 0.5);
        // Displays
        this.Timer_text = this.add.text(this.camera.x + 15, this.world.height - 50, "00:00:00", {
            font: "24px Arial",
            fill: "#ffffff",
            align: "center"
        });
        this.Speed_text = this.add.text(this.camera.x + 15, this.world.height - 75, "0 m/s", {
            font: "24px Arial",
            fill: "#ffffff",
            align: "center"
        });

        // world
        this.stage.backgroundColor = "#0c9fc7";
        this.world.setBounds(0, 0, this.levelLength, 500);


        var graphics = this.add.graphics(0, 0);

        this.addCar();
        this.drawTube(graphics, this.tunnelPhysicsData);

        window.graphics = graphics;
	},

	update: function () {
        this.camera.x = this.carBody.body.x - 200;
        
        // update GUI
        this.trackProgressorBackground.x = this.camera.x + ((this.camera.height)/4);
        this.trackProgressorBackground.y = this.camera.y + 560;
        this.Timer_text.x = this.camera.x + 15;
        this.Speed_text.x = this.camera.x + 15;

	    // update marker on track progressor
        var ProgressMultiplier = this.carBody.x / this.levelLength;
        if (ProgressMultiplier > 1) { ProgressMultiplier = 1; }
        this.trackProgressorMarker.x = this.trackProgressorBackground.x + (ProgressMultiplier  *  this.trackProgressorBackground.width);
        this.trackProgressorMarker.y = this.trackProgressorBackground.y;

        this.menuButton.x = this.camera.x + 20;
        this.menuButton.y = this.camera.y + 20;

        this.handleInput();

        if (ProgressMultiplier != 1) {
            // Timer
            var minutes = Math.floor(this.game.time.totalElapsedSeconds() / 60);
            var seconds = Math.floor(this.game.time.totalElapsedSeconds()) % 60;
            var miliseconds = Math.floor((this.game.time.totalElapsedSeconds() - Math.floor(this.game.time.totalElapsedSeconds())) * 100); 
            if (seconds < 10) seconds = '0' + seconds;
            if (minutes < 10) minutes = '0' + minutes;
            if (miliseconds < 10) miliseconds = '0' + miliseconds;
            this.Timer_text.setText(minutes + ':' + seconds + ':' + miliseconds);

            // Speed
            var pod_velcity = this.carBody.body.velocity.x; // in pixels per second
            pod_velcity = pod_velcity / 5; // could set this as a constant somewhere...pixels/meter
            pod_velcity = Math.floor(pod_velcity);
            this.Speed_text.setText(pod_velcity + ' m/s');
        };

        
	},

    generateTubePoints: function (numberOfHills, start_y, hill_max_height, tube_length, tube_height, pixelStep){
        var hillStartY          = start_y,
            hillWidth           = tube_length/numberOfHills,
            hillSlices          = hillWidth/pixelStep,
            tunnelPhysicsData   = {"top":[], "bottom":[], "pylons":[]},
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
                        "shape": [prevx,hillPoint.y + 100,   prevx,prevy,   hillPoint.x,hillPoint.y,   hillPoint.x,hillPoint.y+100]
                    };
                    tunnelPhysicsData['bottom'].push(rect);

                    var topRect = {
                        "density": 2, "friction": 0, "bounce": 0,
                        "filter": { "categoryBits": 1, "maskBits": 65535 },
                        "shape": [prevx,hillPoint.y-tube_height-100,   hillPoint.x,hillPoint.y-tube_height-100,   hillPoint.x,hillPoint.y-tube_height,   prevx,prevy-tube_height]
                        //"shape": [prevx, hillPoint.y - tube_height, prevx, hillPoint.y - tube_height - 10, hillPoint.x, hillPoint.y - tube_height-10, hillPoint.x, hillPoint.y - tube_height]
                    };
                    tunnelPhysicsData['top'].push(topRect);

                    prevx = x;
                    prevy = y;
            }
            tunnelPhysicsData['pylons'].push({ position:{"x": prevx, "y": prevy} });

            // this is also necessary to make all hills (execept the first one) begin where the previous hill ended
            hillStartY = hillStartY + randomHeight;
        }
        return tunnelPhysicsData;
    },
    drawTube: function (graphics, points){    
        console.log(points)
        var totalPoints = points['bottom'].length;  
        var prevx = points['bottom'][0]['shape'][2];
        var prevy = points['bottom'][0]['shape'][3];

        var totalPylons = points['pylons'].length;
        

        //==================//
        // draw tube
        //==================//
        graphics.lineStyle(6,0xAAAAAA, 0.8);
        graphics.beginFill(0xFF700B, 1);
        graphics.moveTo(points['bottom'][0]['shape'][4], points['bottom'][0]['shape'][5]);

        for (var i = 1; i < totalPoints; i++) {
            var x = points['bottom'][i]['shape'][4],
                y = points['bottom'][i]['shape'][5];

            graphics.lineTo(x, y);
            graphics.moveTo(x, y);

            prevx = x;
            prevy = y;
        }

        graphics.lineTo(prevx+500,prevy);
        graphics.endFill();

        graphics.lineStyle(6, 0xAAAAAA, 0.8);
        graphics.beginFill(0xFF700B, 1);
        graphics.moveTo(points['top'][0]['shape'][4], points['top'][0]['shape'][5]);

        for (var i = 1; i < totalPoints; i++) {
            var x = points['top'][i]['shape'][4],
                y = points['top'][i]['shape'][5];

            graphics.lineTo(x, y);
            graphics.moveTo(x, y);

            prevx = x;
            prevy = y;

        }

        graphics.lineTo(prevx + 500, prevy);
        graphics.endFill();


        //==================//
        // draw pylons
        //==================//
        for (var i = 0; i < totalPylons; i++) {
            var x = points['pylons'][i]['position'].x,
                y = points['pylons'][i]['position'].y;
            var pylon = this.add.sprite(x, y-this.tubeHeight-20,'pylon');  
            //pylon.anchor.setTo(0.5, 0.1);
        }
        

        //==================//
        // load physics data
        //==================//
        var polygonCollisionSprite = this.add.sprite(0, 0,'wall');  
        this.physics.p2.enableBody(polygonCollisionSprite);
        polygonCollisionSprite.body.loadPolygon('physicsData', 'bottom');
        polygonCollisionSprite.body.static = true;
        polygonCollisionSprite.body.setMaterial(this.groundMaterial);

        var top_polygonCollisionSprite = this.add.sprite(0, 0, 'wall');
        this.physics.p2.enableBody(top_polygonCollisionSprite);
        top_polygonCollisionSprite.body.loadPolygon('physicsData', 'top');
        top_polygonCollisionSprite.body.static = true;
        top_polygonCollisionSprite.body.addRectangle(10, 50, 0, 400);
        top_polygonCollisionSprite.body.setMaterial(this.groundMaterial);

    },
            
    render: function() {
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
    },
    
    resize: function (width, height) {
        //this.menuButton.x = 25;
        //this.menuButton.y = 25;
    },

    handleInput: function() {
        
        if (this.cursors.up.isDown)
        {
            if (this.wheel_back.body.angularVelocity < 300) 
            {
                this.wheel_back.body.angularVelocity += 10; 
                this.wheel_front.body.angularVelocity += 10;
            }
            this.carBody.body.thrust(200);
        }

        if (this.cursors.right.isDown)
        {
            this.carBody.body.angularVelocity = .5;
        }
        if (this.cursors.left.isDown)
        {
            this.carBody.body.angularVelocity = -.5;
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
        var carBody = this.add.sprite(100, (this.world.height / 2) + 150, 'pod'); //CARBODY
        carBody.scale.set(0.5, 0.5)
        var wheel_front = this.add.sprite(140, 280); //FRONT WHEEL
        var wheel_back = this.add.sprite(60, 280); //BACK WHEEL 
        //var CG_car = this.physics.p2.createCollisionGroup(); //CAR GROUP
        
        this.physics.p2.updateBoundsCollisionGroup(); 
        this.physics.p2.enable([wheel_front, wheel_back, carBody]);

        carBody.body.setRectangle(30, 100);
        //carBody.body.debug = true; //this adds the pink box
        carBody.body.mass = 1;
        carBody.body.angle = 90;
        carBody.body.setMaterial(this.playerMaterial);

        wheel_front.body.setCircle(5);
        wheel_front.body.mass = 0.1;
        wheel_front.body.setMaterial(this.playerMaterial);
        wheel_front.renderable = false;
    
        wheel_back.body.setCircle(5);
        wheel_back.body.mass = 0.1;
        wheel_back.body.setMaterial(this.playerMaterial);
        wheel_back.renderable = false;
        
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
