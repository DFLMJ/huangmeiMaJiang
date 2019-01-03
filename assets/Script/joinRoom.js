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
        keycode: {
            default: null,
            type: cc.Node,
            displayName: '数字键盘节点'
        },
        showNumber: {
            default: null,
            type: cc.Node,
            displayName: '显示数字的节点'
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        function pushChildren(node, arr, name) {
            node.children.forEach(key => {
                arr.push(key.getChildByName(name));
            })
        };
        let keyArr = this.keycode.children, numArr = [], showNumber = [], showNumberReverse=[];
        // 将keycode节点下面的num节点获取
        pushChildren(this.showNumber,showNumber,'num')
        // 将keycode节点下面的num节点获取
        pushChildren(this.showNumber,showNumberReverse,'num')
        showNumberReverse.reverse();

        keyArr.forEach(item => {
            // console.log(item.name);
            
            if (item.name == 'btn') {
                numArr.push(item);
            } else if (item.name == 'reset') {
                item.on('touchstart', e => {
                    for (const num of showNumber) {
                        if (num.getComponent(cc.Label).string=='') {
                            break;
                        }
                        num.getComponent(cc.Label).string = '';
                    }

                })
            } else {
                item.on('touchstart', e => {
                    for (const num of showNumberReverse) {
                        if (num.getComponent(cc.Label).string) {
                            num.getComponent(cc.Label).string = '';
                            break;
                        };

                    }
                })
            }
        });

        // 给数字按键添加监听
        numArr.forEach(item => {
            item.on('touchstart', e => {

                for (const num of showNumber) {
                    if (!num.getComponent(cc.Label).string) {
                        num.getComponent(cc.Label).string = e.target.getChildByName('num').getComponent(cc.Label).string;
                        if (num.getComponent(cc.Label).string) {
                            
                        };
                        break;
                    };
                }
            })
        })

    },

    // update (dt) {},
});
