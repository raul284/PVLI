export default class Enemy extends Phaser.GameObjects.Container{

    constructor(scene)
    {
        let x = Math.random() * (scene.bg.width/2);
		let y = 150;
        super(scene,x,y);
        
        this.enemy= new Phaser.GameObjects.Sprite(scene,0,0,'patrik');
        this.setSize(this.enemy.width , this.enemy.height);
        this.add(this.enemy);

        this.enemy.setDepth(10);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.allowGravity=false;
        
        this.scene.physics.add.overlap(this.scene.player, this, ()=>{this.scene.player.hit(),this.die()});
		

    }
    die()
    {
        this.destroy();
    }

}