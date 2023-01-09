export default class Ball extends Phaser.GameObjects.Container{

    constructor(scene,x,y,tam,num,dir)
    {
       
        super(scene,x,y);
        this.tamaño=tam;
        this.number=num;
        this.enemy= new Phaser.GameObjects.Sprite(scene,0,0,'ball');
        this.setSize(this.enemy.width*(tam/10),this.enemy.height*(tam/10));
        this.add(this.enemy);
        this.enemy.setScale((tam/10),(tam/10))
        this.enemy.setDepth(10);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.dirY=dir;
        this.dirX=1;
        if(Phaser.Math.Between(0,1)%2==0)
        {
            this.dirX=-1;
        }

       // this.body.allowGravity=false;
       this.scene.physics.add.overlap(this.scene.bDown, this, ()=>{this.dirY=-1});
       this.scene.physics.add.overlap(this.scene.player.gancho, this, ()=>{if(this.scene.player.gancho.throw)this.scene.player.gancho.reset(),this.die()});
       this.scene.physics.add.overlap(this.scene.player, this, ()=>{this.scene.player.hit(),this.die()});
       this.scene.physics.add.collider(this, this.scene.bDown);
       this.scene.physics.add.collider(this, this.scene.player);
       this.body.onCollide = true;
       
       
       this.scene.numBalls++;
       console.log( this.scene.numBallsa)
    }
    preUpdate(t,dt)
    {
        this.enemy.preUpdate(t,dt);
        this.movement(this.dirY);
        if(this.y<700)this.dirY=1;
        if(this.x>240)this.dirX=-1;
        if(this.x<10)this.dirX=1;
       
    }
    die()
    {
       console.log(this.scene.balls)
        if(this.number<4)
        {
        this.scene.balls.push(new Ball(this.scene,this.x-10,this.y,this.tamaño/2,this.number+1,this.dirY));
        this.scene.balls.push(new Ball(this.scene,this.x+10,this.y,this.tamaño/2,this.number+1,this.dirY));
        
        }
        this.scene.numBalls--;
        this.destroy();
    }
    movement(index)
    {
        this.body.allowGravity=false;
       
        this.body.setVelocityY(index*50);
        this.body.setVelocityX(this.dirX*50);
    }

}