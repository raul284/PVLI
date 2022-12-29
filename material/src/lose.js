export default class LoseScene extends Phaser.Scene{

    constructor(){
        super({key:'gameOver'});
    }

    create()
    {
        this.add.text(this.game.config.width/2 , this.game.config.height/2.5,'JAJAJA QUE TONTO',
        {fontFamily:'Pixeled', fontSize:20, color:'#FFFFFF'}).setOrigin(0.5,0.5).setAlign('center');

        let restart=this.add.text(this.game.config.width/2 , this.game.config.height/2*1.5,'Pa  atrás',
        {fontFamily:'Pixeled', fontSize:15, color:'#FFFFFF'}).setOrigin(0.5,0.5).setAlign('center').setInteractive();

        restart.on('pointerdown',()=>{this.scene.start('menu')});

    }
} 