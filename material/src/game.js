import MenuScene from "./menu.js";
import GameScene from "./gameScene.js";
import LoseScene from "./lose.js";
import WinScene from "./win.js";
import HUD from "./HUD.js";

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
				debug: false
			}
        },
        pixelArt: true,
        scene: [ MenuScene, GameScene,HUD,LoseScene,WinScene]
    };

    new Phaser.Game(config);
};