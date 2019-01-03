const DBU = require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        content: {
            default: null,
            type: cc.Node,
            displayName: '领取内容'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let data = {
            appKey: cc.publicParameter.appKey,
            token: cc.publicParameter.token,
        }
        DBU.setSign(data);

        // 获取每日赠送配置
        DBU.sendPostRequest('/hmmj-restful/task/dayGive/info', data, res => {
            DBU.loadTxt(new DBU.fnQuantize()(res.datas.giveGoldNum) + '金币', this.content.getChildByName('goldNum'));
            DBU.loadTxt(res.datas.dayGiveNum + '次', this.content.getChildByName('num'));
            this.content.getChildByName('btn').on('touchstart', e => {
                // 发送领取金币请求
                DBU.sendPostRequest('/hmmj-restful/task/dayGive/playerDayGive', data, res => {
                    cc.publicMethod.hint(res.message)
                }, err => {
                    cc.publicMethod.hint(err.message);
                }, cc.publicParameter.infoUrl)
            })
            this.content.getChildByName('goldNum');
            cc.publicMethod.hint(res.message)
        }, err => {
            cc.publicMethod.hint(err.message);
        }, cc.publicParameter.infoUrl)

    },

    start() {

    },

    // update (dt) {},
});
