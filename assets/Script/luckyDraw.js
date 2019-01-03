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
        record: {
            default: null,
            type: cc.Node,
            displayName: '中奖纪录'
        },
        myRecord: {
            default: null,
            type: cc.Node,
            displayName: '我的记录'
        },
        recordItem: {
            default: null,
            type: cc.Prefab,
            displayName: '中奖记录预制体'
        },
        myRecordItem: {
            default: null,
            type: cc.Prefab,
            displayName: '我的记录预制体'
        },
        classBtn: {
            default: null,
            type: cc.Node,
            displayName: '按钮'
        },
        fxBtn: {
            default: null,
            type: cc.Node,
            displayName: '按钮'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let data = {
            appKey: cc.publicParameter.appKey,
            token: cc.publicParameter.token,
            pageSize: 30,
            pageNum: 1
        }
        DBU.setSign(data);
        // 点击抽奖事件
        let isCheckDraw = false;

        this.zhizhen.on('touchstart', e => {
            if (!isCheckDraw) {
                isCheckDraw = true;
                DBU.sendPostRequest('/hmmj-restful/task/draw/lottery', data, res => {
                    let datas = res.datas;
                    if (datas.drawInfoId) {

                        this.award.children.forEach(item => {
                            if (item.drawConfigId == datas.drawInfoId) {
                                let time = Number((Math.abs(item.rotation / 360 * 100) / 1000).toFixed(2));
                                this.award.runAction(
                                    cc.sequence(cc.repeat(cc.rotateBy(1, 305), 2).easing(cc.easeIn(1))
                                        , cc.rotateTo(time, -(item.rotation)).easing(cc.easeOut(time + 0.3))
                                        , cc.callFunc(() => {
                                            isCheckDraw = false;
                                            cc.publicMethod.hint(`恭喜获得： ${datas.drawType == 1 ? '金币' : datas.drawType == 2 ? '房卡' : '元宝'}X${new DBU.fnQuantize()(datas.drawNum)}`);
                                        })
                                    )
                                )

                            }
                        });
                    } else {
                        cc.publicMethod.hint(res.message);
                        isCheckDraw = false;
                    }
                }, err => {
                    cc.publicMethod.hint(err.message);
                }, cc.publicParameter.infoUrl);
            }
        })


        // 配置抽奖参数
        DBU.sendPostRequest('/hmmj-restful/task/draw/drawConfigList', data, res => {
            let datas = res.datas.drawConfigList, child = this.award.children;
            // 剩余次数
            DBU.loadTxt(res.datas.drawNum, this.remainder);
            datas.forEach((item, index) => {
                let childItem = child[item.drawConfigId - 1]
                childItem.drawConfigId = item.drawConfigId;
                DBU.loadRes('/store/' + (item.drawType == 1 ? 'jb2' : item.drawType == 2 ? 'fk3' : 'jb6'), childItem);
                DBU.loadTxt(
                    `${item.drawType == 1 ? '金币' : item.drawType == 2 ? '房卡' : '元宝'}X${new DBU.fnQuantize()(item.drawNum)}`,
                    childItem.getChildByName('name')
                );
            });
        }, err => {
            cc.publicMethod.hint(err.message);
        }, cc.publicParameter.infoUrl)

        // 配置中奖记录
        let luckyList = () => {
            this.record.parent.parent.active = true;
            // this.record.parent.parent.getComponent(cc.ScrollView).scrollToBottom(10,false);
            // setInterval(() => {
                this.record.y += 1;
                console.log(this.record.y);

            // }, 10)


            this.myRecord.parent.parent.active = false;
            this.classBtn.children[0].getChildByName('anjian').runAction(cc.show());
            this.classBtn.children[1].getChildByName('anjian').runAction(cc.hide());
            DBU.sendPostRequest('/hmmj-restful/task/drawInfo/allList', data, res => {
                let datas = res.datas.drawInfoList;
                datas.forEach(item => {
                    let child = cc.instantiate(this.recordItem);
                    DBU.loadTxt(item.nickName.length > 10 ? item.nickName.slice(0, 9) + '...' : item.nickName, child.getChildByName('name'));
                    DBU.loadTxt((item.drawType == 1 ? '金币' : item.drawType == 2 ? '房卡' : '元宝') + 'X' + new DBU.fnQuantize()(item.drawNum), child.getChildByName('jp'));
                    this.record.addChild(child);
                });
                cc.publicMethod.hint(res.message)
            }, err => {
                cc.publicMethod.hint(err.message);
            }, cc.publicParameter.infoUrl)
        }

        // 配置我的中奖记录
        let luckyMyList = () => {
            this.record.parent.parent.active = false;
            this.myRecord.parent.parent.active = true;
            this.classBtn.children[0].getChildByName('anjian').runAction(cc.hide())
            this.classBtn.children[1].getChildByName('anjian').runAction(cc.show())
            DBU.sendPostRequest('/hmmj-restful/task/drawInfo/playerList', data, res => {
                let datas = res.datas.drawInfoList;
                datas.forEach(item => {
                    let child = cc.instantiate(this.myRecordItem);
                    DBU.loadTxt(item.drawDate, child.getChildByName('time'));
                    DBU.loadTxt((item.drawType == 1 ? '金币' : item.drawType == 2 ? '房卡' : '元宝') + 'X' + new DBU.fnQuantize()(item.drawNum), child.getChildByName('name'));
                    this.myRecord.addChild(child);
                });
                cc.publicMethod.hint(res.message);
            }, err => {
                cc.publicMethod.hint(err.message);
            }, cc.publicParameter.infoUrl)
        }
        luckyList();

        this.fxBtn.on('touchstart', e => {
            console.log('发起了分享');

        })
        this.classBtn.children.forEach((item, index) => {
            if (index == 0) {
                item.on('touchstart', luckyList)
            } else {
                item.on('touchstart', luckyMyList)
            }
        })

    },

    start() {
        // let time=Number((Math.abs(-167 / 360 * 100) / 1000).toFixed(2));
        // setTimeout(() => {
        //     this.award.runAction(
        //         cc.sequence(cc.repeat(cc.rotateBy(1, 305), 2).easing(cc.easeIn(1))
        //             , cc.rotateTo(time, -(-167)).easing(cc.easeOut(time+0.3))
        //             ,cc.callFunc(()=>{
        //                 console.log(this.award,'按钮恢复');
        //             })
        //         )
        //     )


        //     cc.callFunc(() => {
        //         console.log('动画执行完毕');
        //         // isCheckDraw=false;
        //     })

        // }, 2000)
    },

    // update (dt) {},
});
