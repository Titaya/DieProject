/**
 /**
 * Level3 state.
 */
function Level3() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level3.prototype = proto;

Level3.prototype.create = function() {

	this.music = this.add.sound("music",1,true);
	this.music.allowMultiple=true;
	this.music.play();
	this.music1 = this.add.sound("fs",1,false);
	this.music1.allowMultiple=true;
	this.music2 = this.add.sound("winner",0.5,false);
	this.music2.allowMultiple=true;
	this.music3 = this.add.sound("loser",0.5,false);
	this.music3.allowMultiple=true;
	
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000; 
	
	this.cursor = this.input.keyboard.createCursorKeys();
	this.bg = this.game.add.sprite(0, 0, "bg1");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	this.map = this.game.add.tilemap("map3");
	this.map.addTilesetImage('pmap3');
	this.maplayer = this.map.createLayer("Tile Layer 1");
	this.maplayer.resizeWorld();
	this.map.setCollisionBetween(0,100,true,this.maplayer);
	
	//this.game.camera.follow(this.addKahang(), Phaser.Camera);
	
	/*this.girl5= this.addPlayer(200,700);

	this.girl5.play("walk");*/
	//this.game.camera.follow(this.player)
this.enemies = this.add.group();
this.item = this.add.group();
	for(x in this.map.objects.object){
		 var obj = this.map.objects.object[x];
		 if(obj.type == "player"){
         console.log(this.player);            
         this.player = this.addPlayer(obj.x,obj.y);           
         this.player.play("idle"); 
         this.player.scale.set(0.3);
		 this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
		 }else if(obj.type=="enemy1"){
		 var c = this.addEnemy1(obj.x,obj.y);
		 this.enemies.add(c);
		// this.c.animations.add("walk").play(4,true);
		 }else if(obj.type=="enemy2"){
		 var c = this.addEnemy2(obj.x,obj.y);
		 this.enemies.add(c);
		 //this.c.animations.add("walk").play(4,true);
		 }else if(obj.type=="enemy3"){
		var c = this.addEnemy3(obj.x,obj.y);
		this.enemies.add(c);
		//this.c.animations.add("walk").play(4,true);
		}else if(obj.type=="item"){
		var c = this.addItem(obj.x,obj.y);
		this.item.add(c);
			}
		 }
	
	this.Boss = this.createBoss();
	Boss.fixedToCamera = true;
	this.add.tween(this.Boss.cameraOffset).to( {x : 1000}, 1000, "Linear", true, 0, Number.MAX_VALUE, true);
	
	this.Time = this.addTime();
	Time.fixedToCamera = true;
	
	this.Lost= this.addLost();
	Lost.fixedToCamera = true;
	Lost.visible=false;

	this.time.events.add(360000,this.Timeout,this);
	
	this.Win= this.addWin();
	Win.fixedToCamera = true;
	Win.visible=false;
	
	this.createWeapon();
	this.player.hpP = 3;
	this.hpP = [];
	for(var i=0;i<this.player.hpP;i++){
		
		this.hpP[i] = this.add.sprite(1200-(50*i),20,"HpP");
		this.hpP[i].fixedToCamera = true;
		this.hpP[i].anchor.set(0.5);
		//this.hpP[i].animations.add("all").play(12,true);	
	}
	
	this.Boss.hpE = 5;
	this.hpE = [];
	for(var i=0;i<this.Boss.hpE;i++){
		
		this.hpE[i] = this.add.sprite(750-(50*i),1150,"HpE");
		this.hpE[i].fixedToCamera = true;
		this.hpE[i].anchor.set(0.5);
		//this.hpP[i].animations.add("all").play(12,true);	
	}
	this.input.keyboard.addKeyCapture([
	                               	Phaser.Keyboard.LEFT,
	                               	Phaser.Keyboard.RIGHT,
	                               	Phaser.Keyboard.SPACEBAR,
	                               	Phaser.Keyboard.X
	                               	]);
	this.player.inputEnabled = true;
	//this.player.events.onInputDown.add(this.fireWeapon, this);
	this.num = 0;
	/*lose = this.add.text(this.world.centerX,this.world.centerY,"You Lose  \n Click to Menu",{ fill: 'Red'});
	lose.anchor.set(0.5,0.5);
	lose.scale.set(5);
	lose.visible = false;
	var lost = this.add.image(this.world.centerX,this.world.centerY,"lost");
	lost.anchor.set(0.5, 0.5);
	lost.scale.set(1.5);*/
	
	
};



