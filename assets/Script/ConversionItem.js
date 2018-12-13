const DBU=require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        modalBg: {
            default: null,
            type: cc.Node,
            displayName: '话费窗口'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    fnOnClick(e){
        console.log(22);
        
        e.target.getChildByName('je').emit('touchstart')
        setTimeout(()=>{
            e.target.getChildByName('je').emit('touchend')
        },100)
        // this.modalBg.active=true;
        // this.node.emit('prepaidCalls',{
        //     money:this.node.getChildByName('je').getChildByName('money').string
        // })

    },

    // start () {

    // },

    // update (dt) {},
});
