const DBU = require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        vip: {
            default: null,
            type: cc.Node,
            displayName: '商店vip'
        },
        box: {
            default: null,
            type: cc.Node,
            displayName: '金币、房卡盒子'
        },
        next: {
            default: null,
            type: cc.Node,
            displayName: '下一页'
        },
        last: {
            default: null,
            type: cc.Node,
            displayName: '上一页'
        },
        storeItem: {
            default: null,
            type: cc.Prefab,
            displayName: '商品预制体'
        },
        vipItem: {
            default: null,
            type: cc.Prefab,
            displayName: 'vip预制体'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.store = this.node;
        this.modalBg = cc.find('Canvas/modalBox/bg');
        this.storeClass = cc.find('Canvas/modalBox/modal/store/menu').children;
        // 监听商店商店类别按钮
        cc.director.GlobalEvent.on('storeClass', data => {
            console.log(data);
            if (!this.node.active == true) {
                DBU.fnScale.bind(this)('', 'store');
            }
            this.fnUpdateMenu(-1, data.target);
        })

        // 查找 pageview
        let PageView = this.node.getChildByName('vip').getChildByName('view').getComponent(cc.PageView);

        // 下一页按钮监听
        this.next.on('touchstart', e => {
            PageView.setCurrentPageIndex(PageView.getCurrentPageIndex()-1);
        })
        // 上一页按钮监听
        this.last.on('touchstart', e => {
            PageView.setCurrentPageIndex(PageView.getCurrentPageIndex()+1);
        })
    },
    // ------onload----END----
    fnUpdateMenu(e, target) {
        // 改变商店类目的选项
        let menu = this.node.getChildByName('menu').children;
        menu.forEach(item => {
            let child = item.getChildByName('spr'), name = target ? target : 'vip';
            if (item.name == name) {
                child.active = true;

                let AjaxData = {
                    appKey: cc.publicParameter.appKey,
                    token: cc.publicParameter.token
                }

                if (name == 'vip') {


                    DBU.setSign(AjaxData);
                    DBU.sendPostRequest('/hmmj-restful/account/vipRechargeConfig/list', AjaxData, res => {
                        let datas = res.datas['vipRechargeConfigList'];
                        // console.log(datas);

                        this.fnCd(datas);



                        this.store.getChildByName('multiple').active = false;
                        this.store.getChildByName('vip').active = true;
                    }, err => {
                        cc.publicMethod.hint(err.message);
                    }, cc.publicParameter.infoUrl)






                } else {
                    this.store.getChildByName('vip').active = false;
                    this.store.getChildByName('multiple').active = true;



                    let dName = name == 'gold' ? 'gold' : 'ticket';
                    DBU.setSign(AjaxData);
                    DBU.sendPostRequest('/hmmj-restful/account/' + dName + 'RechargeConfig/list', AjaxData, res => {
                        DBU.fnCreateItem(this.store.getChildByName('multiple').getComponent(cc.ScrollView).content,
                            this.storeItem, res.datas[dName + 'RechargeConfigList'],
                            (data, itemi) => {
                                // console.log(itemi);
                                const item = itemi.getChildByName('bg');
                                DBU.loadUrl(cc.publicParameter.infoUrl + data[dName + 'Pic'], item.getChildByName('spr'));
                                DBU.loadTxt(data[dName + 'Name'], item.getChildByName('title').getChildByName('str'));
                                DBU.loadTxt(Number(data['buyPrice']), item.getChildByName('btn').getChildByName('str'));
                            })



                    }, err => {
                        cc.publicMethod.hint(err.message);
                    }, cc.publicParameter.infoUrl)




                }

            } else {
                child.active = false;
            }
        });
    },
    fnCd(data) {
        // 移除指定页面
        // console.log(this.node.getChildByName('vip').getComponent(cc.PageView));
        let PageView = this.node.getChildByName('vip').getChildByName('view').getComponent(cc.PageView);
        PageView.removeAllPages();
        let pageNum = 0, itemNum = 4;
        data.len = (data.length / itemNum > 1 ? parseInt(data.length / itemNum) : parseInt(data.length / itemNum)) + 1;
        console.log(data.len);

        data.remainder = data.length % itemNum == 0 ? itemNum : data.length % itemNum;
        // 循环指定页数
        for (; pageNum < data.len; pageNum++) {
            // 生成页面预制体 并添加入PageView
            let page = cc.instantiate(this.vipItem);
            PageView.addPage(page);
            // 填充当前页需要填充的商品个数
            for (let index = 0; index < itemNum; index++) {
                const item = page.children[index];
                // console.log(item);

                // 判断当前商品数是否有数据展示，如果没有的话就隐藏
                if (index < (pageNum == (data.len - 1) ? data.remainder : itemNum)) {
                    // console.log(data, pageNum * itemNum + index);

                    let datas = data[pageNum * itemNum + index];
                    // 数据索引 等于 当前页数乘上 每页显示的个数再加当前页商品的索引数
                    item.vipRechargeConfigId = datas.vipRechargeConfigId;
                    // console.log(goodsLogo);
                    // DBU.loadTxt(data.vipLevel, item.getChildByName('').getChildByName(''));
                    let strBox = item.getChildByName('strBox');
                    DBU.loadTxt(datas.vipName, item.getChildByName('vip').getChildByName('str'));
                    DBU.loadUrl(cc.publicParameter.infoUrl + datas.vipPic, item.getChildByName('vip').getChildByName('img'));
                    DBU.loadTxt(datas.buyPrice, strBox.getChildByName('jg').getChildByName('str'));
                    // DBU.loadTxt(data.promptlyGiveGold,  strBox.getChildByName('lzgold'));
                    // DBU.loadTxt(data.promptlyGiveTickets,  strBox.getChildByName('mrfk')+'张');
                    DBU.loadTxt(datas.dayGiveGold, strBox.getChildByName('mrjb'));
                    DBU.loadTxt(datas.dayGiveTickets + '张', strBox.getChildByName('mrfk'));
                    DBU.loadTxt(datas.validDayNum + '天', strBox.getChildByName('yxq'));


                    // DBU.loadUrl(cc.publicParameter.infoUrl + goodsLogo, item.getChildByName('conversion').getChildByName('sprBg'));
                    // DBU.loadTxt(goodsName, item.getChildByName('conversion').getChildByName('str'));
                    // DBU.loadTxt(jewelNum, item.getChildByName('je').getChildByName('money'));

                } else {
                    item.active = false;
                }
            }
        }
    },

    // update (dt) {},
});
