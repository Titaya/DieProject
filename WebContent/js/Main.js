window.onload = function() {
	// Create your Phaser game and inject it into an auto-created canvas.
	// We did it in a window.onload event, but you can do it anywhere (requireJS
	// load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game(1250,1200, Phaser.AUTO);

	// Add the States your game has.
	game.state.add("Boot", Boot);
	game.state.add("Menu", Menu);
	game.state.add("Preload", Preload);
	game.state.add("Level", Level);
	game.state.add("Story", Story);
	game.state.add("Howto", Howto);
	game.state.add("Level2", Level2);
	game.state.add("Level3", Level3);
	game.state.add("About", About);
	
	game.state.start("Boot");
};