/**
 *
 */
function About () {
   Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
About.prototype = proto;

About.prototype.preload = function() {
	this.load.pack("About", "assets/assets-pack.json");
};

About.prototype.create = function() {
	this.music = this.game.sound.play('hw',0.1);
	
	
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"Ab");
	this.sprite.anchor.set(0.5, 0.5);
   this.sprite.scale.set(1.2);
   this.sprite.inputEnabled = true;
   this.sprite.events.onInputDown.add(this.startGame,this);

	
};


About.prototype.startGame = function() {
	this.music.stop();
	this.game.state.start("Menu");
};
