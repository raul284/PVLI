import Ateroid from "./asteroids.js";
export class Gancho extends Phaser.GameObjects.Container{
constructor(scene,x,y){
	super(scene,x,y);
	this.sprite= new Phaser.GameObjects.Sprite(scene,0,0,'paddle');
		this.setSize(this.sprite.width/4, this.sprite.height/4);
		this.add(this.sprite);
		this.sprite.setScale(0.25)

		this.sprite.setDepth(10);
		this.speed=100;
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.scene.physics.add.collider(this, this.scene.bg);
		this.scene.physics.add.collider(this, this.scene.bLeft);
		this.scene.physics.add.collider(this, this.scene.bDown);
		this.scene.physics.add.collider(this, this.scene.bRight);
		this.scene.physics.add.collider(this, this.scene.bUp);
		this.body.onCollide = true;
		this.body.allowGravity=false;

		this.throw=false;
		this.timer=0;
		this.sprite.setVisible(false);
		
		// this.scene.time.addEvent({delay:this.timer, callback: ()=>{if(this.throw)this.throw=false;},callbackScope:this, loop:true});

}

preUpdate(t,dt){
	this.sprite.preUpdate(t,dt);
	
	if(!this.throw){
		
		this.x=this.scene.player.x;
		this.y=this.scene.player.y;
	}
	else{
		if(this.y>750)this.body.setVelocityY(-this.speed);
		else if(this.timer<3000)
		{
			this.body.setVelocityY(0);
			this.timer += dt;
		}
		else{
			this.throw=false;
			this.sprite.setVisible(false);
			this.timer=0;
		}		
	}	
}
reset(){
	
	this.x=this.scene.player.x;
	this.y=this.scene.player.y;
	this.body.setVelocityY(0);
	this.timer=0;
	this.throw=false;
	this.sprite.setVisible(false);

}


}
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
		this.cursorF= this.scene.input.keyboard.addKey('F');
		this.cursorM= this.scene.input.keyboard.addKey('M');

		//Raton
		this.pointer=this.scene.input.activePointer

		this.shot=true;

		////GANCHO
		this.gancho =new Gancho(scene,this.x,this.y);
	
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
		// Phaser.Input.Keyboard.JustDown(this.cursorP)
	    if ((this.pointer.isDown) && this.bullet>0 &&!this.shot)
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
		if(Phaser.Input.Keyboard.JustDown(this.cursorF))
		{
			this.gancho.reset();
			this.gancho.sprite.setVisible(true);
			this.gancho.throw=true;
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
		if(this.currentLife==0){
			this.scene.scene.stop('hud');
			this.scene.scene.start('gameOver');
		
		}	//this.lifes.text= 'LIFES \n   '+this.currentLife+'/'+this.maxLife;

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