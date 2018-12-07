let DBU=require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        Prompt: {
            default: null,
            type: cc.Node,
            displayName: '提示框'
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
        // : {
        //     default: null,
        //     type: cc.Node,
        //     displayName: ''
        // },


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.init();

        this.scrollTxt('恭喜王思聪吃热狗、王思聪吃热狗、王思聪吃热狗成为全榜第一')

    },
    init() {
        console.log('你初始化了文件');
        let user={
            userName:'王思聪吃热狗',
            id:666661,
            gold:565656566,
            fk:235,
            yb:5658
        }

    },

    
    /**
     *滚动播放公告
     *
     * @param {String} txt 滚动播放的文字内容
     */
    scrollTxt(txt) {
        this.broadcast.stopAllActions();
        this.broadcast.parent.parent.active=true;
        DBU.loadTxt(`公告：<size=20>${txt}</size>`,this.broadcast);
        let width = this.broadcast.width, parentWidth = this.broadcast.parent.width / 2, i = 0;
        let act = cc.sequence(cc.moveTo(0, width + parentWidth, 0), cc.moveTo(10, -(width + parentWidth), 0), cc.callFunc(() => {
            console.log('进入回调');

            this.broadcast.stopAllActions();
            i++;
            if (i > 1) {
                this.broadcast.parent.parent.active=false;
                return;
            }
            this.broadcast.runAction(act);
        }));
        this.broadcast.runAction(act);
    }



    // start() {


    // },

    // update (dt) {},
});
