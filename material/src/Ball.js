export default class Ball extends Phaser.GameObjects.Container{

    constructor(scene,x,y,tam,num)
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

        this.body.allowGravity=false;
        
        this.scene.physics.add.overlap(this.scene.player, this, ()=>{this.die()});
		

    }
    die()
    {
        console.log("oi");
        if(this.number<4)
        {
        this.scene.balls.push(new Ball(this.scene,this.x-50,this.y,this.tamaño/2,this.number+1));
        this.scene.balls.push(new Ball(this.scene,this.x+50,this.y,this.tamaño/2,this.number+1));
        
        }
        this.destroy();
    }

}