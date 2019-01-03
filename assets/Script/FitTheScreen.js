cc.Class({
    extends: cc.Component,

    properties: {
     
    },
    onLoad () {
        // 适配全面屏
        // console.log(this.getComponent(cc.Canvas).fitWidth);
        
        // let yj = cc.director.getWinSizeInPixels();
        // if (yj.width/yj.height>1.77) {
        //     this.getComponent(cc.Canvas).fitWidth=false;
        //     this.getComponent(cc.Canvas).fitHeight=true;
        // }
    },

    // update (dt) {},
});
