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
        // : {
        //     default: null,
        //     type: cc.Node,
        //     displayName: ''
        // },
        // : {
        //     default: null,
        //     type: cc.Node,
        //     displayName: ''
        // },
        radioList: {
            default: null,
            type: cc.Node,
            displayName: '复选框集合'
        },


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.parameter = {
            roomRate: null,
            endPoints: null,
            inning: null,
            nnt: null,
            jebo: null,
            floatNum: null,
            robbedBar: null,
            location: null,
        }
        let data = {
            roomRate: 1,
            endPoints: 8,
            inning: 1,
            nnt: 1,
            jebo: 0,
            floatNum: 2,
            robbedBar: 0,
            location: 0
        };
        this.refreshData(data);
    },

    start() {

        

    },

    /**
     *用来更新复选框
     *
     * @param {*} data
     */
    refreshData(data) {

        this.radioList.children.forEach(child => {

            for (const key in this.parameter) {
                if (this.parameter.hasOwnProperty(key)) {
                    if (child.name == key) {
                        console.log(child.name);
                        if (child.getComponent(cc.ToggleContainer).toggleItems) {
                            
                        } 
                        child.getComponent(cc.ToggleContainer).toggleItems.forEach(
                            (item, i) => {
                                // 判断是否为更新布局模式
                                let isDataChild = data ? data[child.name] : false;
                                // 判断是否被选中
                                if (item.isChecked || isDataChild) {

                                    let editbox =false;
                                    // let editbox = item.getChildByName('editbox');
                                    // 判断是否有输入框的节点
                                    if (editbox) {
                                        if (isDataChild) {
                                        this.parameter[child.name] = editbox.getComponent(cc.EditBox).string=isDataChild;                                            
                                        item.isChecked=true;                                      
                                        } else {
                                        this.parameter[child.name] = editbox.getComponent(cc.EditBox).string;                                            
                                        }
                                        return;
                                    }
                                    if (isDataChild?isDataChild==i:false) {
                                        console.log('应该选中',i,item.name);
                                        
                                        item.isChecked=true;               
                                        console.log(item.name,item.isChecked);
                                                               
                                    } else {
                                        this.parameter[child.name] = i;
                                        
                                    }
                                }


                            }
                        )
                    }
                }

            }
        });
// let a=  this.radioList.children;
// a[0].children[1].getComponent(cc.Toggle).isChecked=true;

    },

    /**
     *获取复选框的值
     *
     * @param {*} e
     * @param {*} val
     */
    getValue(e, val) {
        this.parameter[e.target.parent.name] = val;
        console.log(this.parameter[e.target.parent.name], e.target.parent.name);
    },

    /**
     *获取用户输入框文字
     *
     * @param {*} str
     * @param {*} target
     * @param {*} name
     */
    getEditbox(str, target, name) {
        let val = str;
        this.parameter[name] = val ? val : 1;
    },

    sendRoom() {
        this.refreshData({});
        for (const l in this.parameter) {
            console.log(l, this.parameter[l]);
        }
        cc.DBUtility.sendPostRequest('')
    }

    // update (dt) {},
});
