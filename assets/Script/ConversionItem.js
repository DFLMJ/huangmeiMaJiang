const DBU=require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    /**
     *
     *
     * @param {Event} e 点击的对象
     */
    fnOnClick(e){
        console.log(22);
        e.target.parent.getChildByName('je').emit('touchstart');
        // setTimeout(()=>{
        //     e.target.parent.getChildByName('je').emit('touchend')
        // },100);
        cc.find('Canvas/modalBox/submodule').active=true;
        cc.find('Canvas/modalBox/submodule/prepaidCalls').active=true;        
        // this.node.emit('prepaidCalls',{
        //     money:this.node.getChildByName('je').getChildByName('money').getComponent(cc.Label).string
        // })
        // this.node.dispatchEvent( new cc.Event.EventCustom('prepaidCalls', true))

        // 使用全局事件 发射事件
        cc.director.GlobalEvent.emit('prepaidCalls',{goodsId:this.node.goodsId})

    },

    // start () {

    // },

    // update (dt) {},
});
