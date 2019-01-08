var userHeadItem = cc.Class({
    name: 'userHeadItem',
    properties: {
        ok: cc.Node,
        okStr: cc.Node,
        itemName: cc.Node,
        userScore: cc.Node,
        userSF: cc.Node,
    }
}),pool=require('EnemyPool');
console.log(pool.init);


cc.Class({
    extends: cc.Component,

    properties: {

        shareBtnArr: {
            default: [],
            type: cc.Node,
            displayName: '分享按钮集合'
        },
        copyBtnArr: {
            default: [],
            type: cc.Node,
            displayName: '复制按钮集合'
        },
        userArr: {
            default: [],
            type: userHeadItem,
            displayName: '用户信息集合'
        },

        topMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '上未打麻将'
        },
        tophMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '上已打麻将'
        },
        leftMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '左未打麻将'
        },
        leftlMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '左已打麻将'
        },
        downMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '下未打麻将'
        },
        downhMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '下已打麻将'
        },
        rightMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '右未打麻将'
        },
        righthMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '右已打麻将'
        },

    },

    // LIFE-CYCLE CALLBACK:

    onLoad() {
        // 当前游戏状态 0-3 代表 准备、游戏中、结束
        this.GameType = 0;
        // 开始游戏之后头像坐标  s-代表需要准备游戏的场景坐标  ing-代表不需要准备的游戏场景，也是准备游戏之后的头像坐标
        this.headCoords = {
            s: { v1: cc.v2(0, -34), v2: cc.v2(-290, 0), v3: cc.v2(0, -34), v4: cc.v2(290, 0) },
            ing: { v1: cc.v2(-347, 29), v2: cc.v2(-609, 69), v3: cc.v2(-347, -26), v4: cc.v2(609, 69) }
        };

        // 遍历加载分享按钮
        this.shareBtnArr.forEach(item => {
            item.on('touchstart', cc.publicMethod.share);
        });
        // 遍历加载复制房间号按钮
        this.copyBtnArr.forEach(item => {
            item.on('touchstart', cc.publicMethod.copy);
        });

        // 加载玩家本人的信息
        // this.fnUpdateUser(3, true);

        // 创建麻将对象池，减少游戏过程中的卡顿


    },
    // 加载玩家本人的信息
    fnUpdateUser(i, isInfo) {
        if (i < 2) {
            this.userArr[i].ok.active = true;
            this.userArr[i].okStr.active = false;
        };
        if (isInfo) {
            cc.DBUtility.loadTxt(cc.publicParameter.sockInfo.userName.substring(0, 3) + '..', this.userArr[i].itemName);
            cc.DBUtility.loadTxt(new cc.DBUtility.fnQuantize()(cc.publicParameter.sockInfo.goldNum), this.userArr[i].userScore);
            cc.DBUtility.loadUrl(cc.publicParameter.sockInfo.userLogo, this.userArr[i].userSF);
        }
    },
    start() {
        // console.log(this.k);

    },

    // update (dt) {},
});
