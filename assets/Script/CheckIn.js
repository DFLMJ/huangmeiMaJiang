const DBU = require('DBUtility');


cc.Class({
    extends: cc.Component,

    properties: {

        now: {
            default: null,
            type: cc.Prefab,
            displayName: '未签'
        },
        before: {
            default: null,
            type: cc.Prefab,
            displayName: '已签到'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.setDisplayStats();

        let data = {
            appKey: cc.publicParameter.appKey,
            token: cc.publicParameter.token
        };
        DBU.setSign(data);
        let isCheckIn = false;
        DBU.sendPostRequest('/hmmj-restful/task/signInConfig/list', data, res => {
            let datas = res.datas.signInConfigList, parent = this.node.getChildByName('body').children,
                nowChild = (isCheck, i, item, target) => {
                    let sbefault = cc.instantiate(this.before);
                    let gold = item.giveGoldNum != 0 ? `金币:${new DBU.fnQuantize()(item.giveGoldNum)}\n` : '',
                        roomCard = item.giveTicketNum != 0 ? `房卡:${new DBU.fnQuantize()(item.giveTicketNum)}` : '';
                    console.log(gold + roomCard);

                    DBU.loadTxt(gold + roomCard, sbefault.getChildByName('value'));
                    DBU.loadTxt(`第${i + 1}天`, sbefault.getChildByName('str'));
                    if (isCheck) {
                        // 插入节点到指定的地方
                        let index = target.getSiblingIndex();
                        target.parent.insertChild(sbefault, index);
                        // target.off('touchstart', callBacks);
                        target.destroy();
                    } else {
                        console.log(2226, i);

                        sbefault.parent = parent[i > 3 ? 1 : 0];
                    }

                };
            datas.forEach((item, i) => {
                if (item.dayNum <= item.earlySignInNum) {
                    console.log(i, '已签到');

                    nowChild(false, i, item)
                } else {
                    let sbefault = cc.instantiate(this.now);
                    if (item.earlySignInNum == i) {
                        sbefault.on('touchstart', e => {
                            console.log('点击了今日签到');
                            if (!isCheckIn) {

                                let callBacks = (res) => {
                                    // 插入节点到指定的地方
                                    nowChild(true, i, item, target);
                                    isCheckIn = true;
                                    parent[1].getChildByName('lxqd').getComponent(cc.Animation).play('checkInLxqd');
                                    e.target.off('touchstart', callBacks);
                                };
                                // 发送签到请求
                                DBU.sendPostRequest('/hmmj-restful/task/signInConfig/playerSignIn', data, callBacks, err => {
                                    cc.publicMethod.hint(err.message);
                                }, cc.publicParameter.infoUrl)
                            };

                        })
                    };
                    sbefault.parent = parent[i > 3 ? 1 : 0];
                    console.log(sbefault.getChildByName('str').getComponent(cc.Label));

                    DBU.loadTxt(`第${i + 1}天`, sbefault.getChildByName('str'));

                }
            });

        }, err => {
            cc.publicMethod.hint(err.message);
        }, cc.publicParameter.infoUrl)
    },

    // start() {
    //     console.log('start');

    // },

    // update (dt) {},
});
