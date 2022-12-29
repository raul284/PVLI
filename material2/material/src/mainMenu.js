export default class MainMenu extends Phaser.Scene {
	
	constructor (){
		super({key: 'MainMenu'});
	}
	
	create(){
		this.add.text(this.game.config.width / 2, this.game.config.height / 5, 'JetPac', {fontFamily: 'Pixeled', fontSize: 32, color: '#FFFFFF'}). setOrigin(0.5, 0.5).setAlign('center');
		
		this.createButton(this.game.config.height / 5 * 2, 'Facil', 1);
		this.createButton(this.game.config.height / 5 * 3, 'Medio', 3);
		this.createButton(this.game.config.height / 5 * 4, 'Dificil', 5);
	}	
	
	createButton(y, texto, num){
		let boton = this.add.text(this.game.config.width / 2, y, texto , {fontFamily: 'Pixeled', fontSize: 16, color: '#FFFFFF'})
		. setOrigin(0.5, 0.5).setAlign('center')
		.setInteractive();
		
		boton.on('pointerdown', ()=>{this.scene.start('GameScene',{max:num})});
		return boton;
	}
	
}