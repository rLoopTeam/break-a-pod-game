
BasicGame.LevelGenerator = function (game) {

    this.menuButton;
    this.cursors;

    this.player;
    this.playerCollisionGroup;
    this.tunnelCollisionGroup;
};

BasicGame.LevelGenerator.prototype = {

	create: function () {
        //gametime
        this.game.time.advancedTiming = true;

        console.log("game started")
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 300;
        this.game.physics.p2.restitution = 0.8;

        //control
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // GUI buttons
        //this.menuButton = this.add.button(25, 25, 'button_normal', this.quitGame, this, 'button_hover', 'button_normal', 'button_hover');

        // world
        this.stage.backgroundColor = "#0c9fc7";
        
        // set world size
        this.world.setBounds(0, 0, 20000, 500);

        // player
        // this.playerCollisionGroup = this.physics.p2.createCollisionGroup();
        this.player = this.add.sprite(32, this.world.height / 2, 'pod');
        this.physics.p2.enable(this.player);

        // this.physics.p2.enable(this.player, false);
        // this.player.body.fixedRotation = false;

        // this.player.body.setCollisionGroup(this.playerCollisionGroup);

        //tunnel
        // this.tunnelCollisionGroup = this.physics.p2.createCollisionGroup();
        // this.tunnel = this.add.group();
        // this.tunnel.enableBody = true;
        // this.tunnel.physicsBodyType = Phaser.Physics.P2JS;

        // generate graphics
        var graphics = this.game.add.graphics(0, 0);
        this.drawHills(graphics, this.tunnel, 5, 15);
        
        window.graphics = graphics;
	},

	update: function () {
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

    drawHills: function(graphics, group, numberOfHills, pixelStep) {
        try{
            var hillStartY  = 400+Math.random()*200,
                hillWidth   = 640/numberOfHills,
                hillSlices  = hillWidth/pixelStep,
                prevx,
                prevy;
    
            graphics.lineStyle(6,0xAAAAAA, 0.8);
            graphics.beginFill(0xFF700B, 1);
            graphics.moveTo(0,480);

            for (var i = 0; i < numberOfHills; i++) {
                var randomHeight = Math.random()*100;
                // this is necessary to make all hills (execept the first one) begin where the previous hill ended
                if (i!=0) {
                    hillStartY -= randomHeight;
                }
                // looping through hill slices
                for (var j = 0; j <= hillSlices; j++) {
                        // defining the point of the hill
                        var x           = j * pixelStep + hillWidth * i,
                            y           = hillStartY + randomHeight * Math.cos(2*Math.PI/hillSlices*j),
                            height      = y - prevy,
                            length      = Math.sqrt((pixelStep*pixelStep) + (height*height)),
                            hillPoint   = {"x": x, "y": y},
                            angle       = Math.atan2(y - prevy, x - prevx);

                            //soh cah toa

                        // drawing stuff
                        graphics.lineTo(hillPoint.x, hillPoint.y);

                        var newRect = this.add.sprite(x, y, 'wall', 0);
                        newRect.scale.setTo(length, 10);
                        this.physics.p2.enable(newRect, true);
                        newRect.anchor.setTo(1, 0.5);
                        newRect.body.clearShapes();
                        newRect.body.addRectangle(length, 10, -length/2, 0);
                        newRect.body.static = true;
                        newRect.body.rotation = angle;

                        graphics.moveTo(hillPoint.x, hillPoint.y);

                        prevx = x;
                        prevy = y;
                }
                // this is also necessary to make all hills (execept the first one) begin where the previous hill ended
                hillStartY = hillStartY + randomHeight;
            }
            graphics.lineTo(640,480);
            graphics.endFill();
        } catch(e) {
            console.log(e);
        }
    }

};

// package {
//     import flash.display.Sprite;
//     import flash.geom.Point;
//     import flash.events.MouseEvent;
//     public class Main extends Sprite {
//         public function Main() {
//             drawHills(2,10);
//             stage.addEventListener(MouseEvent.CLICK,mouseClicked);
//         }
//         private function mouseClicked(e:MouseEvent):void{
//             graphics.clear();
//             drawHills(2,10);
//         }
//         // this is the core function: drawHills
//         // arguments: the number of hills to generate, and the horizontal step, in pixels, between two hill points
//         private function drawHills(numberOfHills:int,pixelStep:int):void{
//             // setting a starting y coordinate, around the vertical center of the stage
//             var hillStartY:Number=140+Math.random()*200;
//             // defining hill width, in pixels, that is the stage width divided by the number of hills
//             var hillWidth:Number=640/numberOfHills;
//             // defining the number of slices of the hill. This number is determined by the width of the hill in pixels divided by the amount of pixels between two points
//             var hillSlices=hillWidth/pixelStep;
//             // drawing stuff
//             graphics.lineStyle(0,0xAAAAAA);
//             graphics.moveTo(0,480);
//             // looping through the hills
//             for (var i:int=0; i<numberOfHills; i++) {
//                 // setting a random hill height in pixels
//                 var randomHeight:Number=Math.random()*100;
//                 // this is necessary to make all hills (execept the first one) begin where the previous hill ended
//                 if(i!=0){
//                     hillStartY-=randomHeight;
//                 }
//                 // looping through hill slices
//                 for (var j:int=0; j<=hillSlices; j++) {
//                         // defining the point of the hill
//                         var hillPoint:Point=new Point(j*pixelStep+hillWidth*i,hillStartY+randomHeight*Math.cos(2*Math.PI/hillSlices*j))
//                         // drawing stuff
//                         graphics.lineTo(hillPoint.x,hillPoint.y);
//                         graphics.lineTo(hillPoint.x,480);
//                         graphics.moveTo(hillPoint.x,hillPoint.y);
//                 }
//                 // this is also necessary to make all hills (execept the first one) begin where the previous hill ended
//                 hillStartY = hillStartY+randomHeight;
//             }
//             graphics.lineTo(640,480);
//         }
//     }
// }