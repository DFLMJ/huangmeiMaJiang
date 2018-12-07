let initf=require('Enter');

const { ccclass, property } = cc._decorator;
@ccclass
export default class NewClass extends cc.Component {
    @property(initf)
    public initf: initf = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property({
        type: cc.Node,
        displayName: '关闭按钮'
    })
    closeBtn: cc.Node = null;
    @property({
        type: cc.Node,
        displayName: '模态框'
    })
    modal: cc.Node = null;
    @property({
        type: cc.Node,
        displayName: '模态框背景'
    })
    modalBg: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.closeBtn.on(cc.Node.EventType.TOUCH_START,e=>{
            console.log(e.touch,'点击了');
        
            
        })
        console.log(this.initf);
        
        // this.initf.innfo()
    }

    start() {
        // this.gameExplain.getComponent(cc.Label).string;
        cc.find('Canvas').getComponent(cc.Label)
        // 关闭fps
        cc.director.setDisplayStats(false)
    }
    

    // update (dt) {}
}
