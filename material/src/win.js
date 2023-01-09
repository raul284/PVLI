export default class WinScene extends Phaser.Scene{

    constructor(){
        super({key:'win'});
    }  
    create()
    {
        this.add.text(this.game.config.width/2 , this.game.config.height/2.5,'OLEE QUE ARTE',
        {fontFamily:'Pixeled', fontSize:20, color:'#FFFFFF'}).setOrigin(0.5,0.5).setAlign('center');

        let restart=this.add.text(this.game.config.width/2 , this.game.config.height/2*1.5,'Volvé champion',
        {fontFamily:'Pixeled', fontSize:15, color:'#00FFF0'}).setOrigin(0.5,0.5).setAlign('center').setInteractive();

        restart.on('pointerdown',()=>{this.scene.start('menu')});

        this.lose= this.sound.add('winGame');
        this.lose.play();
    }

} 