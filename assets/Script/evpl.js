const DBU = require('DBUtility');

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
        dsSerName: {
            default: null,
            type: cc.Node,
            displayName: '不可修改姓名'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.publicParameter.infoObj.trueName.push(this.dsSerName);
    },
    onEnable() {
        if (cc.publicParameter.userInfo.trueName) {
            cc.publicMethod.upData(['trueName']);
            this.dsSerName.active=true;
            this.userName.active=false;
        }else{
            this.dsSerName.active=false;
            this.userName.active=true;
        }
    },
    smrz() {
        // console.log(this.userName.getComponent(cc.EditBox).string);
        let phoneNum = DBU.getEditboxStr(this.phoneNum);
        if (isNaN(phoneNum) || phoneNum.length < 10) {
            cc.publicMethod.hint('请输入正确的手机号码');
            return;
        }
        let data = {
            appKey: cc.publicParameter.appKey,
            token: cc.publicParameter.token,
            trueName: DBU.getEditboxStr(this.userName)||cc.publicParameter.userInfo.trueName,
            phone: phoneNum
        }
        DBU.setSign(data);
        DBU.sendPostRequest('/hmmj-restful/player/updateTrueNameAndPhone', data, res => {

            cc.publicMethod.hint(res.message)
        }, err => {
            cc.publicMethod.hint(err.message);
        }, cc.publicParameter.infoUrl)
    },

    // update (dt) {},
});
