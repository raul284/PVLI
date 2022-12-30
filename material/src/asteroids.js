export default class Ateroid extends Phaser.GameObjects.Container{
    
    constructor(scene,x,y,player,dir,tam)
    {
        super(scene,x,y);
        this.astorid= new Phaser.GameObjects.Sprite(scene,0,0,'asteroid');
        this.setSize(this.astorid.width*tam,this.astorid.height*tam);
        this.add(this.astorid);
 
        this.astorid.setDepth(10);
        this.astorid.setScale(tam,tam)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.allowGravity=false
      //this.dead= false;
        this.player=player;
        this.body.setVelocityX(dir*100);
        if(dir===-1)this.astorid.setFlip(true,false)

        this.scene.anims.create({
			key:'bum',
			frames: this.scene.anims.generateFrameNumbers('asteroid',{start:0, end:3}),
			frameRate:7,
			repeat:1
		});  

        // this.on('animationcomplete', end =>{ //evento que se ejecuta cuando una animación ha terminado
		// 	console.log("fa")
        //     this.die();			
		// }); 
        
        this.scene.physics.add.overlap(this.scene.ship, this, ()=>{this.scene.ship.hit(),this.die()});
		for(let i=0;i<this.scene.enemy.length;i++)
        {
            this.scene.physics.add.overlap(this.scene.enemy[i], this, ()=>{this.scene.enemy[i].die(),this.die()});
        }


        this.bum= this.scene.sound.add('explosion');
    }
   
    preUpdate(t,dt)
    {
        this.astorid.preUpdate(t,dt);
        if( this.x>this.scene.bg.width || this.x<0)
        {
         console.log("si")
         //this.dead=true;
         this.die();
         //this.astorid.play('bum');
        }
    }

    die()
    {
        //SONIDO
        this.bum.play();
        this.player.bullet++;
        this.player.bullets.text='BULLET \n    '+ this.player.bullet+'/'+ this.player.maxBullet;
        this.destroy();
    }
}