Level3.prototype.update = function() {
	//if(this.gameover) return;
	this.game.physics.arcade.collide(this.player,this.maplayer);
	this.game.physics.arcade.collide(this.enemies,this.maplayer);
	this.game.physics.arcade.collide(this.item,this.maplayer);
	var cursor = this.input.keyboard.createCursorKeys();
    if( this.cursor.left.isDown ) {
        this.player.body.velocity.x = -100;
    	this.player.play("walk");
    	this.player.scale.x = -0.3;
      } 
    else if( this.cursor.right.isDown ) {
        this.player.body.velocity.x = 100;
    	this.player.play("walk");
    	this.player.scale.x = 0.3;
      }
    else {
        this.player.body.velocity.x = 0;
        this.player.play("idle");
      }

  
  if( this.cursor.up.isDown  && this.player.body.velocity.y == 0 ) {
	  	this.player.body.velocity.y = -1000;
    	this.player.body.velocity.x = 0.3;
    	this.player.play("jump");
    	 if( this.cursor.left.isDown ) {
 	        this.player.body.velocity.x = -300;
 	    	this.player.scale.x = -0.3;
 	      } 
 	    else{
 	        this.player.body.velocity.x = 300;
 	    	this.player.scale.x = 0.3;
 	      } 
  } 
  	this.physics.arcade.collide(this.Boss,this.weapon1.bullets,this.BossonCollidebullet,null,this);
	this.physics.arcade.collide(this.player,this.Boss,this.playerColideBoss,null,this);
	this.physics.arcade.collide(this.player,this.enemies,this.playerColideEnemies,null,this);
	this.physics.arcade.collide(this.player,this.item,this.playerColideItem,null,this);
	
	
	
	if(this.num > 0){
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
	  		this.fireWeapon();
	  		this.num--;
			} 
	}

	

	};
	
Level3.prototype.addTime = function(){
		Time = this.add.sprite(50,-150,"Time");
		Time.anchor.set(0,0);
		Time.scale.set(15);
		Time.animations.add("go").play(0.09,false);
		Time.smoothed = false;
		//this.add.tween(boss1).to( { y: '-10000' }, 140000, Phaser.Easing.Linear.None, true);
		return Time;

		};
		
Level3.prototype.addLost = function(){
	Lost = this.add.image(700,600,"lost", null);
	Lost.anchor.set(0.5, 0.5);
	Lost.scale.set(2);
	Lost.smoothed = false;
	Lost.inputEnabled = true;
	Lost.events.onInputDown.add(this.quitLost,this);

	//this.add.tween(boss1).to( { y: '-10000' }, 140000, Phaser.Easing.Linear.None, true);
	return Lost;
};	
Level3.prototype.Timeout = function(){
	this.music.stop();
	this.music3.play();
	this.update(this.Lost.visible=true);
	
};	
Level3.prototype.addWin = function(){
	Win = this.add.image(700,600,"win", null);
	Win.anchor.set(0.5, 0.5);
	Win.scale.set(2);
	Win.smoothed = false;
	Win.inputEnabled = true;
	Win.events.onInputDown.add(this.quitWin,this);

		//this.add.tween(boss1).to( { y: '-10000' }, 140000, Phaser.Easing.Linear.None, true);
		return Win;

	};	
	

Level3.prototype.addPlayer = function(x,y) {
	var g = this.add.sprite(x,y,"chara");
	g.animations.add("attack",gframes("attack",11),12,true);
	g.animations.add("idle",gframes("idle",11),12,true);
	g.animations.add("jump",gframes("jump",11),12,true);
	g.animations.add("walk",gframes("walk",11),12,true);
	
	g.anchor.set(0.5,1);
	g.smoothed = false;
	this.game.physics.enable(g);
	g.body.collideWorldBounds = true;
	g.body.drag.setTo(500, 0);
	g.smoothed = false;
	//g.body.setSize(40,80,10,15);
	return g;
	
	};
Level3.prototype.addEnemy1 = function(x,y){
		c = this.add.sprite(x, y, "e1");
		c.anchor.set(0.5,1);
		c.animations.add("walk").play(4,true);
		 this.game.physics.enable(c);
		 c.body.collideWorldBounds = true;
		return c;

	};

Level3.prototype.addEnemy2 = function(x,y){
		c = this.add.sprite(x, y, "e2");
		c.animations.add("walk").play(4,true);
		c.anchor.set(0.5,1);
		 this.game.physics.enable(c);
		 c.body.collideWorldBounds = true;
		return c;

	};
Level3.prototype.addEnemy3 = function(x,y){
		c = this.add.sprite(x, y, "e3");
		c.animations.add("walk").play(4,true);
		c.anchor.set(0.5,1);
		 this.game.physics.enable(c);
		 c.body.collideWorldBounds = true;
	
		return c;

	};
