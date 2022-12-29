import MainMenu from './mainMenu.js';
import GameScene from './gameScene.js';

window.onload = ()=>{

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
		physics: {
			default: 'arcade',
			arcade: {
				gravity: {y: 150}, 
				debug: true
			}
		},
		
        pixelArt: true,
        scene: [ MainMenu, GameScene ]
    };

    new Phaser.Game(config);
};