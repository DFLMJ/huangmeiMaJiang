const DBU = require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        userName: {
            default: null,
            type: cc.Node,
            displayName: '用户名'
        },
        userImg: {
            default: null,
            type: cc.Node,
            displayName: '用户头像'
        },
        id: {
            default: null,
            type: cc.Node,
            displayName: '用户id'
        },
        ip: {
            default: null,
            type: cc.Node,
            displayName: 'ip'
        },
        gold: {
            default: null,
            type: cc.Node,
            displayName: '金币'
        },
        roomCard: {
            default: null,
            type: cc.Node,
            displayName: '房卡'
        },
        vip: {
            default: null,
            type: cc.Node,
            displayName: '用户vip'
        },
        sex: {
            default: null,
            type: cc.Node,
            displayName: '性别'
        },
        ingot: {
            default: null,
            type: cc.Node,
            displayName: '元宝'
        },

        // : {
        //     default: null,
        //     type: cc.Node,
        //     displayName: ''
        // },
    },
    onEnable(){
        let data={
            appKey:cc.publicParameter.appKey,
            token:cc.publicParameter.token
        };
        DBU.setSign(data);
        DBU.sendPostRequest('/hmmj-restful/player/playerInfo',data,res=>{
            let rdata=res.datas;
            
            DBU.loadTxt(rdata.nickName,this.userName);
            DBU.loadTxt(rdata.sex==1?'男':'女',this.sex);
            DBU.loadTxt('ID:'+rdata.playerId,this.id);
            DBU.loadTxt(rdata.vipName==''?'小主还没开通哟！':rdata.vipName,this.vip);
            DBU.loadUrl(rdata.playerLogo,this.userImg);
            DBU.loadTxt(rdata.goldNum,this.gold);
            DBU.loadTxt(rdata.ticketNum,this.roomCard);
            DBU.loadTxt('IP:'+rdata.ip,this.ip);
            DBU.loadTxt(rdata.jewelNum,this.ingot);

        },err=>{
            cc.publicMethod.hint(err.message);
        },cc.publicParameter.infoUrl)
    },

    // onEnable(){
    //     let data={
    //         appKey:cc.publicParameter.appKey,
    //         token:cc.publicParameter.token
    //     }
    //     DBU.setSign(data);
    //     DBU.sendPostRequest('/hmmj-restful/player/playerInfo',data,res=>{

    //     },err=>{
    //         cc.publicMethod.hint(err.message);
    //     })
    // }

});
