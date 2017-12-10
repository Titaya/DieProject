/**
 *
 */
function Howto () {
   Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Howto.prototype = proto;

Howto.prototype.preload = function() {
	this.load.pack("howto", "assets/assets-pack.json");
};

Howto.prototype.create = function() {
	this.music = this.game.sound.play('hw',0.1);
	
	
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"h1");
	this.sprite.anchor.set(0.5, 0.5);
   this.sprite.scale.set(1.2);
	
	this.input.onDown.add(this.startGame, this);
	this.time.events.add(2000,this.change,this,"h2");
	this.time.events.add(4000,this.change,this,"h3");
	this.time.events.add(6000,this.change,this,"h4");
	this.time.events.add(8000,this.change,this,"h5");
	this.time.events.add(10000,this.change,this,"h6");
	//this.time.events.add(12000,this.change,this,"h7");
	this.time.events.add(30000,this.startGame,this);
	
};
Howto.prototype.change = function(k) {
 	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,k);
    this.sprite.anchor.set(0.5, 0.5);
   this.sprite.scale.set(1.2);
};

Howto.prototype.startGame = function() {
	this.music.stop();
	this.game.state.start("Menu");
};
