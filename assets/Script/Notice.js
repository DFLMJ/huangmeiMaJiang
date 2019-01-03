const DBU = require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        noticeTitle: {
            default: null,
            type: cc.Node,
            displayName: '公告标题'
        },
        noticeContent: {
            default: null,
            type: cc.Node,
            displayName: '公告内容'
        },
    },
    onEnable() {
        let dataNotice={
            appKey:cc.publicParameter.appKey,
        }
        DBU.setSign(dataNotice);
        DBU.sendPostRequest('/hmmj-restful/common/notice/noticeList',dataNotice,res=>{
            // console.log(res.datas.list,res.datas.list[0].noticeTitle);
            
            DBU.loadTxt(res.datas.list[0].noticeTitle,this.noticeTitle);
            DBU.loadTxt(res.datas.list[0].noticeContent,this.noticeContent);
        },err=>{
         cc.publicMethod.hint(err.message);
        },cc.publicParameter.infoUrl);


        // let dataNotice={
        //     appkey:cc.publicParameter.appKey,
        // }
        // DBU.setSign(dataNotice);
        // DBU.sendPostRequest('',dataNotice,res=>{
        // },err=>{
        //  cc.publicMethod.hint(err.message);
        // },cc.publicParameter.infoUrl);
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
