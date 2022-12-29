export default class Fuel extends Phaser.GameObjects.Sprite {
	
	constructor(scene) {
		let offset = 15;
		let x = Math.random() * (scene.game.config.width - offset);
		let y = Math.random() * (scene.game.config.height - offset);
		super(scene, x, y, 'fuel');
		
		this.picked = false;
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.scene.physics.add.overlap(this.scene.player, this, (player, fuel)=>{this.addToPlayer(player);});
		this.scene.physics.add.collider(this, this.scene.groundLayer);//, ()=>);
		
	}
	
	addToPlayer(player) {
		if (!this.picked) {
			player.pickFuel(this);
			this.body.setAllowGravity(false);
			this.picked = true;			
		}
	}
	
	respawn(){
		let offset = 15;
		this.body.setAllowGravity(true);
		this.picked = false;			
		this.x = Math.random() * (this.scene.game.config.width - offset);
		this.y = Math.random() * (this.scene.game.config.height - offset);

	}
}