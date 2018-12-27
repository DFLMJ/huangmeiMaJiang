const DBU = require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        wxImg: {
            default: null,
            type: cc.Node,
            displayName: '微信二维码'
        },
        qq: {
            default: null,
            type: cc.Node,
            displayName: 'QQ客服'
        },
        wx: {
            default: null,
            type: cc.Node,
            displayName: '微信客服'
        },
        wxgzh: {
            default: null,
            type: cc.Node,
            displayName: '微信公众号'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onEnable() {

        let dataCustomer={
            appKey:cc.publicParameter.appKey,
        }
        DBU.setSign(dataCustomer);
        console.log(dataCustomer);
        
        DBU.sendPostRequest('/hmmj-restful/common/notice/customInfo',dataCustomer,res=>{
            let {codePic}=res.datas;
            DBU.loadUrl(codePic,this.wxImg);
            // 还有QQ号 微信号 没有配置
        },err=>{
         cc.publicMethod.hint(err.message);
        },cc.publicParameter.infoUrl);
    }

    // update (dt) {},
});
