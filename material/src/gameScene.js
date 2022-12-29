import Player from './player.js';

export default class GameScene extends Phaser.Scene {

	constructor (){
		super({key: 'GameScene'});		
	}
	
	init(obj){
		this.max = obj.max;
	}
	preload() {
		this.load.tilemapTiledJSON('tilsetJSON', 'assets/map/tilemap.json');
		this.load.image('ground_ts', 'assets/sprites/tileset.png');
		this.load.image('spaceship', 'assets/sprites/spaceship.png');
		this.load.spritesheet('player', 'assets/sprites/jetpac.png',
		 {frameWidth: 17, frameHeight: 24});
		this.load.image('fuel', 'assets/sprites/fuel.png');
		this.load.spritesheet('asteroid','assets/sprites/meteor.png',
		 {frameWidth: 16, frameHeight: 14});

		 this.load.image('bg', 'assets/sprites/plazaNoche.png');
	}
	
	create(){


		//FONDO
		var bg= this.add.image(0,0,'bg').setOrigin(0,0);

		//CAMARA
		this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);
		//MINI_MAPA
		var camaraMapa= this.cameras.add(25,7,60,50);
		camaraMapa.zoom=0.25;
		camaraMapa.setBounds(0, 0, bg.displayWidth, bg.displayHeight);
		

		// MAPA
		this.map = this.make.tilemap({ 
			key: 'tilsetJSON', 
			tileWidth: 8, 
			tileHeight: 8 
		});
		
		
		this.anims.create({
			key: 'astd',
			frames: this.anims.generateFrameNames('asteroid', {start:0, end:1}),
			frameRate: 3,
			repeat: -1
		});
		
		const tileset1 = this.map.addTilesetImage('ground_ts', 'ground_ts');
		this.groundLayer = this.map.createLayer('ground', tileset1);
		
		// Colisiones
		this.groundLayer.setCollisionBetween(0,999);
		
		const width = this.scale.width;
		const height = this.scale.height;
		
		this.player = new Player(this, width/ 2, 100);

		//CAMRA FOLLOW
		camaraMapa.startFollow(this.player);
		this.cameras.main.startFollow(this.player);


		this.numAster=0;
		this.astSpeed=50;
		//new Fuel(this);
		// Colision entre player y los tiles
		this.physics.add.collider(this.player, this.groundLayer);
		
	}
	
	
	
}
