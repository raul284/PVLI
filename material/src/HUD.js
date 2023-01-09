
export default class HUD extends Phaser.GameObjects.Container{

	constructor(scene){
		
	    super(scene);
		this.bullets=this.scene.add.text(225,150,'BULLET \n    '+this.scene.player.bullet
        +'/'+this.scene.player.maxBullet, {fontFamily: 'Pixeled', fontSize: 10, color: '#AAAAAA'})
		.setOrigin(0.5,0.5).setScrollFactor(0).setDepth(50);

		
		this.lifes=this.scene.add.text(225,25,'LIFES \n   '+this.scene.player.currentLife
        +'/'+this.scene.player.maxLife, {fontFamily: 'Pixeled', fontSize: 10, color: '#F00000'})
		.setOrigin(0.5,0.5).setScrollFactor(0).setDepth(50);

        this.clock=this.scene.add.text(20,150,'TIME \n   '+this.scene.second, {fontFamily: 'Pixeled', fontSize: 10, color: '#F00000'})
		.setOrigin(0.5,0.5).setScrollFactor(0).setDepth(50);

        this.pause=this.scene.add.text(this.scene.game.config.width/2,this.scene.game.config.height/2,'PAUSE',
         {fontFamily: 'Pixeled', fontSize: 50, color: '#0FFFFF'})
		.setOrigin(0.5,0.5).setScrollFactor(0).setDepth(50).setVisible(false);

		
        this.scene.add.existing(this);
	}

	preUpdate(t,dt){
		this.lifes.text= 'LIFES \n   '+this.scene.player.currentLife+'/'+this.scene.player.maxLife;
        this.bullets.text='BULLET \n    '+this.scene.player.bullet+'/'+this.scene.player.maxBullet;
        this.clock.text='TIME \n   '+this.scene.second;
        this.pause.setVisible(this.scene.pause);
	}

	
}