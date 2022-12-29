export default class Player extends Phaser.GameObjects.Container{

	constructor(scene,x,y){
		super(scene,x,y);
		this.sprite= new Phaser.GameObjects.Sprite(scene,0,0,'player');
		this.setSize(this.sprite.width, this.sprite.height);
		this.add(this.sprite);

		this.sprite.setDepth(10);
		this.speed=100;
		this.maxLife=3;
		this.currentLife=this.maxLife;
		this.lifes=this.scene.add.text(225,25,this.currentLife+'/'+this.maxLife
		, {fontFamily: 'Pixeled', fontSize: 10, color: '#FFFFFF'})
		.setOrigin(0.5,0.5).setScrollFactor(0);
		
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
		this.cursorL= this.scene.input.keyboard.addKey('L');
		this.cursorH= this.scene.input.keyboard.addKey('H');



	}

	preUpdate(t,dt){
		this.sprite.preUpdate(t,dt);
		if(this.cursorA.isDown)
		{
			this.sprite.setFlip(true,false);
			this.body.setVelocityX(-this.speed);
		}
		else if(this.cursorD.isDown)
		{
			this.sprite.setFlip(false,false);
			this.body.setVelocityX(this.speed);
		}
		else this.body.setVelocityX(0);

		if(this.cursorSpace.isDown)
		{
			this.body.setVelocityY(-this.speed);
		}

		if(this.cursorL.isDown || this.currentLife==0)
		{
			this.scene.scene.start('gameOver');
			//this.scene.scene.end('GameScene');
		}
	  if (Phaser.Input.Keyboard.JustDown(this.cursorH))
	  {
		this.currentLife--;
		this.lifes.text= this.currentLife+'/'+this.maxLife;
	  }
	}



}