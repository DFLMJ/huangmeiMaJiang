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
        userInfo: {
            default: null,
            type: cc.Node,
            displayName: '用户信息'
        },

        evpl: {
            default: null,
            type: cc.Node,
            displayName: '完善信息'
        },
        gold: {
            default: null,
            type: cc.Node,
            displayName: '更多金币'
        },
        message: {
            default: null,
            type: cc.Node,
            displayName: '左上角消息'
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
        customerService: {
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
        // toJoinRoom: {
        //     default: null,
        //     type: cc.Node,
        //     displayName: '加入房间'
        // },
        createRoom: {
            default: null,
            type: cc.Node,
            displayName: '创建房间'
        },
        goldField: {
            default: null,
            type: cc.Node,
            displayName: '金币场'
        },
        exploit: {
            default: null,
            type: cc.Node,
            displayName: '开发中'
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
        feedback: {
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
        joinRoom: {
            default: null,
            type: cc.Node,
            displayName: '加入房间'
        },
        topGold: {
            default: null,
            type: cc.Node,
            displayName: '顶部金币'
        },
        topRoomCard: {
            default: null,
            type: cc.Node,
            displayName: '顶部房卡'
        },
        topJewelNum: {
            default: null,
            type: cc.Node,
            displayName: '顶部元宝'
        },
        storeClassName: '',
        hallStart: '',
        hallAniName: ''
        // : {
        //     default: null,
        //     type: cc.Node,
        //     displayName: ''
        // },


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    //   eruda.get('console').config.set('overrideConsole', false);

        this.init();
        console.log(
            new DBU.fnQuantize()('12314234sdfsadfsd')
        );




    },
    fnScale: DBU.fnScale,
    init() {
        cc.publicMethod.sockToken=(cc.DBUtility.fnGetRequest()).token;
        console.log(cc.publicMethod.sockToken);


        // 将需要更新的节点内容加入数组中
        cc.publicParameter.infoObj.jewelNum.push(this.topJewelNum);
        // 判断创建房间的规则是否存在 如果不存在则创建开房规则
        let createRules = {
            roomRate: 0,
            endPoints: 8,
            inning: 1,
            nnt: 1,
            jebo: 0,
            floatNum: 2,
            robbedBar: 0,
            location: 0
        };
        cc.sys.localStorage.getItem('createRules') ? 0 : cc.sys.localStorage.setItem('createRules', JSON.stringify(createRules));

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



        // 循环添加主大厅中部内容的点击监听
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
                    this.hallAniName = aniName;
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
        this.fnPrepaidCalls();

        //监听左上角返回键
        this.hallBack.on('touchstart', e => {
            this.headUser.active = true;
            this.hallBack.active = false;

            let aniComponent = this[this.hallStart].getComponent(cc.Animation),
                hallMainAni = this.hallMain.getComponent(cc.Animation)
                , finished = () => {
                    hallMainAni.getComponent(cc.Animation).getAnimationState('module_Hall').wrapMode = cc.WrapMode.Normal;
                    hallMainAni.play();
                    aniComponent.off('finished', finished);
                };
            aniComponent.getAnimationState(this.hallAniName).wrapMode = cc.WrapMode.Reverse;
            aniComponent.on('finished', finished);
            aniComponent.play();
        });


        //轮询ajax
        let ajaxLxData = {
            appKey: cc.publicParameter.appKey
        };
        DBU.setSign(ajaxLxData);
        console.log(ajaxLxData);
        let intervalCallback = () => {
            DBU.sendPostRequest('/hmmj-restful/common/notice/rollNotice', ajaxLxData, res => {
                let datArr = res.datas.list, strList = [];
                datArr.forEach(item => {
                    strList.push(item.noticeContent);
                });
                console.log('dfg', strList);
                this.scrollTxt(strList);

            }, err => {
                console.log(err);
            }, cc.publicParameter.infoUrl);
        };
        intervalCallback();
        // 记住定时器id
        cc.publicParameter.setIntervalArr.HALL.push( setInterval(intervalCallback, 50000));

        // 获取玩家信息改变界面
        let userData = {
            appKey: cc.publicParameter.appKey,
            token: cc.publicParameter.token
        };
        DBU.setSign(userData);
        DBU.sendPostRequest('/hmmj-restful/player/playerInfo', userData, res => {
            cc.publicParameter.userInfo = res.datas;
            let zh = new DBU.fnQuantize(), rdata = res.datas, userName = rdata.nickName;

            DBU.loadTxt(userName.length <= 4 ? userName : userName.substr(0, 4) + '...', this.headUser.getChildByName('userName'));
            DBU.loadUrl(zh(rdata.vipPic), this.headUser.getChildByName('vip').getChildByName('vip'));
            DBU.loadUrl(zh(rdata.playerLogo), this.headUser.getChildByName('headMark').getChildByName('Mark').getChildByName('img'));
            DBU.loadTxt(zh(rdata.goldNum), this.topGold);
            DBU.loadTxt(zh(rdata.ticketNum), this.topRoomCard);
            DBU.loadTxt(zh(rdata.jewelNum), this.topJewelNum);

        }, err => {
            cc.publicMethod.hint(err.message);
        }, cc.publicParameter.infoUrl);


        // 获取连接websock的token
        DBU.sendPostRequest('/auth/remote', { token: (cc.DBUtility.fnGetRequest()).token }, res => {
            cc.publicParameter.sockData = res.data;
        // 开始连接sockit
            cc.publicMethod.fnServerSocket.bind(this)();
        }, err => {
            console.log(err)
        }, cc.publicParameter.sockUrl)


        

    },
    // -------onload---END----------




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
        let goodsId = 0, phoneNum = this.submodule.getChildByName('prepaidCalls').getChildByName('whiteBox').getChildByName('str');
        // 试用全局事件 监听
        cc.director.GlobalEvent.on('prepaidCalls', e => {
            goodsId = e.goodsId;
        }, this.submodule.getChildByName('prepaidCalls'));
        this.submodule.getChildByName('prepaidCalls').getChildByName('yesBtn').on('touchstart', e => {
            // 关闭窗口
            e.target.parent.active = false;
            e.target.parent.parent.active = false;

            // 调用支付方法
            console.log(goodsId, phoneNum.getComponent(cc.EditBox).string, '您提交了支付');
            let iphoneNum = phoneNum.getComponent(cc.EditBox).string;
            if (!iphoneNum || !goodsId || iphoneNum.length < 11) {
                cc.publicMethod.hint(`商品消息或手机号有误！`);
                return;
            }
            this.submitExchange(iphoneNum, goodsId);

        })
    },

    /**
     *提交兑换的方法
     *
     * @param {Number} iponeNum 
     * @param {String} goodsId
     */
    submitExchange(iponeNum, goodsId) {
        console.log(1113);

        let payData = {
            token: cc.publicParameter.token,
            appKey: cc.publicParameter.appKey,
            telPhone: iponeNum,
            goodsId: goodsId
        }
        DBU.setSign(payData);
        DBU.sendPostRequest("/hmmj-restful/goods/convert/buy", payData, res => {
            console.log(res);
            // 更新元宝数据
            cc.publicMethod.upData(['jewelNum']);
            cc.publicMethod.hint(res.message);
        }, err => {
            console.log(err);
            cc.publicMethod.hint(err.message)
        }, cc.publicParameter.infoUrl)
    },


    /**
     *滚动播放公告
     *
     * @param {String} txt 滚动播放的文字内容
     */
    scrollTxt(txtArr, txtArrIndex = 0) {
        // console.log(txtArr);

        this.broadcast.parent.parent.active = true;
        this.broadcast.stopAllActions();

        // console.log(this.broadcast.getChildByName('str').width);

        DBU.loadTxt(`${txtArr[txtArrIndex]}`, this.broadcast.getChildByName('str'));
        console.log(this.broadcast.getChildByName('str').getComponent(cc.Label).string);

        let width = this.broadcast.width, childrenWidth = this.broadcast.getChildByName('str').width / 2, i = 0;
        let act = cc.sequence(cc.moveTo(0, width + childrenWidth, 0), cc.moveTo(5, -(width + childrenWidth), 0), cc.callFunc(() => {
            console.log('进入回调');

            this.broadcast.stopAllActions();
            i++;
            if (i > 1) {
                this.broadcast.parent.parent.active = false;
                if (txtArr.length > ++txtArrIndex) {
                    this.scrollTxt(txtArr, txtArrIndex);
                }
                return;
            }
            this.broadcast.runAction(act);
        }));
        this.broadcast.runAction(act);
        // this.broadcast.runAction(act);


    },

    /**
     *商店大类
     *
     */
    fnStore(e, target) {
        cc.director.GlobalEvent.emit('storeClass', { target: target });


        // 判断商店窗口是否打开
        // if (!this.store.active) {
        //     this.fnScale('','store');            
        // }


        // // 改变商店类目的选项
        //         this.storeClass.forEach(item => {
        //             let child = item.getChildByName('spr'), name = target ? target : 'gold';
        //             if (item.name == name) {
        //                 child.active = true;
        //                 if (name=='vip') {
        //                     this.store.getChildByName('multiple').active=false;
        //                     this.store.getChildByName('vip').active=true;
        //                 } else {
        //                     this.store.getChildByName('vip').active=false;
        //                     this.store.getChildByName('multiple').active=true;

        //                     DBU.fnCreateItem(this.store.getChildByName('multiple').getComponent(cc.ScrollView).content,
        //                     this.storeItem, [{ title: name, money: 662, img: 'fk1' }, { title: `${name}*3`, money: 13, img: 'fk2' }, { title: name, money: 662, img: 'fk1' }, { title: `${name}*3`, money: 13, img: 'fk2' }, { title: name, money: 662, img: 'fk1' }, { title: `${name}*3`, money: 13, img: 'fk2' }, { title: name, money: 662, img: 'fk1' }, { title: `${name}*3`, money: 13, img: 'fk2' }],
        //                     (data, itemi) => {
        //                         const item = itemi.getChildByName('bg');
        //                         DBU.loadRes('/store/' + data.img, item.getChildByName('spr'));
        //                         DBU.loadTxt(data.title, item.getChildByName('title').getChildByName('str'));
        //                         DBU.loadTxt(data.money, item.getChildByName('btn').getChildByName('str'));
        //                     })    
        //                 }

        //             } else {
        //                 child.active = false;
        //             }
        //         });

    },
    fnConversion() {


    },




    // start() {


    // },

    // update (dt) {},
});
