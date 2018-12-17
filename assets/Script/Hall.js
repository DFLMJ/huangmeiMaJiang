const DBU = require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        Prompt: {
            default: null,
            type: cc.Node,
            displayName: '提示框'
        },
        headUser: {
            default: null,
            type: cc.Node,
            displayName: '头部用户信息'
        },

        EVPI: {
            default: null,
            type: cc.Node,
            displayName: '完善信息'
        },
        gold: {
            default: null,
            type: cc.Node,
            displayName: '更多金币'
        },
        roomCard: {
            default: null,
            type: cc.Node,
            displayName: '更多房卡'
        },
        notice: {
            default: null,
            type: cc.Node,
            displayName: '顶部公告'
        },
        broadcast: {
            default: null,
            type: cc.Node,
            displayName: '滚动通知'
        },
        share: {
            default: null,
            type: cc.Node,
            displayName: '分享'
        },
        setting: {
            default: null,
            type: cc.Node,
            displayName: '设置'
        },
        callCenter: {
            default: null,
            type: cc.Node,
            displayName: '客服'
        },
        rankingList: {
            default: null,
            type: cc.Node,
            displayName: '排行榜'
        },
        rankingListItem: {
            default: null,
            type: cc.Prefab,
            displayName: '排行榜子类预制体'
        },
        rankingList: {
            default: null,
            type: cc.Node,
            displayName: '排行榜'
        },
        myList: {
            default: null,
            type: cc.Node,
            displayName: '排行榜中的我'
        },
        friendsCircle: {
            default: null,
            type: cc.Node,
            displayName: '亲友圈'
        },
        toJoinRoom: {
            default: null,
            type: cc.Node,
            displayName: '加入房间'
        },
        createARoom: {
            default: null,
            type: cc.Node,
            displayName: '创建房间'
        },
        goldField: {
            default: null,
            type: cc.Node,
            displayName: '金币场'
        },
        arena: {
            default: null,
            type: cc.Node,
            displayName: '比赛场'
        },
        checkIn: {
            default: null,
            type: cc.Node,
            displayName: '签到'
        },
        luckyDraw: {
            default: null,
            type: cc.Node,
            displayName: '抽奖'
        },
        store: {
            default: null,
            type: cc.Node,
            displayName: '商城'
        },
        storeBtn: {
            default: null,
            type: cc.Node,
            displayName: '商城按钮'
        },
        storeCloseBtn: {
            default: null,
            type: cc.Node,
            displayName: '商城关闭按钮'
        },
        conversion: {
            default: null,
            type: cc.Node,
            displayName: '兑换'
        },

        rule: {
            default: null,
            type: cc.Node,
            displayName: '玩法'
        },
        result: {
            default: null,
            type: cc.Node,
            displayName: '战绩'
        },
        task: {
            default: null,
            type: cc.Node,
            displayName: '任务'
        },
        coupleBack: {
            default: null,
            type: cc.Node,
            displayName: '反馈'
        },
        storeItem: {
            default: null,
            type: cc.Prefab,
            displayName: '商品预制体'
        },
        storeClass: {
            default: [],
            type: [cc.Node],
            displayName: '商品种类'
        },
        modalBg: {
            default: null,
            type: cc.Node,
            displayName: '背景阻隔层'
        },
        CloseBtn: {
            default: [],
            type: cc.Node,
            displayName: '关闭按钮集合'
        },
        submodule: {
            default: null,
            type: cc.Node,
            displayName: '提交模态框'
        },
        hallBack: {
            default: null,
            type: cc.Node,
            displayName: '左上角返回键'
        },
        hallMain: {
            default: null,
            type: cc.Node,
            displayName: '主大厅'
        },
        hallGoldField: {
            default: null,
            type: cc.Node,
            displayName: '金币场'
        },

        storeClassName: '',
        hallStart: '',
        hallAniName:''
        // : {
        //     default: null,
        //     type: cc.Node,
        //     displayName: ''
        // },


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.init();

        this.scrollTxt('恭喜王思聪吃热狗、王思聪吃热狗、王思聪吃热狗成为全榜第一');

        this.fnStore()
        // console.log(this.hallMain.getComponent(cc.Animation).clips);

        // this.hallMain.getComponent(cc.Animation).getAnimationState('module_Hall').wrapMode=cc.WrapMode.Normal;
        // this.hallMain.getComponent(cc.Animation).play();

    },
    fnScale: DBU.fnScale,
    init() {
        console.log('你初始化了文件');
        let user = {
            userName: '王思聪吃热狗',
            id: 666661,
            gold: 565656566,
            fk: 235,
            yb: 5658
        }
        //循环遍历添加点击事件
        this.CloseBtn.forEach((item, i) => {

            if (item) {
                item.on('touchstart', DBU.fnCloseBtn.bind(this))
            };

        })



        // 循环添加主大厅的点击监听
        let hallAniOn = [this.goldField];
        hallAniOn.forEach(item => {
            item.on('touchstart', e => {
                this.hallStart = e.target.name;
                console.log(this.hallStart);
                let l = 1, name = this.hallStart, aniName = '', aniComponent = this[this.hallStart].getComponent(cc.Animation), hallMainAni = this.hallMain.getComponent(cc.Animation)
                    , finished = () => {
                        aniComponent.getAnimationState(aniName).wrapMode = cc.WrapMode.Normal;
                        aniComponent.play();

                        hallMainAni.off('finished', finished);
                    };
                if (name == 'hallGoldField') {
                    aniName = 'goldField_Hall';
                    this.hallAniName=aniName;
                } else {
                    return;
                }
                this.headUser.active = false;
                this.hallBack.active = true;
                hallMainAni.on('finished', finished);
                // 逆向播放动画
                hallMainAni.getAnimationState('module_Hall').wrapMode = cc.WrapMode.Reverse;
                hallMainAni.play();
            })
        })



        // 兑换
        this.fnPrepaidCalls()

        //监听左上角返回键
        this.hallBack.on('touchstart', e => {
            this.headUser.active = true;
            this.hallBack.active = false;
            
            let aniComponent = this[this.hallStart].getComponent(cc.Animation),
            hallMainAni=this.hallMain.getComponent(cc.Animation)
            ,finished=()=>{
                hallMainAni.getComponent(cc.Animation).getAnimationState('module_Hall').wrapMode = cc.WrapMode.Normal;
                hallMainAni.play();
                aniComponent.off('finished',finished);
            };
            aniComponent.getAnimationState(this.hallAniName).wrapMode = cc.WrapMode.Reverse;
            aniComponent.on('finished',finished);
            aniComponent.play();
        })


    },
    // --------------兑换充值卡-----whiteBox
    fnPrepaidCalls() {
        // 话费充值窗口
        this.submodule.getChildByName('prepaidCalls').on('prepaidCalls', e => {
            console.log(e, 555);
        })
        this.submodule.getChildByName('prepaidCalls').getChildByName('ModalClose').on('touchstart', e => {
            e.target.parent.active = false;
            e.target.parent.parent.active = false;
        })
        let prepaidCallsNum = 0, phoneNum = this.submodule.getChildByName('prepaidCalls').getChildByName('whiteBox').getChildByName('str');
        // 试用全局事件 监听
        cc.director.GlobalEvent.on('prepaidCalls', e => {
            prepaidCallsNum = e.num;
        }, this.submodule.getChildByName('prepaidCalls'))
        this.submodule.getChildByName('prepaidCalls').getChildByName('yesBtn').on('touchstart', e => {

            // 调用支付方法
            console.log(prepaidCallsNum, phoneNum.getComponent(cc.EditBox).string, '您提交了支付');
        })
    },


    /**
     *滚动播放公告
     *
     * @param {String} txt 滚动播放的文字内容
     */
    scrollTxt(txt) {
        this.broadcast.stopAllActions();
        this.broadcast.parent.parent.active = true;
        DBU.loadTxt(`公告：<size=20>${txt}</size>`, this.broadcast);
        let width = this.broadcast.width, parentWidth = this.broadcast.parent.width / 2, i = 0;
        let act = cc.sequence(cc.moveTo(0, width + parentWidth, 0), cc.moveTo(10, -(width + parentWidth), 0), cc.callFunc(() => {
            console.log('进入回调');

            this.broadcast.stopAllActions();
            i++;
            if (i > 1) {
                this.broadcast.parent.parent.active = false;
                return;
            }
            this.broadcast.runAction(act);
        }));
        this.broadcast.runAction(act);
    },

    /**
     *商店大类
     *
     */
    fnStore(e) {
        this.storeClass.forEach(item => {
            let child = item.getChildByName('spr'), name = e ? e.target.name : 'gold';
            if (item.name == name) {
                child.active = true;
                DBU.fnCreateItem(this.store.getChildByName('scrollview').getChildByName('view').getChildByName('content'),
                    this.storeItem, [{ title: name, money: 662, img: 'fk1' }, { title: `${name}*3`, money: 13, img: 'fk2' }],
                    (data, itemi) => {
                        const item = itemi.getChildByName('bg');
                        DBU.loadRes('/store/' + data.img, item.getChildByName('spr'));
                        DBU.loadTxt(data.title, item.getChildByName('title').getChildByName('str'));
                        DBU.loadTxt(data.money, item.getChildByName('btn').getChildByName('str'));
                    })
            } else {
                child.active = false;
            }
        })

    },
    fnConversion() {


    },




    // start() {


    // },

    // update (dt) {},
});
