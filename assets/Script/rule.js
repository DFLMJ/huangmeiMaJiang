const DBU = require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        content: {
            default: null,
            type: cc.Node,
            displayName: '内容'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable(){
        let data={
            appKey:cc.publicParameter.appKey,
            token:cc.publicParameter.token
        }
        DBU.setSign(data);
        DBU.sendPostRequest('/hmmj-restful/common/playRule/playRuleInfo',data,res=>{
            DBU.loadTxt(res.datas.ruleContent,this.content);
        },err=>{
            cc.publicMethod.hint(err.message);
        },cc.publicParameter.infoUrl)
    }
    // update (dt) {},
});