Level3.prototype.addItem = function(x,y){
	c = this.add.sprite(x, y, "water");
	c.animations.add("walk").play(2,true);
	c.anchor.set(0.5,1);
	c.scale.set(3);
	this.game.physics.enable(c);
	 c.body.collideWorldBounds = true;
	return c;

	};	

function gframes(key,n){
	var f=[ ];
	for(var i=0;i<=n;i++){
	 var kf=key+"_"+(("00" + i).slice (-3));
	 f.push(kf);
	}
	return f;
	}
Level3.prototype.createBoss = function() {
		Boss = this.add.sprite(250,1200,"chada");
		Boss.anchor.set(0.5,1);
        Boss.scale.set(5);
		Boss.animations.add("fly").play(2,true);
		
		//this.add.tween(boss1).to( { y: '-10000' }, 140000, Phaser.Easing.Linear.None, true);
		this.game.physics.enable(Boss);
		Boss.body.collideWorldBounds = true;
		return Boss;
};

Level3.prototype.createWeapon = function() {
	this.weapon1 = this.add.weapon(1,"water1");
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.trackSprite(this.player);
	//this.weapon1.bulletSpeed = 1000;
	this.weapon1.rate = 600;
	this.weapon1.bulletAngleOffset =90;
};
Level3.prototype.fireWeapon = function() {
	this.weapon1.fire();
};
Level3.prototype.BossonCollidebullet = function(Boss,bullet){
		bullet.kill();
		this.Boss.hpE--;
		this.game.camera.shake(0.05, 200);
		this.music1.play();
		if(this.Boss.hpE<0){
			this.Boss.hpE=0;
			this.hpE[this.Boss.hpE].visible = false;

		}else if(this.Boss.hpE<5){
			this.hpE[this.Boss.hpE].visible = false;

		}	
	
	if(this.Boss.hpE<=0){
		Boss.kill();
		this.update(this.Win.visible=true);
		this.music.stop();
		this.music1.stop();
		this.music2.play();
		}
	
	//exp = this.add.sprite(this.Boss.x, this.Boss.y,"boom");
	//exp.anchor.set(0.5);
	//exp.animations.add("all",null,12,false).play().killOnComplete=true;
	
	};

Level3.prototype.playerColideEnemies = function(player,enemies){
			enemies.kill();
			this.player.hpP--;
			if(this.player.hpP<0){
				this.player.hpP=0;
				this.hpP[this.player.hpP].visible = false;
			}else if(this.player.hpP<3){
				this.hpP[this.player.hpP].visible = false;
			}	
		
		if(this.player.hpP<=0){
			this.player.kill();
			
	        //the "click to restart" handler
			this.update(this.Lost.visible=true);
			this.music.stop();
			this.music3.play();
			this.game.camera.flash(0xff0000, 500);
			//this.lost.visible = false;
			//this.lost.inputEnabled = true;
			//this.lost.events.onInputDown.add(this.quitLost,this);

			}
		exp = this.add.sprite(this.player.x, this.player.y,"boom");
		exp.anchor.set(0.5);
		exp.animations.add("all",null,12,false).play().killOnComplete=true;
		//this.hpP.valueOf();
		
	};
Level3.prototype.playerColideBoss = function(player,Boss){
	this.player.kill();

	this.update(this.Lost.visible=true);
	this.music.stop();
	this.music3.play();

	this.game.camera.flash(0xff0000, 500);
	//this.lost.visible = false;
	//this.lost.inputEnabled = true;
	//this.lost.events.onInputDown.add(this.quitLost,this);
	
    //the "click to restart" handler


	exp = this.add.sprite(this.player.x, this.player.y,"boom");
	exp.anchor.set(0.5);
	exp.animations.add("all",null,12,false).play().killOnComplete=true;
	//exp.events.onAnimationComplete.add(exp1, this);
	
	//exp1 = this.add.sprite(game.world.setBounds(500, 500),"lost");
	//exp1.anchor.set(0.5);
	};
	
Level3.prototype.playerColideItem = function(player,item){
		item.kill();
		this.update(this.num++);

	};

Level3.prototype.quitLost = function() {
	this.music.stop();
	this.music1.stop();
	this.music2.stop();
	this.music3.stop();
	this.game.state.start("Menu");
	
};
Level3.prototype.quitWin = function() {
	this.music.stop();
	this.music1.stop();
	this.music2.stop();
	this.music3.stop();
	this.game.state.start("Menu");
};
