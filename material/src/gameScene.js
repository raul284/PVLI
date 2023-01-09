import Player from './player.js';
import Bound from './bound.js';
import Ship from './ship.js';
import Bonus from './bonus.js';
import Enemy from './enemy.js';
import {P1,P2} from './NPC.js';
import HUD from './HUD.js';
import Ball from './Ball.js';

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
		this.load.image('ball', 'assets/sprites/ball.png');
		
		this.load.audio('explosion','assets/sounds/explosion.wav');
		this.load.audio('endGame','assets/sounds/lose.wav');
		this.load.audio('winGame','assets/sounds/win.wav');
		
		
		 //PARALLAX
		 this.load.image('sky', 'assets/sprites/sky.png');
		 this.load.image('cloudsBG', 'assets/sprites/clouds_bg.png');
		 this.load.image('montain', 'assets/sprites/glacial_mountains.png');
		 this.load.image('clouds3', 'assets/sprites/clouds_mg_3.png');
		 this.load.image('clouds2', 'assets/sprites/clouds_mg_2.png');
		 this.load.image('clouds1', 'assets/sprites/clouds_mg_1.png');
		 
		}
		
		create(){
			this.cursorT= this.input.keyboard.addKey('T');
			
			//PARALAX
		this.back=[];
		this.back.push(this.add.image(20, 800, 'sky').setScrollFactor(1).setDepth(-1).setScale(10,1));
		this.createAligned(2,'cloudsBG', 0.2);
		this.createAligned(2,'montain', 0.4);
		this.createAligned(4,'clouds3', 0.6);
		this.createAligned(5,'clouds2', 0.8);
		this.createAligned(5,'clouds1', 1);
		//FONDO
		this.bg= this.add.image(0,0,'bg').setOrigin(0,0).setDepth(-2);

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
		this.p1 = new P1(this,width/ 2-50, 100);
		this.p2 = new P2(this,width/ 2+20, 100);
		this.hud=new HUD(this);

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
		///////
		this.physics.add.collider(this.p1, this.bg);
		this.physics.add.collider(this.p1, bLeft);
		this.physics.add.collider(this.p1, bDown);
		this.physics.add.collider(this.p1, bRight);
		this.physics.add.collider(this.p1, bUp);
		this.p1.body.onCollide = true;

		this.physics.add.collider(this.p2, this.bg);
		this.physics.add.collider(this.p2, bLeft);
		this.physics.add.collider(this.p2, bDown);
		this.physics.add.collider(this.p2, bRight);
		this.physics.add.collider(this.p2, bUp);
		this.p2.body.onCollide = true;
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
		//////////
		this.physics.add.collider(this.p1, this.groundLayer);
		this.physics.add.collider(this.p2, this.groundLayer);
		this.physics.add.collider(this.p1, this.p2);

		this.modo1=false;
		this.second=60;
		this.pause=false;
		this.time.addEvent({delay:3000, callback: ()=>{if(this.modo1)this.spawnBonus(Phaser.Math.Between(0,3))},callbackScope:this, loop:true});

		this.time.addEvent({delay:5000, callback: ()=>{if(this.modo1)this.spawnEnemy()},callbackScope:this, loop:true});
		
		this.time.addEvent({delay:1000, callback: ()=>{if(!this.pause)this.second--},callbackScope:this, loop:true});

		this.x=0;
		this.pos=0;
		this.op=0;

		this.OPos=[];
		for(let k=0; k<this.back.length;k++)
		{
			this.OPos.push(this.back[k].x);
		}
		console.log(this.OPos)
		
		//player activo
		this.pactivo=true;

		////BALLS/////
		this.balls=[];
		this.balls.push(new Ball(this,300,150,5,1));
	}

	update(t,dt)
	{
		
		if(this.player.cursorR.isDown || this.pos!=0){
			this.moveBack(this.back[this.x],this.pos);		
			this.x++;
			this.pos+=0.2;
			if(this.x>=this.back.length)this.x=0;
			if(this.pos>this.game.config.width/2){
				this.pos=0;			
			}

		}
		if(this.player.cursorH.isDown || this.pos==0)
		{
			this.pos=0;
		
			this.moveBack(this.back[this.op],this.OPos[this.op]);
			this.op++;
			if(this.op>=this.back.length)this.op=0;
		}
		if(this.second<0)
		{			
			this.scene.start('gameOver');
		}
		if(Phaser.Input.Keyboard.JustDown(this.cursorT))
		{
			this.pause=!this.pause;
			if(this.pause)
			{
				this.player.setActive(false);
				this.player.body.setVelocityX(0);
				this.player.body.setVelocityY(0);
				this.player.body.allowGravity=false
			}
			else{
				if(this.pactivo)this.player.setActive(true);
				this.player.body.allowGravity=true
			}
		}
	
	}
	
	changeMode(index)
	{
		if(index==1){
		this.modo1=!this.modo1;
		console.log(this.modo1);
		}
		else if(index==2){
			this.player.setActive(!this.pactivo);
			this.pactivo=!this.pactivo;
			if(!this.pactivo)this.cameras.main.startFollow(this.p1);
			else this.cameras.main.startFollow(this.player);
		}
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


	//PARALAX
	createAligned(count, imageKey, srollFactor){
		let x = 0;
		for (let i = 0 ; i < count; i++){
			const m = this.add.image(x, 700, imageKey)
				.setOrigin(0,0)
				.setScrollFactor(srollFactor,1)
				.setDepth(0);
				x += m.width
				this.back.push(m);
			}
	}
	moveBack(image,pos)
	{
		
		image.setPosition(-pos,image.y);

	}
}

//EVENTOS

// // En el create de Scene
// this.events.on('playerdead', gameOver);
// ...
// // En otro punto de nuestro juego (this es la escena)
// this.events.emit('playerdead');

// function gameOver() {
//     // Fin de la partida
//     // Se ejecuta cuando el jugador haya muerto
// }