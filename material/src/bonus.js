export default class Bonus extends Phaser.GameObjects.Container{

    constructor(scene)
    {
        let x = Math.random() * (scene.bg.width/2);
		let y = Math.random() * (scene.bg.height/4);
        super(scene,x,y);
        
        this.bob= new Phaser.GameObjects.Sprite(scene,0,0,'bob');
        this.setSize(this.bob.width , this.bob.height);
        this.add(this.bob);

        this.bob.setDepth(10);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.allowGravity=false;
        
        this.scene.physics.add.overlap(this.scene.player, this, ()=>{this.scene.player.health(),this.die()});
		

    }
    die()
    {
        this.destroy();
    }

}