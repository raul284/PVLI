
export default class HUD extends Phaser.Scene{

	constructor(){
		super({key:'hud'});
    }
	    // super(scene);
		create(){
        this.bullets=this.add.text(225,170,'BULLET \n    ', {fontFamily: 'Pixeled', fontSize: 10, color: '#AAAAAA'})
		.setOrigin(0.5,0.5).setScrollFactor(0).setDepth(50);

		
		this.lifes=this.add.text(225,25,'LIFES \n   ', {fontFamily: 'Pixeled', fontSize: 10, color: '#F00000'})
		.setOrigin(0.5,0.5).setScrollFactor(0).setDepth(50);

        this.clock=this.add.text(20,170,'TIME \n   ', {fontFamily: 'Pixeled', fontSize: 10, color: '#NNNNNN'})
		.setOrigin(0.5,0.5).setScrollFactor(0).setDepth(50);

        this.pause=this.add.text(this.game.config.width/2,this.game.config.height/2,'PAUSE',
         {fontFamily: 'Pixeled', fontSize: 50, color: '#0FFFFF'})
		.setOrigin(0.5,0.5).setScrollFactor(0).setDepth(50).setVisible(false);

		
        this.add.existing(this);
        this.scene;
        }
	//}

	update(t,dt){
		this.lifes.text= 'LIFES \n   '+this.scene.player.currentLife+'/'+this.scene.player.maxLife;
        this.bullets.text='BULLET \n    '+this.scene.player.bullet+'/'+this.scene.player.maxBullet;
        this.clock.text='TIME \n   '+this.scene.second;
        this.pause.setVisible(this.scene.pause);
	}
    up(scene){
        this.scene=scene;
    }
    invisible(){
        this.lifes.setVisible(false);
        this.clock.setVisible(false);
        this.bullets.setVisible(false);
        this.pause.setVisible(false);
    }

	
}