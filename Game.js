
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

    // statuses
    this.isRunning;
    this.isDead;
    this.loseTimeout;
    this.winTimeout;

    // world settings
    this.levelLength;
    this.tubeHeight = 200;
    this.flatStartLength = 2500;
    this.flatEndLength = 500;
    this.pixelStep = 300;
    this.startPos;
    this.distanceFromEnd;

    this.bottomWall;

    this.car_collisionGroup;
    this.tube_collisionGroup;
    this.pusher_collisionGroup;

    this.groundMaterial;
    this.playerMaterial;
    this.wheelMaterial;
    this.tunnelPhysicsData;
    this.CG_world;

    this.playedBefore;
    this.showInstructions;

    // environment
    this.environment;
    this.background;
    this.midground;
    this.foreground;

    // global vars
    this.menuButton;
    this.muteButton;
    this.cursors;
    this.loseflag;
    this.winflag;
    this.pusherCounter;

    // tunnel
    this.tunnelGroup;

    // pod settings
    this.carGroup;
    this.carBody;
    this.wheel_front;
    this.wheel_back;
    this.wheelSpeed = 10;
    this.totalPower = 68;

    // pusher settings
    this.pusherBody;
    this.pusher_wheel_front;
    this.pusher_wheel_back;

    // GUI
    this.winStage_graphic;
    this.stranded_text;
    this.Level_text;
    this.Timer_text;
    this.Speed_text;
    this.Health_text;
    this.slowDown_text;
    this.stabilise_text;
    this.speedUp_text;
    this.pause_text;


    //Audio
    this.sound_click;
    this.sound_music;
    this.sound_explosion;
    this.sound_hit;
    this.music_volume;
    this.sound_volume;
    this.sound_muted;


    // Snow
    this.is_snowing = false;
    this.snow_var = 0;
    this.update_interval = 4 * 60;
    this.max = 0;
    this.front_emitter;
    this.mid_emitter;
    this.back_emitter;
};


