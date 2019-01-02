const DBU = require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        zhizhen: {
            default: null,
            type: cc.Node,
            displayName: '指针'
        },
        award: {
            default: null,
            type: cc.Node,
            displayName: '奖品'
        },
        remainder: {
            default: null,
            type: cc.Node,
            displayName: '剩余次数'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let data={
            appKey:cc.publicParameter.appKey,
            token:cc.publicParameter.token,
        }
        DBU.setSign(data);
        DBU.sendPostRequest('/hmmj-restful/task/draw/drawConfigList',data,res=>{
            console.log(res);
            
            let datas=res.datas.drawConfigList,child=this.award.children;
            // 剩余次数
            DBU.loadTxt(res.datas.drawNum,this.remainder);
            datas.forEach((item,index) => {
                let childItem=child[item.drawConfigId-1]
                childItem.drawConfigId=item.drawConfigId;
                console.log('/store/'+item.drawType==1?'jb2':item.drawType==2?'fk3':'jb6'+'.png');
                
                DBU.loadRes('/store/'+(item.drawType==1?'jb2':item.drawType==2?'fk3':'jb6'+'.png'),childItem);
                DBU.loadTxt(
                    `${item.drawType==1?'金币':item.drawType==2?'房卡':'元宝'}X${new DBU.fnQuantize()(item.drawNum)}`,
                    childItem.getChildByName('name')
                );
            });
        },err=>{
            cc.publicMethod.hint(err.message);
        },cc.publicParameter.infoUrl)
    },

    start () {
        setTimeout(()=>{
            this.award.runAction(cc.rotateBy(5,-305))

        },2000)
    },

    // update (dt) {},
});
