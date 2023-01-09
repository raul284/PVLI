export  class NPC extends Phaser.GameObjects.Container{

constructor(scene,x,y){
    super(scene,x,y);
    this.sprite=new Phaser.GameObjects.Sprite(scene,0,0,'player');
    this.setSize(this.sprite.width, this.sprite.height);
    this.add(this.sprite);

    this.setDepth(10);
    this.speed=75;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.animationMove=false;
    this.animationUp=false;
    this.scene.anims.create({
        key:'idlenpc',
        frames: this.scene.anims.generateFrameNumbers('player',{start:4, end:4}),
        frameRate:5,
        repeat:-1
    });
    this.scene.anims.create({
        key:'move',
        frames: this.scene.anims.generateFrameNumbers('player',{start:4, end:7}),
        frameRate:5,
        repeat:-1
    });
    this.scene.anims.create({
        key:'upnpc',
        frames: this.scene.anims.generateFrameNumbers('player',{start:3, end:0}),
        frameRate:5,
        repeat:-1
    });
    this.sprite.play('idlenpc');
    this.cursorQ= this.scene.input.keyboard.addKey('Q');
}

    move(index)
    {
        if(index!=0 && !this.animationMove)
        {
            this.animationMove=true;
            this.animationUp=false;
            this.sprite.play('move');
        }
        else if(index==0 && (this.animationMove||this.animationUp))
        {
            this.animationMove=false;
            this.animationUp=false;
            this.sprite.play('idlenpc');
        }
        this.body.setVelocityX(index*this.speed);
    }
    fly()
    {
        if(!this.animationUp)
        {
            this.animationMove=false;
            this.animationUp=true;
            this.sprite.play('upnpc');
        }
        this.body.setVelocityY(-this.speed);
    }
}


export class P1 extends NPC{
    constructor(scene,x,y){
        super(scene,x,y); 
        this.cursorA= this.scene.input.keyboard.addKey('Left');
		this.cursorD= this.scene.input.keyboard.addKey('Right');
		// this.cursorSpace= this.scene.input.keyboard.addKey('SPACE');
		 this.cursorW= this.scene.input.keyboard.addKey('up');
		// this.cursorH= this.scene.input.keyboard.addKey('H');
		// this.cursorP= this.scene.input.keyboard.addKey('P');
		// this.cursorM= this.scene.input.keyboard.addKey('M'); 
       
    }
    preUpdate(t,dt){
		this.sprite.preUpdate(t,dt);
		if(this.cursorA.isDown)
		{
            this.sprite.setFlip(true,false);
			this.move(-1);			
		}
		else if(this.cursorD.isDown)
		{
            this.sprite.setFlip(false,false);
			this.move(1);
		}
		else {
            this.move(0);
        }
        if(this.cursorW.isDown)
        {
            this.fly();
        }
        if(Phaser.Input.Keyboard.JustDown(this.cursorQ))
        {
            this.scene.changeMode(2);
        }
    }
}
export class P2 extends NPC{
    constructor(scene,x,y){
        super(scene,x,y); 
        this.cursorJ= this.scene.input.keyboard.addKey('J');
		this.cursorL= this.scene.input.keyboard.addKey('L');
		// this.cursorSpace= this.scene.input.keyboard.addKey('SPACE');
		 this.cursorI= this.scene.input.keyboard.addKey('I');
		// this.cursorH= this.scene.input.keyboard.addKey('H');
		// 
		// this.cursorM= this.scene.input.keyboard.addKey('M'); 
        this.sprite.setFlip(true,false);
        this.scene.physics.add.overlap(this.scene.p1, this, ()=>{console.log("au")});
		
        
    }
    preUpdate(t,dt){
		this.sprite.preUpdate(t,dt);
		if(this.cursorJ.isDown)
		{
            this.sprite.setFlip(true,false);
			this.move(-1);
        }
		else if(this.cursorL.isDown)
		{
            this.sprite.setFlip(false,false);
			this.move(1);
		}
        else if(this.cursorI.isDown)
        {
            this.fly();
        }
		else {
            this.move(0);
        }
    }
    


}