BasicGame.Game.prototype = {

    init: function () {
        console.log("init")
        // use debug plugin
        this.add.plugin(Phaser.Plugin.Debug);

        var envs = this.game['GameData'].environments,
            totalEnvs = envs.length;
        var levelSelect = Math.floor(Math.random() * totalEnvs);
        //levelSelect = totalEnvs - 1
        
        this.environment = envs[levelSelect];
        this.is_snowing = this.environment.isSnowing || false; // set the snowing flag

        this.levelLength = this.game['GameData'].baseLevelLength * (Math.random() + 1);
        this.death_speed = this.game['GameData'].death_speed;
        this.min_speed = this.game['GameData'].min_speed;
        this.max_speed = this.game['GameData'].max_speed;
        this.playedBefore = this.game['GameData'].playedBefore;
        this.distanceFromEnd = this.game['GameData'].distanceFromEnd;
        //control
        this.cursors = this.input.keyboard.createCursorKeys();

        //------------------------------------//
        // Non real time controls
        //------------------------------------//
        // ESC pause game
        var escapeKey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escapeKey.onDown.add(this.togglePauseGame, this); 
        // ESC pause game
        var spacekey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacekey.onDown.add(this.restartGame , this); 


        // set world settings and player start position
        this.startPos = { "x": 150, "y": (this.world.height / 2) + 47 };
        this.stage.backgroundColor = "#0c9fc7";
        this.world.setBounds(0, 0, this.levelLength + this.flatStartLength + this.flatEndLength, 600);
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.gravity.y = 800;
        this.physics.p2.restitution = 0.2;

        // Variable setup
        this.time.reset();
        this.loseflag = false;
        this.winflag = false;
        this.isDead = false;
        this.pusherCounter = 0;

        //gametime
        this.time.advancedTiming = true;

        this.groundMaterial = this.physics.p2.createMaterial('ground');
        this.playerMaterial = this.physics.p2.createMaterial('player');
        this.wheelMaterial = this.physics.p2.createMaterial('wheel');
        this.physics.p2.createContactMaterial(this.playerMaterial, this.groundMaterial, { friction: 0.1, restitution: 0 });
        this.physics.p2.createContactMaterial(this.wheelMaterial, this.groundMaterial, { friction: 0.1, restitution: 0 });

        // numberOfHills, start_y, hill_max_height, tube_length, tube_height, pixelStep
        this.tunnelPhysicsData = this.generateTubePoints(15, (this.world.height / 2) + 100, 580, this.levelLength, this.tubeHeight, this.pixelStep);

    },

    create: function () {

        console.log("create")
        this.tube_collisionGroup = this.physics.p2.createCollisionGroup();
        this.car_collisionGroup = this.physics.p2.createCollisionGroup();

        // create normal group
        this.tunnelGroup = this.add.group();

        //Audio
        //this.sound_music = this.add.sound('level1Music');
        var trackIndex = Math.floor(12*Math.random() + 1); // select random index for track
        if (!this.sound_music || !this.sound_music.isPlaying) {  
            this.sound_music = this.game.add.sound('track'+trackIndex, 1, true);
        }
        this.sound_explosion = this.add.sound('explosion');
        this.sound_hit1 = this.add.sound('hit1');
        this.sound_hit2 = this.add.sound('hit1');
        this.sound_hit3 = this.add.sound('hit1');
        this.sound_click = this.add.sound('click');
        this.music_volume = 0.5;
        this.sound_volume = 0.3;
        this.sound_music.volume = this.music_volume;
        this.sound_explosion.volume = this.sound_volume;
        this.sound_hit1.volume = this.sound_volume;
        this.sound_hit2.volume = this.sound_volume;
        this.sound_hit3.volume = this.sound_volume;
        this.sound_muted = false;
        this.sound_music.loop = true;
        this.sound_music.play();    

        // create background first so that it goes to the back most position
        this.addBackground();
        this.addMidground();
        var graphics = this.add.graphics(0, 0); // create a graphics object and prepare generate tube and rest of environment
        this.addTunnel(graphics);
        //this.addPickups();
        this.addCar();
        //this.addPusher();
        this.addPylons();
        this.carBody.body.onBeginContact.add(this.podCollision, this);
        this.addForeground();

        // GUI - create this last so it overlays on top of everything else
        this.topUI = this.add.sprite(0, 0, 'topUI');
        this.trackProgressorBackground = this.add.sprite(0, this.camera.y + 517, 'progressorBackground');
        this.trackProgressorBackground.anchor.setTo(0, 0);
        this.trackProgressorMarker = this.add.sprite(120, this.trackProgressorBackground.y + 64, 'progressorMarker');
        this.trackProgressorMarker.anchor.setTo(0.5, 0.5);

        this.menuButton = this.add.button(this.camera.x + 2, this.camera.y + 5, 'menu_button', this.quitGame, this, 'over', 'out', 'down');
        //this.menuButton.scale.set(1, 1);

        this.muteButton = this.add.button(this.camera.x + 8, this.camera.y + 43, 'mute_button', this.toggleMuteAudio, this, 'over', 'out', 'down');
        this.muteButton.scale.set(0.4, 0.4);

        this.instructions = this.add.sprite(this.camera.x + this.camera.width/2,this.camera.y + 430, 'instructions');
        this.instructions.anchor.set(0.5, 0.5);

        this.Health_indicator = this.add.sprite(this.camera.x + this.camera.width - 8, this.camera.height - 45, 'health_indicator');
        this.Health_indicator.tint = 0x970000;
        this.Health_indicator.anchor.set(1, 0.5);
        this.Health_indicator.scale.set(100,1)

        this.power_indicator = this.add.sprite(this.camera.x + this.camera.width - 143, this.camera.height - 13, 'health_indicator');
        this.power_indicator.tint = 0x008a00;
        this.power_indicator.scale.set(this.totalPower,0.5)
        this.power_indicator.anchor.set(0, 0.5);

        // Displays
        this.Level_text = this.add.bitmapText(this.camera.x + 85, this.camera.y + 9, 'basic_font_white', 'Level ' + this.game['GameData'].cLevel, 25);
        this.Speed_text = this.add.bitmapText(this.camera.x + 10, this.camera.y + 558, 'basic_font_white', "0 m/s", 30);
        this.Speed_text.anchor.set(0, 0.5);
        this.Timer_text = this.add.bitmapText(this.camera.x + 10, this.camera.y + 565, 'basic_font_white', "00:00:00", 30);

        this.slowDown_text = this.add.bitmapText(this.camera.x + this.camera.width/2, this.camera.y +this.camera.height/2, 'basic_font_white', "Slow down!", 30);
        this.slowDown_text.anchor.set(0.5, 0.5);
        this.slowDown_text.tint = 0xFF0000;
        this.speedUp_text = this.add.bitmapText(this.camera.x + this.camera.width/2, this.camera.y +this.camera.height/2, 'basic_font_white', "Speed up!", 30);
        this.speedUp_text.anchor.set(0.5, 0.5);
        this.speedUp_text.tint = 0xFF0000;
        this.stabilise_text = this.add.bitmapText(this.camera.x + this.camera.width/2, this.camera.y +this.camera.height/2, 'basic_font_white', "Stabilize the pod now!", 30);
        this.stabilise_text.anchor.set(0.5, 0.5);
        this.stabilise_text.tint = 0xFF0000;
        this.pause_text = this.add.bitmapText(this.camera.x + this.camera.width/2, this.camera.y +this.camera.height/2, 'basic_font_white', "Game paused", 30);
        this.pause_text.anchor.set(0.5, 0.5);
        this.stranded_text = this.add.bitmapText(this.camera.x + this.camera.width/2, this.camera.y +this.camera.height/2,'basic_font_white', 'You are stranded!', 30);
        this.stranded_text.anchor.set(0.5, 0.5);

        //fix  elements to camera
        this.topUI.fixedToCamera = true;
        this.trackProgressorBackground.fixedToCamera = true; // Setting this to true made the indicator go backwards/slow when accelerating
        this.trackProgressorMarker.fixedToCamera = true;
        this.menuButton.fixedToCamera = true;
        this.muteButton.fixedToCamera = true;
        this.instructions.fixedToCamera = true;
        this.Health_indicator.fixedToCamera = true;
        this.power_indicator.fixedToCamera = true;
        this.Level_text.fixedToCamera = true;
        this.Timer_text.fixedToCamera = true;
        this.Speed_text.fixedToCamera = true;
        this.slowDown_text.fixedToCamera = true;
        this.speedUp_text.fixedToCamera = true;
        this.stabilise_text.fixedToCamera = true;
        this.pause_text.fixedToCamera = true;
        this.stranded_text.fixedToCamera = true;

        // GUI Initial visibility
        this.slowDown_text.visible = false;
        this.speedUp_text.visible = false;
        this.pause_text.visible = false;
        this.stabilise_text.visible = false;
        this.showInstructions = (this.playedBefore)?false:true;
        this.stranded_text.visible = false;

        // Snow 
        if (this.is_snowing) {
            this.back_emitter = this.add.emitter(this.camera.width * 5, -32, 1000);
            this.back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
            this.back_emitter.maxParticleScale = 0.6;
            this.back_emitter.minParticleScale = 0.2;
            this.back_emitter.setYSpeed(20, 100);
            this.back_emitter.gravity = 0;
            this.back_emitter.width = this.camera.width * 10;
            this.back_emitter.minRotation = 0;
            this.back_emitter.maxRotation = 40;
            this.back_emitter.fixedToCamera = true;

            this.mid_emitter = this.add.emitter(this.camera.width * 5, -32, 400);
            this.mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
            this.mid_emitter.maxParticleScale = 1.2;
            this.mid_emitter.minParticleScale = 0.8;
            this.mid_emitter.setYSpeed(50, 150);
            this.mid_emitter.gravity = 0;
            this.mid_emitter.width = this.camera.width * 10;
            this.mid_emitter.minRotation = 0;
            this.mid_emitter.maxRotation = 40;
            this.mid_emitter.fixedToCamera = true;

            this.front_emitter = this.add.emitter(this.camera.width * 5, -32, 100);
            this.front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
            this.front_emitter.maxParticleScale = 1;
            this.front_emitter.minParticleScale = 0.5;
            this.front_emitter.setYSpeed(100, 200);
            this.front_emitter.gravity = 0;
            this.front_emitter.width = this.camera.width * 10;
            this.front_emitter.minRotation = 0;
            this.front_emitter.maxRotation = 40;
            this.back_emitter.fixedToCamera = true;

            this.changeWindDirection();

            this.back_emitter.start(false, 14000, 20);
            this.mid_emitter.start(false, 12000, 40);
            this.front_emitter.start(false, 6000, 1000);

        }
    },

    update: function () {
        //this.currentblock.text = this.getBlockIndex() + "/" + this.getBlocks();
        this.updateTunnel();

        // handle inputs
        if (!this.loseflag ) { this.handleInput(); };

        // camera follow pod
        if (!this.loseflag ) { this.camera.x = this.carBody.body.x - 200; };

        // update background
        //this.background.x = this.camera.x;

        // update midground
        var camera = this.camera;
        this.midground.forEach(function (item) {
            if (item.type === 5) { // tileable sprite
                //item.tilePosition += item.velocity;
                if (item.velocity.x != 0 || item.velocity.y != 0) {
                    item.tilePosition.x += item.velocity.x;
                    item.tilePosition.y += item.velocity.y;
                } else {
                    item.tilePosition.x = -(camera.x * item.parallax) + item.offset.x;
                    item.tilePosition.y = item.offset.y - item.velocity.y;
                }
            } else if (item.type === 0) {
                console.log(camera.x * item.parallax + item.offset.x)
                item.x = -(camera.x * item.parallax) + item.offset.x;
                //item.y = item.offset.y - item.velocity.y;

            }
        })

        //---------------------
        // Pod status check
        //---------------------
        this.power_indicator.x = this.camera.x + this.camera.width - 100;
        this.power_indicator.y = this.camera.height - 48;

        // if below death speed, the player is stranded so go to lose state
        if ( (this.carBody.body.velocity.x <= this.death_speed && this.power_indicator.width <= 10) && this.pusherCounter > 50 && !this.loseflag) {
            console.log("You're stranded");
            this.loseflag = true;
            this.speedUp_text.visible = false;
            this.slowDown_text.visible = false;
            this.stabilise_text.visible = false; 
            this.stranded_text.visible = true;
            this.loseStranded();
        }
        
        
        if (!this.isDead && !this.loseflag) {
            // set visibility of slowdown/speedup text
            this.slowDown_text.visible = (this.carBody.body.velocity.x >= this.max_speed);
            this.speedUp_text.visible = (this.carBody.body.velocity.x <= this.min_speed && this.pusherCounter > 50);

            // Check pod's angle, explode if out of bounds
            if ( this.carBody.body.angle < 50 && this.carBody.body.angle > -50) {
                this.stabilise_text.visible = false;  
            } else {
                this.stabilise_text.visible = true;  
            }

            if ( this.carBody.body.angle > 135 || this.carBody.body.angle < -135) {
                console.log('You exploded!');
                this.loseExplode();
            } 
        }


        // check if pod reached end
        if (this.carBody.body.x >= (this.levelLength + this.flatStartLength + this.flatEndLength - this.distanceFromEnd) & !this.winflag & !this.isDead) {
            this.winflag = true;
            this.game['GameData'].currentStageScore = this.carBody.body.x; // set current stage score to current score
            this.winStage();
        }

        //---------------------
        // Marker progress
        //---------------------
        // update marker on track progressor
        var ProgressMultiplier = this.carBody.x / (this.levelLength + this.flatStartLength + this.flatEndLength);
        if (ProgressMultiplier > 1) { ProgressMultiplier = 1; }
        this.trackProgressorMarker.cameraOffset.x = 120 + (ProgressMultiplier * 410);

        if (ProgressMultiplier != 1 && !this.loseflag) {
            
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
            pod_velcity = pod_velcity / 6; // could set this as a constant somewhere...pixels/meter
            pod_velcity = Math.floor(pod_velcity);
            this.Speed_text.setText(pod_velcity + ' m/s');

        } else if (this.loseflag) {
            this.Speed_text.setText('Signal Lost!');
            this.Speed_text.fontSize = 20;
        }

        // Snow
        if (this.is_snowing) {
            this.snow_var++;
            if (this.snow_var === this.update_interval) {
                this.changeWindDirection();
                update_interval = Math.floor(Math.random() * 20) * 60; // 0 - 20sec @ 60fps
                this.snow_var = 0;
            }
        }

        if (this.pusherCounter++ <= 50) {
            //this.pusherBody.body.force.x = 8000;
            this.carGroup.setAll('body.force.x', 4000);
        } else if (this.pusherCounter++ > 50 && this.pusherCounter <= 200) {
            //this.pusherBody.body.force.x = -50000;
        } else {
            this.showInstructions = false;
        }

        if (this.showInstructions) {
            this.instructions.visible = true;
        } else {
            this.instructions.visible = false;
        }
    },

    addTunnel: function (graphics) {
        var blockIndex = 0;
        var points = this.tunnelPhysicsData;
        var currentBlock = points['bottom'][blockIndex];
        var currentBlockTop = points['top'][blockIndex];

        //var polygonCollisionSprite = this.add.sprite(0, 0, 'wall');
        var polygonCollisionSprite = this.tunnelGroup.create(0, 0, 'wall');
        this.physics.p2.enable(polygonCollisionSprite);
        polygonCollisionSprite.name = 'wall_bot';
        polygonCollisionSprite.body.addPolygon({}, currentBlock.shape);
        polygonCollisionSprite.body.static = true;
        polygonCollisionSprite.body.debug = false;
        polygonCollisionSprite.body.setMaterial(this.groundMaterial);
        polygonCollisionSprite.body.setCollisionGroup(this.tube_collisionGroup);
        polygonCollisionSprite.body.collides(this.car_collisionGroup);
        
        var top_polygonCollisionSprite = this.tunnelGroup.create(0, 0, 'wall');
        this.physics.p2.enable(top_polygonCollisionSprite);
        top_polygonCollisionSprite.name = 'wall_top';
        top_polygonCollisionSprite.body.addPolygon({}, currentBlockTop.shape);
        top_polygonCollisionSprite.body.static = true;
        top_polygonCollisionSprite.body.debug = false;
        top_polygonCollisionSprite.body.setMaterial(this.groundMaterial);
        top_polygonCollisionSprite.body.setCollisionGroup(this.tube_collisionGroup);
        top_polygonCollisionSprite.body.collides(this.car_collisionGroup);

        this.tunnelPhysicsData['bottom'][blockIndex]['drawn'] = true; // make sure it doesn't get redrawn later*/


        //==================//
        // draw tube
        //==================//
        graphics.beginFill(0xAAAAAA, 0.1);

        var totalPoints = points['bottom'].length;

        graphics.beginFill(0xAAAAAA, 0.1);
        btm_prevx = points['bottom'][0]['shape'][4];
        btm_prevy = points['bottom'][0]['shape'][5];
        top_prevx = points['top'][0]['shape'][4];
        top_prevy = points['top'][0]['shape'][5];
        
        for (var i = 1; i < totalPoints; i++) {
            var btm_x = points['bottom'][i]['shape'][4],
                btm_y = points['bottom'][i]['shape'][5],
                top_x = points['top'][i]['shape'][4],
                top_y = points['top'][i]['shape'][5];

            // Solid gray background
            graphics.lineStyle(6, this.environment.tunnel_background_colour, 0);
            graphics.drawPolygon([btm_prevx, btm_prevy, top_prevx, top_prevy, top_x, top_y, btm_x, btm_y]);

            // Black outline
            graphics.lineStyle(6, this.environment.tunnel_colour, 1);
            graphics.moveTo(btm_prevx, btm_prevy);
            graphics.lineTo(btm_x, btm_y);
            graphics.moveTo(top_prevx, top_prevy);
            graphics.lineTo(top_x, top_y);
            btm_prevx = btm_x;
            btm_prevy = btm_y;
            top_prevx = top_x;
            top_prevy = top_y;
        }
    },

    addPickups: function (graphics) {
        var blockIndex = 0;
        var points = this.tunnelPhysicsData;
        var totalPoints = points['bottom'].length;

        btm_prevx = points['bottom'][0]['shape'][4];
        btm_prevy = points['bottom'][0]['shape'][5];
        
        for (var i = 1; i < totalPoints; i++) {
            var btm_x = points['bottom'][i]['shape'][4],
                btm_y = points['bottom'][i]['shape'][5];

            var pickup = this.add.sprite(btm_x, btm_y - 70, 'power_pickup');
            pickup.anchor.set(0.5, 0);
            pickup.scale.set(0.7, 0.7)

            btm_prevx = btm_x;
            btm_prevy = btm_y;
        }
    },

    addPylons: function () {
        var points = this.tunnelPhysicsData;
        var totalPylons = points['pylons'].length;
        for (var i = 0; i < totalPylons; i++) {
            var x = points['pylons'][i]['position'].x,
                y = points['pylons'][i]['position'].y;
            var pylon = this.add.sprite(x, y - this.tubeHeight - 20, 'pylon');
            //pylon.anchor.setTo(0.5, 0.1);
        }
    },

    updateTunnel: function () {

        var blockIndex = this.getBlockIndex();
        var advanceBlocks = 4;
        
        for (var i = 0; i <= advanceBlocks; i++) {
            blockIndex += i;
            var currentBlock = this.tunnelPhysicsData['bottom'][blockIndex];
            var currentBlockTop = this.tunnelPhysicsData['top'][blockIndex];

            if (currentBlock && !currentBlock['drawn']) {
        
                //var polygonCollisionSprite = this.add.sprite(0, 0, 'wall');
                var polygonCollisionSprite = this.tunnelGroup.create(0, 0, 'wall');
                this.physics.p2.enable(polygonCollisionSprite);
                polygonCollisionSprite.name = 'wall_bot';
                polygonCollisionSprite.body.addPolygon({}, currentBlock.shape);
                polygonCollisionSprite.body.static = true;
                polygonCollisionSprite.body.debug = false;
                polygonCollisionSprite.body.setMaterial(this.groundMaterial);
                polygonCollisionSprite.body.setCollisionGroup(this.tube_collisionGroup);
                polygonCollisionSprite.body.collides(this.car_collisionGroup);
                polygonCollisionSprite['blockIndex'] = blockIndex
                
                var top_polygonCollisionSprite = this.tunnelGroup.create(0, 0, 'wall');
                this.physics.p2.enable(top_polygonCollisionSprite);
                top_polygonCollisionSprite.name = 'wall_top';
                top_polygonCollisionSprite.body.addPolygon({}, currentBlockTop.shape);
                top_polygonCollisionSprite.body.static = true;
                top_polygonCollisionSprite.body.debug = false;
                top_polygonCollisionSprite.body.setMaterial(this.groundMaterial);
                top_polygonCollisionSprite.body.setCollisionGroup(this.tube_collisionGroup);
                top_polygonCollisionSprite.body.collides(this.car_collisionGroup);
                top_polygonCollisionSprite['blockIndex'] = blockIndex

                //==================//
                // add physics
                //==================//s
                this.carBody.body.collides(this.tube_collisionGroup);
                this.wheel_front.body.collides(this.tube_collisionGroup);
                this.wheel_back.body.collides(this.tube_collisionGroup);

                currentBlock['drawn'] = true;

            }
        }

        // clean up
        this.tunnelGroup.forEach(function(child){
            //console.log(child)
            if (!isNaN(child.x)) {
                //console.log("child:", child.x, ", camera:", this.camera.x)
                if (child.x < (this.camera.x - 2800) && !child.inCamera) {

                    child.destroy();
                }
            } else {
                //console.log(child.blockIndex)
            }
        }, this, false)

        //console.log(this.tunnelGroup)

    },

    getBlockIndex: function () {
        var blocks = this.tunnelPhysicsData['bottom'];
        var position = this.carBody.x
        var length = blocks.length;
        var diffMidIndex;

        function mid(minIndex, maxIndex) { // left/right array index
            var diffIndex = maxIndex + minIndex
            diffMidIndex = (diffIndex%2 == 0) ? (diffIndex / 2) : ( ((diffIndex - 1) / 2)); // handle odd/even array length
            midPosWorld = blocks[diffMidIndex]['shape'][2];

            if (diffIndex == 1 || diffIndex == 2 || position === midPosWorld || minIndex === diffMidIndex) {
                return diffMidIndex;
            } else if ( position > midPosWorld ) {
                return mid( diffMidIndex, maxIndex);
            } else if ( position < midPosWorld ){
                return mid( minIndex, diffMidIndex);
            }
        }
        return mid(0, length-1);
    },

    getBlocks: function () {
        return Math.floor( (this.levelLength + this.flatStartLength + this.flatEndLength) / this.pixelStep );
    },

    generateBlock: function () {

    },

    changeWindDirection: function () {

        var multi = Math.floor((this.max + 200) / 4),
                    frag = (Math.floor(Math.random() * 100) - multi);
        this.max = this.max + frag;

        if (this.max > 200) this.max = 150;
        if (this.max < -200) this.max = -150;

        this.setXSpeed(this.back_emitter, this.max);
        this.setXSpeed(this.mid_emitter, this.max);
        this.setXSpeed(this.front_emitter, this.max);

    },

    setXSpeed: function (emitter, max) {

        emitter.setXSpeed(max - 20, max);
        emitter.forEachAlive(this.setParticleXSpeed, this, max);

    },

    setParticleXSpeed: function (particle, max) {

        particle.body.velocity.x = max - Math.floor(Math.random() * 30);

    },

    addBackground: function () {
        var environmentBackground = this.environment['background'];
        var backgroundGroup = this.background = this.add.group();
        for (var key in environmentBackground) {
            if (environmentBackground.hasOwnProperty(key)) {
                if (environmentBackground[key].type === "unique") {

                    var unique = backgroundGroup.create(environmentBackground[key].position.x, environmentBackground[key].position.y, environmentBackground[key].texture);
                    unique.fixedToCamera = environmentBackground[key].fixedToCamera;

                } else if (environmentBackground[key].type === "unique_randomized") {

                    var textures = environmentBackground[key].textures;
                    var texture_index = Math.floor(textures.length*Math.random());
                    var texture_name = textures[texture_index];
                    var unique = backgroundGroup.create(environmentBackground[key].position.x, environmentBackground[key].position.y, texture_name);
                    unique.fixedToCamera = environmentBackground[key].fixedToCamera;
                
                }
            }
        }
    },

    addMidground: function () {
        
        var environmentMidground = this.environment['midground'];
        var midgroundGroup = this.midground = this.add.group();
        for (var key in environmentMidground) {
            if (environmentMidground.hasOwnProperty(key)) {

                if (environmentMidground[key].type === "unique") {

                    midgroundGroup.create(environmentMidground[key].position.x, environmentMidground[key].position.y, environmentMidground[key].texture);

                } else if (environmentMidground[key].type === "repeat") {

                    var tileable = this.add.tileSprite(environmentMidground[key].position.x, environmentMidground[key].position.y, this.camera.width, this.cache.getImage(environmentMidground[key].texture).height, environmentMidground[key].texture);
                    tileable.fixedToCamera = true;
                    tileable.tileScale = { "x": environmentMidground[key].tileScale.x, "y": environmentMidground[key].tileScale.y };
                    tileable.tilePosition = { "x": environmentMidground[key].tilePosition.x, "y": environmentMidground[key].tilePosition.y };

                    // need to pass some data to the update function so store it on the object
                    tileable['parallax'] = environmentMidground[key].parallax;
                    tileable['offset'] = environmentMidground[key].tilePosition;
                    tileable['velocity'] = environmentMidground[key].velocity;
                    midgroundGroup.add(tileable);

                } else if (environmentMidground[key].type === "repeat_unique_randomized") {

                    var group = this.add.group();
                    var textures = environmentMidground[key].textures;
                    var anchors = environmentMidground[key].anchors;
                    var total_instances = (this.levelLength * (environmentMidground[key].parallax + 1))/environmentMidground[key].position_offset.x;
                    var instance_position = environmentMidground[key].position;
                    
                    for (var i = 0; i < total_instances; i++) {
                        var offset = environmentMidground[key].position_offset.x * (environmentMidground[key].position_random_factor.x*Math.random());
                        instance_position.x += offset;
                        var texture_index = Math.floor(textures.length*Math.random());
                        var texture_name = textures[texture_index];

                        var sprite_instance = this.add.sprite( instance_position.x , environmentMidground[key].position.y, texture_name ); // choose random texture from "textures" array
                        sprite_instance.anchor.set(environmentMidground[key].anchors[texture_index].x, environmentMidground[key].anchors[texture_index].y)
                        group.add(sprite_instance);
                    }
                    group['parallax'] = environmentMidground[key].parallax;
                    group['offset'] = offset;
                    group['velocity'] = environmentMidground[key].velocity;

                    midgroundGroup.add(group);

                } else if (environmentMidground[key].type === "unique_randomized") {
                    var textures = environmentMidground[key].textures;
                    var texture_index = Math.floor(textures.length*Math.random());
                    var texture_name = textures[texture_index];
                    midgroundGroup.create(environmentMidground[key].position.x, environmentMidground[key].position.y, texture_name);
                }

            }

        }
    },
    addForeground: function () {
        this.foreground = this.add.group();
    },
    generateTubePoints: function (numberOfHills, start_y, hill_max_height, tube_length, tube_height, pixelStep) {
        var hillStartY = start_y,
            hillWidth = tube_length / numberOfHills,
            hillSlices = hillWidth / pixelStep,
            tunnelPhysicsData = { "top": [], "bottom": [], "pylons": [] },
            prevx,
            prevy;  

        // Generate flat at beginning
        var rect = {
            "density": 2, "friction": 0, "bounce": 0,
            "filter": { "categoryBits": 1, "maskBits": 65535 },
            "shape": [this.flatStartLength, hillStartY + 100, 0, hillStartY + 100, 0, hillStartY, this.flatStartLength, hillStartY]
        };
        tunnelPhysicsData['bottom'].push(rect);

        var topRect = {
            "density": 2, "friction": 0, "bounce": 0,
            "filter": { "categoryBits": 1, "maskBits": 65535 },
            "shape": [this.flatStartLength, hillStartY - tube_height - 100, this.flatStartLength, hillStartY - tube_height, 0, hillStartY - tube_height, 0, hillStartY - tube_height - 100]
        };
        tunnelPhysicsData['top'].push(topRect);

        prevx = this.flatStartLength;
        prevy = start_y;

        for (var i = 0; i < numberOfHills; i++) {
            var randomHeight = Math.random() * 78.5;
            // this is necessary to make all hills (execept the first one) begin where the previous hill ended
            if (i == 0) {
                hillStartY = prevy - randomHeight;
            } else {
                hillStartY -= randomHeight;
            }

            // looping through hill slices
            for (var j = 0; j <= hillSlices; j++) {
                var x = j * pixelStep + hillWidth * i + this.flatStartLength,
                    y = hillStartY + randomHeight * Math.cos(2 * Math.PI / hillSlices * j),
                    height = y - prevy,
                    length = Math.sqrt((pixelStep * pixelStep) + (height * height)),
                    hillPoint = { "x": x, "y": y },
                    angle = Math.atan2(y - prevy, x - prevx)

                var rect = {
                    "density": 2, "friction": 0, "bounce": 0,
                    "filter": { "categoryBits": 1, "maskBits": 65535 },
                    "shape": [prevx, hillPoint.y + 100, prevx, prevy, hillPoint.x, hillPoint.y, hillPoint.x, hillPoint.y + 100]
                };
                tunnelPhysicsData['bottom'].push(rect);

                var topRect = {
                    "density": 2, "friction": 0, "bounce": 0,
                    "filter": { "categoryBits": 1, "maskBits": 65535 },
                    "shape": [prevx, hillPoint.y - tube_height - 100, hillPoint.x, hillPoint.y - tube_height - 100, hillPoint.x, hillPoint.y - tube_height, prevx, prevy - tube_height]
                    //"shape": [prevx, hillPoint.y - tube_height, prevx, hillPoint.y - tube_height - 10, hillPoint.x, hillPoint.y - tube_height-10, hillPoint.x, hillPoint.y - tube_height]
                };
                tunnelPhysicsData['top'].push(topRect);

                prevx = x;
                prevy = y;
            }
            tunnelPhysicsData['pylons'].push({ position: { "x": prevx, "y": prevy } });

            // this is also necessary to make all hills (execept the first one) begin where the previous hill ended
            hillStartY = hillStartY + randomHeight;
        }

        //prevx += pixelStep;

        // Generate flat at end
        var rect = {
            "density": 2, "friction": 0, "bounce": 0,
            "filter": { "categoryBits": 1, "maskBits": 65535 },
            "shape": [prevx, prevy + 100, prevx, prevy, prevx + this.flatEndLength, prevy, prevx + this.flatEndLength, prevy + 100]
        };
        tunnelPhysicsData['bottom'].push(rect);

        var topRect = {
            "density": 2, "friction": 0, "bounce": 0,
            "filter": { "categoryBits": 1, "maskBits": 65535 },
            "shape": [prevx, prevy - tube_height - 100, prevx + this.flatEndLength, prevy - tube_height - 100, prevx + this.flatEndLength, prevy - tube_height, prevx, prevy - tube_height]
        };
        tunnelPhysicsData['top'].push(topRect);

        return tunnelPhysicsData;
    },

    render: function () {
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
    },

    resize: function (width, height) {
        //this.menuButton.x = 25;
        //this.menuButton.y = 25;
    },

    handleInput: function () {
        if (this.cursors.up.isDown) {
            if (this.power_indicator.width > 10) {
                this.power_indicator.width -= 1;
                this.carGroup.setAll('body.force.x', 7000);
                if (this.power_indicator.width > 80) {
                    this.power_indicator.tint = 0x008a00;
                } else if (this.power_indicator.width > 50) {
                    this.power_indicator.tint = 0xFF9900;    
                } else if (this.power_indicator.width > 20) {
                    this.power_indicator.tint = 0xFF0000;    
                }
            } else {
                this.power_indicator.width = 5;
                this.power_indicator.tint = 0xFF0000;
            }
        }

        if (this.cursors.down.isDown) {
            this.carGroup.setAll('body.velocity.x', this.carBody.body.velocity.x*0.98);
        }
        if (this.carBody.body.velocity.x < 0) {
            this.carBody.body.velocity.x = 0;
        }

        if (this.cursors.right.isDown) {
            this.carBody.body.angularVelocity = 2;
        }
        if (this.cursors.left.isDown) {
            this.carBody.body.angularVelocity = -2;
        }
        
    },
    
    togglePauseGame: function (pointer) {
        this.sound_click.play();
        var res = true;
        this.sound_music.pause();
        if (this.game.paused) {
            res = false;
            this.sound_music.resume()
        }
        this.game.paused = res;
        this.pause_text.visible = res;
    },

    toggleMuteAudio: function(pointer) {
        if (this.sound_muted) {
            this.sound_click.play();
            this.sound_muted = false;
            this.sound_music.volume = this.music_volume;
            this.sound_explosion.volume = this.sound_volume;
            this.sound_hit1.volume = this.sound_volume;
            this.sound_hit2.volume = this.sound_volume;
            this.sound_hit3.volume = this.sound_volume;
            this.muteButton.loadTexture('mute_button');
        } else {
            this.sound_click.play();
            this.sound_music.volume = 0;
            this.sound_explosion.volume = 0;
            this.sound_hit1.volume = 0;
            this.sound_hit2.volume = 0;
            this.sound_hit3.volume = 0;
            this.sound_muted = true;
            this.muteButton.loadTexture('mute_button_muted');
        }
    },

    quitGame: function (pointer) {

        //	Here you should destroy anything you no longer need.
        //	Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.sound_click.play();
        this.sound_music.stop();
        this.state.start('MainMenu');
    },

    restartGame: function (pointer) {
        clearTimeout(this.winTimeout);
        clearTimeout(this.loseTimeout);
        this.sound_music.stop();
        this.state.start('Game');
    },

    loseStranded: function (pointer) {
        this.lose();
    },

    loseExplode: function (pointer) {
        this.explode();
        this.lose();
    },

    lose: function (pointer) {
        this.game['GameData'].currentStageScore = this.carBody.body.x; // set current stage score to current score
        this.loseflag = true;
        this.instructions.visible = false;
        this.stabilise_text.visible = false;  
        this.speedUp_text.visible = false;
        this.slowDown_text.visible = false;


        this.loseTimeout = setTimeout(function (state, music) {
            music.stop();
            state.start('Lose');
        }, 2000, this.state, this.sound_music);
    },

    explode: function (pointer) {
        this.sound_explosion.play();
        this.carBody.body.velocity.x = 0;
        this.carBody.body.velocity.y = 0;
        this.carBody.loadTexture('kaboom');
        this.carBody.scale.set(1, 1);
        this.carBody.animations.add('kaboom');
        this.carBody.animations.play('kaboom', 30, false, false); //play(name, frameRate, loop, killOnComplete) 
        this.isDead = true;
    },

    winStage: function (pointer) {
        console.log("You won the stage!")

        this.sound_music.stop();

        this.game['GameData'].cLevel += 1;
        this.game['GameData'].playedBefore = true;
        this.instructions.visible = false;
        this.winStage_graphic = this.add.sprite(this.camera.x + this.camera.width / 2, this.camera.y + this.camera.height / 2, 'win_stage');
        this.winStage_graphic.anchor.set(0.5, 0.5);

        var stageScore = this.carBody.body.x;
        this.game['GameData'].currentStageScore = stageScore;
        this.game['GameData'].score += stageScore; 

        this.winTimeout = setTimeout(function (state) {
            // this.winflag = false;
            // this.pusherCounter = 0;
            state.start('Game')
        }, 3000, this.state);
        

    },

    win: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        console.log("go back to win screen")
        this.state.start('Win');

    },

    podCollision: function (body, bodyB, shapeA, shapeB, equation) {
        if (/*!this.loseflag ||*/ !this.isDead) {
            var damage = Math.abs(body.velocity.y) / 500;
            if (damage < .01) { damage = .01; }
            this.carBody.health -= damage;
            if (this.carBody.health > 0) {
                if (this.carBody.health < 20) {
                    this.sound_hit1.play();
                } else if (this.carBody.health < 50) {
                    this.sound_hit2.play();
                } else if (this.carBody.health <= 100) {
                    this.sound_hit3.play();
                }
                console.log('Colision! rPod Health is ' + this.carBody.health);
            } else {
                // if (!this.loseflag && !this.winflag) {
                    console.log('You exploded!');
                    this.loseExplode();
                // }
            }
            var health_percentage = Math.round(this.carBody.health * 100);
            if (health_percentage < 0) { health_percentage = 0; }
            //this.Health_text.setText('Health: ' + health_percentage + '%');
            this.Health_indicator.scale.set(health_percentage,1)
        } else {
            //this.Health_text.setText('Health: 0%');
        }
    },

    addCar: function () {
                console.log("add car")
        // basic settings
        var startPos = this.startPos;
        startPos.y += -20;
        var wheel_front_pos = [55, 7];
        var wheel_back_pos = [-55, 7];

        // create pod
        var carBody = this.add.sprite(startPos.x, startPos.y, 'pod'); //CARBODY
        carBody.anchor.set(0.5, 0.5);
        carBody.name = 'carBody';
        carBody.scale.set(0.5, 0.5);

        var wheel_front = this.add.sprite(startPos.x + wheel_front_pos[0], startPos.y + wheel_front_pos[1]); //FRONT WHEEL
        wheel_front.anchor.set(0.5, 0.5);
        wheel_front.name = 'wheel_front';
        var wheel_back = this.add.sprite(startPos.x + wheel_back_pos[0], startPos.y + wheel_back_pos[1]); //BACK WHEEL 
        wheel_back.anchor.set(0.5, 0.5);
        wheel_back.name = 'wheel_back';

        

        this.physics.p2.enable([wheel_front, wheel_back, carBody]);

        //carBody.body.addRectangle(50, 20) // use simple rectangle for performance reasons
        carBody.body.addPolygon({}, [1, 20, 1, 11, 16, 1, 94, 1, 113, 11, 125, 20, 128, 26, 116, 31, 106, 32, 94, 40, 20, 42, 13, 40, 10, 31]);
        carBody.body.debug = false; //this adds the pink box
        carBody.body.mass = 1;
        carBody.body.angle = 0;
        carBody.body.setMaterial(this.playerMaterial);
        carBody.body.setCollisionGroup(this.car_collisionGroup);

        wheel_front.body.setCircle(10);
        wheel_front.body.debug = false;
        wheel_front.body.mass = 1;
        wheel_front.body.setMaterial(this.wheelMaterial);
        wheel_front.renderable = false;
        wheel_front.body.setCollisionGroup(this.car_collisionGroup);

        wheel_back.body.setCircle(10);
        wheel_back.body.debug = false;
        wheel_back.body.mass = 1;
        wheel_back.body.setMaterial(this.wheelMaterial);
        wheel_back.renderable = false;
        wheel_back.body.setCollisionGroup(this.car_collisionGroup);

        // create car group
        this.carGroup = this.add.group();
        this.carGroup.add(carBody);
        this.carGroup.add(wheel_front);
        this.carGroup.add(wheel_back);

        // originals
        // var spring = this.physics.p2.createSpring(carBody, wheel_front, 111, 600, 200, null, null, wheel_front_pos, null);
        // var spring_1 = this.physics.p2.createSpring(carBody, wheel_back, 111, 750, 200, null, null, wheel_back_pos, null);

        //  The parameters are: createSpring(sprite1, sprite2, restLength, stiffness, damping, worldA, worldB, localA, localB)
        var spring = this.physics.p2.createSpring(carBody, wheel_front, 75, 120, 10, null, null, null, null);
        var spring_1 = this.physics.p2.createSpring(carBody, wheel_back, 75, 120, 10, null, null, null, null);

        var constraint = this.physics.p2.createPrismaticConstraint(carBody, wheel_front, false, wheel_front_pos, [0, 0], [0, 1]);
        constraint.lowerLimitEnabled = constraint.upperLimitEnabled = true;
        constraint.upperLimit = -1;
        constraint.lowerLimit = -30;

        var constraint_1 = this.physics.p2.createPrismaticConstraint(carBody, wheel_back, false, wheel_back_pos, [0, 0], [0, 1]);
        constraint_1.lowerLimitEnabled = constraint_1.upperLimitEnabled = true;
        constraint_1.upperLimit = -1;
        constraint_1.lowerLimit = -30;

        this.carBody = carBody;
        this.wheel_front = wheel_front;
        this.wheel_back = wheel_back;
    },

    addPusher: function () {

        // basic settings
        var startPos = this.startPos;
        var wheel_front_pos = [50, 10];
        var wheel_back_pos = [-50, 10];

        var pusher_start_x = startPos.x-150;

        // create pod
        var carBody = this.add.sprite(pusher_start_x, startPos.y, 'pusher'); //CARBODY
        carBody.name = 'carBody';
        carBody.scale.set(0.5, 0.5);

        var wheel_front = this.add.sprite(pusher_start_x + carBody.width / 2 + wheel_front_pos[0], startPos.y + carBody.height / 2 + wheel_front_pos[1]); //FRONT WHEEL
        wheel_front.name = 'wheel_front';
        var wheel_back = this.add.sprite(pusher_start_x + carBody.width / 2 + wheel_back_pos[0], startPos.y + carBody.height / 2 + wheel_back_pos[1]); //BACK WHEEL 
        wheel_front.name = 'wheel_back';

        this.pusher_collisionGroup = this.physics.p2.createCollisionGroup();

        this.physics.p2.enable([wheel_front, wheel_back, carBody]);

        carBody.body.addPolygon({}, [6, 0, 83, 1, 100, 12, 99, 21, 88, 42, 6, 42]);
        carBody.body.debug = false; //this adds the pink box
        carBody.body.mass = 30;
        carBody.body.angle = 0;
        carBody.body.setMaterial(this.playerMaterial);
        carBody.body.setCollisionGroup(this.pusher_collisionGroup);

        wheel_front.body.setCircle(20);
        wheel_front.body.debug = false;
        wheel_front.body.mass = 1;
        wheel_front.body.setMaterial(this.wheelMaterial);
        wheel_front.renderable = false;
        wheel_front.body.setCollisionGroup(this.pusher_collisionGroup);

        wheel_back.body.setCircle(20);
        wheel_back.body.debug = false;
        wheel_back.body.mass = 1;
        wheel_back.body.setMaterial(this.wheelMaterial);
        wheel_back.renderable = false;
        wheel_back.body.setCollisionGroup(this.pusher_collisionGroup);

        var spring = this.physics.p2.createSpring(carBody, wheel_front, 111, 600, 200, null, null, wheel_front_pos, null);
        var spring_1 = this.physics.p2.createSpring(carBody, wheel_back, 111, 750, 200, null, null, wheel_back_pos, null);

        var constraint = this.physics.p2.createPrismaticConstraint(carBody, wheel_front, false, wheel_front_pos, [0, 0], [0, 1]);
        constraint.lowerLimitEnabled = constraint.upperLimitEnabled = true;
        constraint.upperLimit = -.1;
        constraint.lowerLimit = -10;

        var constraint_1 = this.physics.p2.createPrismaticConstraint(carBody, wheel_back, false, wheel_back_pos, [0, 0], [0, 1]);
        constraint_1.lowerLimitEnabled = constraint_1.upperLimitEnabled = true;
        constraint_1.upperLimit = -.1;
        constraint_1.lowerLimit = -10;

        this.pusherBody = carBody;
        this.pusher_wheel_front = wheel_front;
        this.pusher_wheel_back = wheel_back;
    }

};
