// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 当前游戏状态 0-3 代表 准备、游戏中、结束
        this.GameType = 0;
        // 开始游戏之后头像坐标
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




        // 发起匹配事件
        pomelo.request('game.entryHandler.matching_entry', {}, data => {
            if (data.code == 0) {
                // 匹配成功时
                cc.publicMethod.hint('匹配成功');
            } else {
                // 已在匹配中时
                cc.publicMethod.hint('已进入匹配成功');
            }

            // 获取匹配人数


            console.log('匹配点击', data);
        })

        

        pomelo.on('wait',data=>{
            console.log(data);
        })
    },

    start() {
        // console.log(this.k);

    },

    // update (dt) {},
});
