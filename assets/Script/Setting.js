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
        soundEffect: {
            default: null,
            type: cc.Node,
            displayName: '音效'
        },
        music: {
            default: null,
            type: cc.Node,
            displayName: '音乐'
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.plan(this.soundEffect)
        this.plan(this.music)
    },
    setSoundEffect(e) {
        this.setMetho('sSoundEffect', e);
    },
    setMusic(e) {
        this.setMetho('sMusic', e);
    },
    setLanguage(e) {
        if (e.target.name == 1) {
            cc.sys.localStorage.setItem('sLanguage', 1)
            console.log('普通话');

        } else {
            cc.sys.localStorage.setItem('sLanguage', 2)

            console.log('方言');

        }
    },
    setMetho(name, e) {
        // 储存数据
        let progress = e.node.getComponent(cc.Slider).progress;
        cc.sys.localStorage.setItem(name, progress);
        // 控制音量

    }
    ,
    plan(target) {
        let slider = target.getComponent(cc.Slider);
        let progressbar = target.getComponent(cc.ProgressBar);

        if (slider == null || progressbar == null) {
            return;
        }

        progressbar.progress = slider.progress;

        slider.node.on('slide', event => {
            progressbar.progress = slider.progress;
        });
    }

    // update (dt) {},
});
