// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const DBU = require('DBUtility'), AnySdk = new (require('./AnysdkMgr'));
cc.static.AnysdkMgr=AnySdk;
console.log(DBU.setSign({
    "appKey":"app",
    "code":"011ZLlG00RlB1H1ctEH00yIDG00ZLlGC"
    }));
// 41f93c18aac091809073de1914fa2d08

cc.Class({
    extends: cc.Component,

    properties: {

        closeBtn: {
            default: null,
            type: cc.Node,
            displayName: '关闭按钮'
        },
        userAgreement: {
            default: null,
            type: cc.Node,
            displayName: '用户协议'
        },
        modalBg: {
            default: null,
            type: cc.Node,
            displayName: '模态框背景'
        },
        wechat: {
            default: null,
            type: cc.Node,
            displayName: '微信登录'
        },
        alipay: {
            default: null,
            type: cc.Node,
            displayName: '支付宝登录'
        },
        agree: {
            default: null,
            type: cc.Node,
            displayName: '是否点击用户协议'
        },
        hintModal: {
            default: null,
            type: cc.Node,
            displayName: '提示框'
        },
        ANDROID_API:null,
        IOS_API:null


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 微信登录初始化
        
        AnySdk.init.bind(this)();
        cc.publicMethod.hint(145456)
        // 预加载场景
        cc.director.preloadScene("Hall", function () {
            cc.log("主界面场景预加载完毕");
        });
        // 关闭fps
        cc.director.setDisplayStats(false)


        // 给关闭按钮添加监听事件
        this.closeBtn.on('touchstart', e => {
            e.target.parent.active = false;
            this.modalBg.active = false;
        });

        // 获取用户是否同意协议
        // console.log(this.agree);

        let clickAgree = this.agree.getComponent(cc.Toggle);
        this.wechat.mjid = 666;

        // 登录回调
        let login = (e) => {
            // console.log(e.target.mjid);

            if (clickAgree.isChecked) {
                cc.director.loadScene('Hall')
                cc.publicMethod.hint('已经登录', this.hintModal)
                return;
            }
            cc.publicMethod.hint('请同意协议');

           

        }

        // 微信登录事件
        this.wechat.on('touchstart', AnySdk.login.bind(this));



        // 支付宝登录事件
        this.alipay.on('touchstart',e=>{
            // AnySdk.wxpay.bind(this)();
            login();
        })


        // 测试 promise
        var promise1 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve('foo');
            }, 3000);
        });

        promise1.then(function (value) {
            console.log(value);
            // expected output: "foo"
        });

        console.log(promise1);
    },
    // wxlogin:AnySdk.login,



    /**
     *
     *
     * @param {*} e 点击事件的对象
     * @param {*} target 点击事件传递的模态框名字
     */
    scale(e, target) {
        this[target].active = true;
        this[target].runAction(cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1)));
        this.modalBg.active = true;
    },

    start() {

    },

    // update (dt) {},
});