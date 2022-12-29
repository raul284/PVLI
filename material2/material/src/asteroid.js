export default class Asteroid extends Phaser.GameObjects.Sprite{
	constructor(scene) {
		let x = Math.random() * (scene.game.config.width);
		let y = Math.random() * (scene.game.config.height/2);
		console.log(x, y);
		super(scene, x, y, 'asteroid');
		
		this.play('astd');
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		
		this.body.setVelocity(0, Math.random()*10);
	}
	
	preUpdate(t,dt){
		
		super.preUpdate(t,dt);
	}
	
	
}