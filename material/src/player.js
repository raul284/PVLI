import Ateroid from "./asteroids.js";
export default class Player extends Phaser.GameObjects.Container{

	constructor(scene,x,y,num){
		super(scene,x,y);
		this.sprite= new Phaser.GameObjects.Sprite(scene,0,0,'player');
		this.setSize(this.sprite.width, this.sprite.height);
		this.add(this.sprite);

		this.sprite.setDepth(10);
		this.speed=100;
		this.tam=1;

		this.maxBullet=3;
		this.bullet=this.maxBullet;
		this.dir=1;
		this.blourActive=false;
		// this.bullets=this.scene.add.text(225,150,'BULLET \n    '+this.bullet+'/'+this.maxBullet
		// , {fontFamily: 'Pixeled', fontSize: 10, color: '#AAAAAA'})
		// .setOrigin(0.5,0.5).setScrollFactor(0);

		this.maxLife=num;
		this.currentLife=this.maxLife;
		// this.lifes=this.scene.add.text(225,25,'LIFES \n   '+this.currentLife+'/'+this.maxLife
		// , {fontFamily: 'Pixeled', fontSize: 10, color: '#F00000'})
		// .setOrigin(0.5,0.5).setScrollFactor(0);
		
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.scene.anims.create({
			key:'idle',
			frames: this.scene.anims.generateFrameNumbers('player',{start:4, end:4}),
			frameRate:7,
			repeat:-1
		});

		this.sprite.play('idle');

		this.cursorA= this.scene.input.keyboard.addKey('A');
		this.cursorD= this.scene.input.keyboard.addKey('D');
		this.cursorSpace= this.scene.input.keyboard.addKey('SPACE');
		this.cursorR= this.scene.input.keyboard.addKey('R');
		this.cursorH= this.scene.input.keyboard.addKey('H');
		this.cursorP= this.scene.input.keyboard.addKey('P');
		this.cursorM= this.scene.input.keyboard.addKey('M');

		//Raton
		this.pointer=this.scene.input.activePointer

		this.shot=true;
	
	}

	preUpdate(t,dt){
		this.sprite.preUpdate(t,dt);
		if(this.cursorA.isDown)
		{
			this.dir=-1;
			this.sprite.setFlip(true,false);
			this.body.setVelocityX(-this.speed);
		}
		else if(this.cursorD.isDown)
		{
			this.dir=1;
			this.sprite.setFlip(false,false);
			this.body.setVelocityX(this.speed);
		}
		else this.body.setVelocityX(0);

		if(this.cursorSpace.isDown)
		{
			this.body.setVelocityY(-this.speed);
		}
	
	    if ((this.pointer.isDown||Phaser.Input.Keyboard.JustDown(this.cursorP)) && this.bullet>0 &&!this.shot)
	    {	
			this.shot=true;
			new Ateroid(this.scene,this.x,this.y,this,this.dir,this.tam);
			this.bullet--;
			//this.bullets.text='BULLET \n    '+this.bullet+'/'+this.maxBullet;
			
		}
		if (!this.pointer.isDown)this.shot=false;
	   
		if(this.blourActive){
			console.log("SII");
			this.scene.time.addEvent({delay:7000, callback: ()=>{
			this.blour.destroy();this.blourActive=false},callbackScope:this, loop:false});
		}
		if(Phaser.Input.Keyboard.JustDown(this.cursorM))
		{
			this.scene.changeMode(1);
		}
		
		// if(this.cursorL.isDown || this.currentLife==0)
		// {
		// 	this.scene.scene.start('gameOver');
		// }
		// if (Phaser.Input.Keyboard.JustDown(this.cursorH))
		// {
		// 	this.currentLife--;
		// 	this.lifes.text= 'LIFES \n   '+this.currentLife+'/'+this.maxLife;
		// }
	}

	health()
	{
		if(this.currentLife<this.maxLife)this.currentLife++;
		//this.lifes.text= 'LIFES \n   '+this.currentLife+'/'+this.maxLife;	 		
	}
	hit()
	{
		this.currentLife--;
		if(this.currentLife==0)this.scene.scene.start('gameOver');
		//this.lifes.text= 'LIFES \n   '+this.currentLife+'/'+this.maxLife;

		this.speed=100;
		this.tam=1;
		if(this.blourActive){
			this.blour.destroy();
			this.blourActive=false;
		}	 	
	}
	powerUp(power)
	{
		if(power=='bob') this.health();
		else if(power=='duck')this.speed=150;
		else if(power=='eve'){this.tam=2;}
		else if(power=='raw'&& !this.blourActive){
			this.blour=new Phaser.GameObjects.Sprite(this.scene,100,100,'noche');
			this.blour.setDepth(60);
			this.scene.add.existing(this.blour);
			this.blour.alpha = 0.90;
			this.blourActive=true;
		}
	}
}