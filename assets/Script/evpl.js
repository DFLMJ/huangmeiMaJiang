// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        yesBtn: {
            default: null,
            type: cc.Node,
            displayName: '确认'
        },
        ID: {
            default: null,
            type: cc.Node,
            displayName: '身份证'
        },
        phoneNum: {
            default: null,
            type: cc.Node,
            displayName: '电话'
        },
        userName: {
            default: null,
            type: cc.Node,
            displayName: '姓名'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    smrz () {
        let data={
            appKey:cc.publicParameter.appKey,
            token:cc.publicParameter.token,
            trueName:this.userName,
            phone:this.phone
        }
        DBU.setSign(data);
        DBU.sendPostRequest('/hmmj-restful/player/updateTrueNameAndPhone',data,res=>{
            cc.publicMethod.hint(res.message)
        },err=>{
            cc.publicMethod.hint(err.message);
        },cc.publicParameter.infoUrl)
    },

    // update (dt) {},
});
