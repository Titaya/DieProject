/**
 *
 */
function Story () {
   Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story.prototype = proto;

Story.prototype.preload = function() {
	this.load.pack("story", "assets/assets-pack.json");
};

Story.prototype.create = function() {
	this.music = this.game.sound.play('hw',0.1);
	
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"s1");
	this.sprite.anchor.set(0.5, 0.5);
    this.sprite.scale.set(1.5);
	
	this.input.onDown.add(this.startGame, this);
	this.time.events.add(2000,this.change,this,"s2");
	this.time.events.add(4000,this.change,this,"s3");
	this.time.events.add(6000,this.change,this,"s4");
	this.time.events.add(8000,this.change,this,"s5");
	this.time.events.add(10000,this.change,this,"s6");
	this.time.events.add(12000,this.change,this,"s7");
	this.time.events.add(14000,this.change,this,"s8");
	this.time.events.add(16000,this.change,this,"s9");
	this.time.events.add(18000,this.change,this,"s10");
	this.time.events.add(20000,this.change,this,"s11");
	this.time.events.add(22000,this.change,this,"s12");
	this.time.events.add(24000,this.change,this,"s14");
	this.time.events.add(30000,this.startGame,this);
	
};
Story.prototype.change = function(k) {
 	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,k);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.scale.set(1.5);
};
Story.prototype.startGame = function() {
	this.music.stop();
	this.game.state.start("Menu");
};




