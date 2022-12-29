export default class Spaceship extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, max) {
		super(scene, x, y, "spaceship");
		this.scene = scene;
		
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		
		this.fuel = 0;
		this.max = max;
		this.pickedFuel = this.scene.add.text(this.x, this.y - this.height + 10, this.fuel + "/" + this.max, {fontFamily: 'Pixeled', fontSize: 10, color: '#FFFFFF'}).setOrigin(0.5,0.5);
	}
	
	addFuel(){
		this.fuel++;
		this.pickedFuel.text = this.fuel + "/" + this.max;
					console.log(this.fuel);

		if(this.fuel === this.max){
			this.pickedFuel.setVisible(false);
			let tween = this.scene.tweens.add({targets:[this], y: - 100, duration: 2000, ease:"Sine.easeOutIn"});
			this.body.setAllowGravity(false);
			this.scene.player.setVisible(false);
			tween.on('complete', ()=>{this.scene.scene.start('MainMenu')});
		}
	}
	
	preUpdate(t,dt){
		super.preUpdate(t,dt);
	}
}