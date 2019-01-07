
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    enter() {
// 销毁大厅计时器
cc.publicParameter.setIntervalArr.forEach(item=>{
    clearInterval(item);
})
cc.publicParameter.setIntervalArr=[];
// 进入游戏主场景
        cc.director.loadScene('Game');
    },


    // update (dt) {},
});
