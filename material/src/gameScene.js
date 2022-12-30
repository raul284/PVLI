import Player from './player.js';
import Bound from './bound.js';
import Ship from './ship.js';
import Bonus from './bonus.js';
import Enemy from './enemy.js';

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
		 this.load.image('pixel', 'assets/sprites/pixel1x1.png');
		 this.load.image('bob', 'assets/sprites/bob.png');
		 this.load.image('patrik', 'assets/sprites/patrik.png');
		 this.load.image('duck', 'assets/sprites/duck.png');
		 this.load.image('eve', 'assets/sprites/eve.png');
		 this.load.image('raw', 'assets/sprites/Raw.png');
		 this.load.image('noche', 'assets/sprites/noche.png');
	}
	
	create(){

		//FONDO
		this.bg= this.add.image(0,0,'bg').setOrigin(0,0);

		//CAMARA
		this.cameras.main.setBounds(0, 0, this.bg.displayWidth, this.bg.displayHeight);
		//MINI_MAPA
		this.camaraMapa= this.cameras.add(25,7,45,45);
		this.camaraMapa.zoom=0.15;
		this.camaraMapa.setBounds(0, 0, this.bg.displayWidth, this.bg.displayHeight);
		
		console.log(this.camaraMapa.y)
		
		//MAPA
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
		
		this.player = new Player(this, width/ 2, 100, this.max);

		this.ship = new Ship(this,65,160,this.max);

		let bLeft = new Bound(this, -1, 0,1,this.bg.displayHeight);
		let bRight = new Bound(this, this.bg.displayWidth, 0,1,this.bg.displayHeight);
		let bUp = new Bound(this, 0, -1,this.bg.displayWidth,1);
		let bDown = new Bound(this, 0, this.bg.displayHeight ,this.bg.displayWidth,1);

        // colisiones con los bordes
		this.physics.add.collider(this.player, this.bg);
		this.physics.add.collider(this.player, bLeft);
		this.physics.add.collider(this.player, bDown);
		this.physics.add.collider(this.player, bRight);
		this.physics.add.collider(this.player, bUp);
		this.player.body.onCollide = true;
		//CAMRA FOLLOW
		this.camaraMapa.startFollow(this.player);
		this.cameras.main.startFollow(this.player);


		this.numAster=0;
		this.astSpeed=50;
		this.bonus=[];
		this.enemy=[];
		
		//new Fuel(this);
		// Colision entre player y los tiles
		this.physics.add.collider(this.player, this.groundLayer);
		this.physics.add.collider(this.ship, this.groundLayer);
		

		this.time.addEvent({delay:3000, callback: ()=>{this.spawnBonus(Phaser.Math.Between(0,3))},callbackScope:this, loop:true});
		
		this.time.addEvent({delay:5000, callback: ()=>{this.spawnEnemy()},callbackScope:this, loop:true});
		
	}
	spawnBonus(num){
		if(num==0)this.power='bob';
		else if(num==1)this.power='duck';
		else if(num==2) this.power='eve';
		else if(num==3)this.power='raw';
		this.bonus.push(new Bonus(this,this.power));
		
	}
	spawnEnemy(){
		this.enemy.push(new Enemy(this));		
	}
	
	
}
