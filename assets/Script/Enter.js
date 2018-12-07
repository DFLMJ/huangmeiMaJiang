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
        agree:{
            default: null,
            type: cc.Node,
            displayName: '是否点击用户协议'
        },
        hintModal:{
            default: null,
            type: cc.Node,
            displayName: '提示框'
        }


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 预加载场景
        cc.director.preloadScene("Hall", function () {
            cc.log("主界面场景预加载完毕");
        });
        // 关闭fps
        cc.director.setDisplayStats(false)


        // 给关闭按钮添加监听事件
        this.closeBtn.on('touchstart', e => {
            e.target.parent.active=false;
            this.modalBg.active = false;
        });

        // 获取用户是否同意协议
        console.log(this.agree);
        
        let clickAgree=this.agree.getComponent(cc.Toggle);
        this.wechat.mjid=666;

        // 登录回调
        let login=(e)=>{
            console.log(e.target.mjid);
            
            if (clickAgree.isChecked) {
                cc.director.loadScene('Hall')
                this.hint('已经登录')
                return;
            }
            this.hint('请同意协议')

        }
        // 微信登录事件
        this.wechat.on('touchstart',login)
        // 支付宝登录事件
        this.alipay.on('touchstart',login)
    },

    /**
     *
     *
     * @param {*} txt 需要显示的提示
     */
    hint(str){
        console.log(str);
        
        this.hintModal.active=true;
        this.hintModal.getChildByName('str').getComponent(cc.Label).string=str;
        this.hintModal.runAction(cc.sequence(cc.show(),cc.scaleTo(0.01, 1.2, 1.2), cc.scaleTo(0.005, 1, 1),cc.delayTime(1),cc.callFunc(()=>{
        this.hintModal.active=false;
            
        })));
    },

    /**
     *
     *
     * @param {*} e 点击事件的对象
     * @param {*} target 点击事件传递的模态框名字
     */
    scale(e, target) {
        this[target].active=true;
        this[target].runAction(cc.sequence(cc.scaleTo(0.1, 1.2, 1.2), cc.scaleTo(0.1, 1, 1)));
        this.modalBg.active = true;
    },

    start() {

    },

    // update (dt) {},
});