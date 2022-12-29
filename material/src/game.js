import MenuScene from "./menu.js";
import GameScene from "./gameScene.js";
import LoseScene from "./lose.js";
window.onload = ()=>{

    const config = {
        type: Phaser.AUTO,
        scale: {
            width: 256,
            height: 192,
            zoom: 3,
            autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY
        },
        physics:{
            default: 'arcade',
			arcade: {
				gravity: {y: 150}, 
				debug: true
			}
        },
        pixelArt: true,
        scene: [ MenuScene,GameScene,LoseScene]
    };

    new Phaser.Game(config);
};