const DBU = require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        conversionContent: {
            default: null,
            type: cc.Node,
            displayName: '兑换预制体父节点'
        },
        conversionPage: {
            default: null,
            type: cc.Prefab,
            displayName: '兑换页预制体'
        },
        commodity: {
            default: null,
            type: cc.Node,
            displayName: '兑换商品页按钮'
        },
        record: {
            default: null,
            type: cc.Node,
            displayName: '兑换记录页按钮'
        },
        recordParent: {
            default: null,
            type: cc.Node,
            displayName: '记录预制体父节点'
        },
        recordItem: {
            default: null,
            type: cc.Prefab,
            displayName: '记录预制体'
        },

    },

    // LIFE-CYCLE CALLBACKS:
    onEnable() {

        let fnGetdata = {
            appKey: cc.publicParameter.appKey,
            token: cc.publicParameter.token
        }

        DBU.setSign(fnGetdata);
        DBU.sendPostRequest('/hmmj-restful/goods/list', fnGetdata, this.fnGet.bind(this), err => {
            console.log(err);

        }, cc.publicParameter.infoUrl);
    },
    fnGet(res) {
        console.log(res);
        let resArr = res.datas.goodsList, dataArr = [];
        resArr.forEach(item => {
            // let {goodsId:goodsId,goodsLogo:goodsLogo,goodsName:goodsName,jewelNum:jewelNum}=item;
            dataArr.push(item);
        });
        this.fnCd(dataArr);
    },
    fnCd(data) {
        // 移除指定页面
        this.conversionContent.getComponent(cc.PageView).removeAllPages();
        let pageNum = 0, itemNum = 4;
        data.len = (data.length / itemNum > 1 ? parseInt(data.length / itemNum) : parseInt(data.length / itemNum)) + 1;
        data.remainder = data.length % itemNum == 0 ? itemNum : data.length % itemNum;
        // 循环指定页数
        for (; pageNum < data.len; pageNum++) {
            // 生成页面预制体 并添加入PageView
            let page = cc.instantiate(this.conversionPage);
            this.conversionContent.getComponent(cc.PageView).addPage(page);
            // 填充当前页需要填充的商品个数
            for (let index = 0; index < itemNum; index++) {
                const item = page.children[index];
                // 判断当前商品数是否有数据展示，如果没有的话就隐藏
                if (index < (pageNum == (data.len - 1) ? data.remainder : itemNum)) {
                    let { goodsId: goodsId, goodsLogo: goodsLogo, goodsName: goodsName, jewelNum: jewelNum } = data[pageNum * itemNum + index];
                    // 数据索引 等于 当前页数乘上 每页显示的个数再加当前页商品的索引数
                    item.goodsId = goodsId;
                    // console.log(goodsLogo);
                    DBU.loadUrl(cc.publicParameter.infoUrl + goodsLogo, item.getChildByName('conversion').getChildByName('sprBg'));
                    DBU.loadTxt(goodsName, item.getChildByName('conversion').getChildByName('str'));
                    DBU.loadTxt(jewelNum, item.getChildByName('je').getChildByName('money'));

                } else {
                    item.active = false;
                }
            }
        }
    },
    onLoad() {
        let click = e => {
            let target = this[e.target.name].parent.parent.getChildByName(e.target.name), node = ['commodity', 'record'];
            if (target.active) {
                return;
            }
            for (let i = 0; i < node.length; i++) {
                if (e.target.name == node[i]) {
                    target.active = !target.active;
                    e.target.parent.getChildByName(node[i]).getChildByName('click').active = true;
                    if (e.target.name == 'record') {
                        // 调用生成记录的函数
                        this.fnGetRecord();
                    }
                } else {
                    e.target.parent.getChildByName(node[i]).getChildByName('click').active = false;
                    target.parent.getChildByName(node[i]).active = false;
                }
            }
        };
        this.record.on('touchstart', click)
        this.commodity.on('touchstart', click)

    },

    /**
     *获取兑换记录
     *
     */
    fnGetRecord() {
        let dataRecord = {
            appKey: cc.publicParameter.appKey,
            token: cc.publicParameter.token
        }
        DBU.setSign(dataRecord);
        DBU.sendPostRequest('/hmmj-restful/goods/convert/list', dataRecord, res => {

            DBU.fnCreateItem(this.recordParent, this.recordItem, res.datas.goodsConvertList,
                (data, item) => {
                    DBU.loadUrl(cc.publicParameter.infoUrl + data.goodsLogo, item.getChildByName('img'));
                    DBU.loadTxt(`充值手机: ${data.telPhone}`, item.getChildByName('conversion').getChildByName('phoneNum'));
                    DBU.loadTxt(`元宝: ${data.jewelNum}`, item.getChildByName('conversion').getChildByName('jewelNum'));
                    DBU.loadTxt(`${data.convertDate}`, item.getChildByName('detail').getChildByName('time'));
                    DBU.loadTxt(`兑换ID: ${data.goodsConvertId}`, item.getChildByName('detail').getChildByName('id'));
                    let status=data.status;
                    DBU.loadTxt(`状态: ${status==1?'处理中':(status==2?'兑换成功':'兑换失败')}`, item.getChildByName('status'));
                });

        }, err => {
            cc.publicMethod.hint(err.message)

        }, cc.publicParameter.infoUrl)
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
