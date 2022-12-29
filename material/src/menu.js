 export default class MenuScene extends Phaser.Scene{

    constructor(){
        super({key:'menu'});
    }

    create(){
        this.add.text(this.game.config.width/2 ,this.game.config.height/5 , 'TERRANEITOR',
        {fontFamily:"Pixeled", fontSize:25, color:'#0000FF'}).setOrigin(0.5,0.5).setAlign('center');

        this.createButton(this.game.config.height/5*2,'Javo',1);
        this.createButton(this.game.config.height/5*3,'la',2);
        this.createButton(this.game.config.height/5*4,'chupa',3);

    }
    createButton(y,text,mode){
        let boton= this.add.text(this.game.config.width/2, y,text,
        {fontFamily:'Pixeled',fontSize:15, color:'#FFFFFA'}).setOrigin(0.5,0.5).setAlign('center').setInteractive();
        
        boton.on('pointerdown',()=>{this.scene.start('GameScene',{max:mode})});
    }
 }