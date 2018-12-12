let DBU = require('DBUtility');

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
        storeClassName: '',

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
        let touchArr = [this.storeCloseBtn]
        touchArr.forEach(item => {
            console.log(touchArr);

            item.on('touchstart', DBU.fnCloseBtn.bind(this))
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

            let child = item.getChildByName('spr'),name=e ? e.target.name : 'gold';
            // console.log(item.name===(e?e.touch.name:'gold'));
            // if (e) {
            //     console.log(55,e);

            // }

            if (item.name == name) {
                // console.log(111,e);

                child.active = true;
               this.fnCreateItem(this.store.getChildByName('scrollview').getChildByName('view').getChildByName('content'),this.storeItem,[{title:name,money:662,img:'fk1'}])
            } else {
                child.active = false;
            }
        })

    },

    /**
     生成列表预制体
     *
     * @param {*} target
     * @param {*} pre
     * @param {*} data
     */
    fnCreateItem(target, pre, data) {
        target.children.forEach((item,i)=>{
            console.log(i,'p');
            
            // item.parent=null;
            item.destroy();
        })
        for (let index = 0; index < data.length; index++) {
            const itemi = cc.instantiate(pre), item = itemi.getChildByName('bg');
            // DBU.loadUrl('Texture/store/' + data[index].img, item.getChildByName('spr'));
            // var self = this;
cc.loader.loadRes('/store/' + data[index].img,cc.SpriteFrame, function (err, ss) {
    item.getChildByName('spr').getComponent(cc.Sprite).spriteFrame = ss;
});

            // DBU.loadUrl(' https://iknowpc.bdimg.com/static/common/pkg/common_z.75a813d.png', item.getChildByName('spr'));
            console.log(data[index].title,item.getChildByName('title').getChildByName('str').getComponent(cc.Label).string);
            DBU.loadTxt(data[index].title, item.getChildByName('title').getChildByName('str'))
            DBU.loadTxt(data[index].money,item.getChildByName('btn').getChildByName('str'));            
            itemi.parent = target;
        }
    }

    // start() {


    // },

    // update (dt) {},
});
