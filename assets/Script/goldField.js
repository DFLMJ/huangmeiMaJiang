
cc.Class({
    extends: cc.Component,

    properties: {
        matching: {
            default: null,
            type: cc.Node,
            displayName: '匹配框'
        },
        modalBg:{
            default: null,
            type: cc.Node,
            displayName: '模态框背景'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        // 监听匹配人数
        pomelo.on('wait', data => {
            console.log(data,6);
            let length = data.length;
            // 更新人数提示
            cc.DBUtility.loadTxt(`已为您匹配到 ${length} 人，还需要匹配 ${4-length} 人即可开始游戏`,this.matching.getChildByName('str'));
        });
        // 监听匹配成功事件
        pomelo.on('matching', data => {

            console.log('人数已经够了', data);
            cc.DBUtility.loadTxt(`游戏即将开始！`,this.matching.getChildByName('str'));

             // 销毁大厅计时器
        cc.publicParameter.setIntervalArr.HALL.forEach(item => {
            clearInterval(item);
        })
        // 初始化大厅计时器数组
        cc.publicParameter.setIntervalArr.HALL = [];

            cc.director.loadScene('Game');
        });
    },

    /**
     *匹配事件
     *
     */
    enter() {
        let self=this;
        
        // 发起匹配事件
        pomelo.request('game.entryHandler.matching_entry', {}, data => {
            if (data.code == 0) {
                // 匹配成功时
                cc.publicMethod.hint('正在匹配中');
            } else {
                // 已在匹配中时
                cc.publicMethod.hint('已进入匹配成功');
            }
            cc.DBUtility.fnScale.bind(self)({name:'45'},'matching');
            
            console.log('匹配点击', data);
        });
    },

    /**
     *取消匹配
     *
     */
    quitEnter(){
         pomelo.request('game.entryHandler.matching_exit', {}, data => {
            if (data.code == 0) {
                // 匹配成功时
                cc.publicMethod.hint('已退出匹配');
            } else {
                // 已在匹配中时
                cc.publicMethod.hint('没有已进入匹配');
            }
            this.modalBg.active=false;
            this.matching.active=false;
        });
        
    }


    // update (dt) {},
});
