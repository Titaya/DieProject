/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;


Menu.prototype.preload = function() {
	this.load.pack("start","assets/assets-pack.json");
};

Menu.prototype.create = function() {
	
	this.music = this.add.sound("music",1,true);
	this.music.play();

	this.bg = this.add.sprite(this.world.centerX, this.world.centerY,"bg");
	this.bg.anchor.set(0.6, 0.5);
	this.bg.scale.set(1.4);
	
	var About = this.add.sprite(1100,1100, "ab");
	About.anchor.set(0.5, 0.5);
	About.scale.set(0.3);
	About.inputEnabled = true;
	About.events.onInputDown.add(this.startAbout,this);
	
	var sprite = this.add.sprite(this.world.centerX, 850,
			"start1");
	sprite.anchor.set(0.5, 0.5);
	sprite.scale.set(1.5);
	sprite.inputEnabled = true;
	sprite.events.onInputDown.add(this.startGame,this);
	    
	var story1 = this.add.sprite(this.world.centerX, 950,
	"story1");
    story1.anchor.set(0.5, 0.5);
    story1.scale.set(1.5);
    story1.inputEnabled = true;
    story1.events.onInputDown.add(this.startStory,this);
    
    var howto1 = this.add.sprite(this.world.centerX, 1050,
	"howto1");
	howto1.anchor.set(0.5, 0.5);
	howto1.scale.set(1.5);
    howto1.inputEnabled = true;
    howto1.events.onInputDown.add(this.startHowto,this);
    
	//this.input.onDown.add(this.startGame, this);

};

Menu.prototype.startGame = function() {
	this.music.stop();
	this.game.state.start("Level");
};


Menu.prototype.startStory = function() {
	this.music.stop();
	this.game.state.start("Story");
};

Menu.prototype.startHowto = function() {
	this.music.stop();
	this.game.state.start("Howto");
};

Menu.prototype.startAbout = function() {
	this.music.stop();
	this.game.state.start("About");
};