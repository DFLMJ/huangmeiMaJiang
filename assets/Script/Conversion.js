const DBU = require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        conversionContent: {
            default: null,
            type: cc.Node,
            displayName: '兑换预制体父节点'
        },
        conversionItem: {
            default: null,
            type: cc.Prefab,
            displayName: '兑换预制体'
        },
        conversionPage: {
            default: null,
            type: cc.Prefab,
            displayName: '兑换页预制体'
        },

    },

    // LIFE-CYCLE CALLBACKS:
    onEnable() {
        this.fnCd();
    },
    fnCd() {
        let data = [{ sprBg: '1hfq.png', spr: '1yhf.png', money: '789' },{ sprBg: '1hfq.png', spr: '1yhf.png', money: '789' },{ sprBg: '1hfq.png', spr: '1yhf.png', money: '789' },{ sprBg: '1hfq.png', spr: '1yhf.png', money: '789' },{ sprBg: '1hfq.png', spr: '1yhf.png', money: '789' },{ sprBg: '1hfq.png', spr: '1yhf.png', money: '789' },], pageNum = 0, itemNum = 4;
        data.len = (data.length / itemNum > 1 ? parseInt(data.length / itemNum) : parseInt(data.length / itemNum)) + 1;
        data.remainder = data.length % itemNum == 0 ? itemNum : data.length % itemNum;
        for (; pageNum < data.len; pageNum++) {
            console.log(pageNum,page);
        
            let page = cc.instantiate(this.conversionPage);

            page.parent = this.conversionContent;
            // for (let index = 0; index < itemNum; index++) {
            //     const item = page.children[index];

            //     DBU.loadRes('/Conversion/' + data.sprBg, item.getChildByName('conversion').getChildByName('sprBg'));
            //     DBU.loadRes('/Conversion/' + data.spr, item.getChildByName('conversion').getChildByName('spr'));
            //     DBU.loadTxt(data.money, item.getChildByName('je').getChildByName('money'))

            // }

          

    

        }


    },

    // onLoad () {
    //     // this.fnCd();
    //     // this.enemyPool = new cc.NodePool();
    //     // let initCount = 5;
    //     // for (let i = 0; i < initCount; ++i) {
    //     //     let enemy = cc.instantiate(this.enemyPrefab); // 创建节点
    //     //     this.enemyPool.put(enemy); // 通过 putInPool 接口放入对象池
    //     // }
    // },

    // start () {

    // },

    // fnCreateItem(target, pre, data, callBack) {
    //     target.children.forEach((item, i) => {
    //         console.log(i, 'p');
    //         // item.parent=null;
    //         item.destroy();
    //     })
    //     for (let index = 0; index < data.length; index++) {
    //         callBack(data[index], item);
    //         pre.parent = target;
    //     }
    // },

    // update (dt) {},
});
