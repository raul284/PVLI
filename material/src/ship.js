export default class Ship extends Phaser.GameObjects.Container{

    constructor(scene,x,y,health){
        super(scene,x,y);
        this.ship=new Phaser.GameObjects.Sprite(scene,0,0,'spaceship');

        this.setSize(this.ship.width, this.ship.height);
        this.add(this.ship);

        this.ship.setDepth(10);
        this.MaxHealth=health;
        this.currentHealth=this.MaxHealth;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.vida= this.scene.add.text(this.x-this.ship.width+5,this.y-this.ship.height-5,'Vida\n '+this.currentHealth+'/'+this.MaxHealth,
        {fontFamily:'Pixeled', fontSize:10, color:'#NNNNNN'});
    }
    hit()
    {
        this.currentHealth--;
        this.vida.text='Vida\n '+this.currentHealth+'/'+this.MaxHealth;
        if(this.currentHealth==0)
        {
            this.scene.scene.start('gameOver')
        };
    }
    

}