const DBU = require('DBUtility');
window.conf = {
    user: {
        openid: null,
        access_token: null,
        expires_in: null,
    }
};

cc.publicParameter = {
    // infoUrl:'http://ja5.ssssgame.com',
    infoUrl: '/mjDL',
    // infoUrl: 'http://114.116.4.24:27005',
    sockUrl: '/mjSocket',
    appKey: 'app',
    // 用户的后台token 有效期24小时
    token: '4d3075c045160a0c25c22b3a231ddd59',
    // 用户换取游戏后台的sock信息
    sockData: null,
    sockInfo: null,
    // 换取连接地址的用户token 
    // sockToken:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqd3QiLCJpYXQiOjE1NDQ0MjE4ODUsInN1YiI6IntcInVzZXJOb1wiOlwiODcyRUNERjRcIixcInVzZXJOYW1lXCI6XCLlrr3vvIhZb3Jr77yJXCIsXCJ1c2VySWRcIjo1NDl9In0.9OzNp6WdTlJxtxy9ClLgvIQSy_7bP1heGjkR2u2sgGU',
    // sockToken:null,
    // 换取之后的信息
    sockInfo: null,
    // app签名 暂未配置DBU里面的签名 所以暂无影响
    CAdES: '4bcaf7499b59888we9e0egbccdmcdcfb',
    rollID: null,
    // 需要更新的数据对象
    infoObj: { nickName: [], goldNum: [], trueName: [], phone: [], jewelNum: [], remainder: [], sex: [], vipLevel: [], vipName: [], vipPic: [], phone: [], trueName: [] },
    // 用户信息集合
    userInfo: {},
    // 定时器集合
    setIntervalArr:{HALL:[],GAME:[],SCOKT:[]}
}
cc.publicMethod = {

    /**
     *用户令牌失效需要跳的方法
     *
     */
    failure() {
        cc.director.loadScene('Enter');
    },
    hint: function (str) {
        DBU.loadTxt(str, cc.find('tips/tips/str'));
        cc.find('tips').stopAllActions();
        cc.find('tips').runAction(cc.sequence(cc.scaleTo(0, 1), cc.delayTime(1), cc.scaleTo(0, 0)));
    },

    /**
     *分享按钮 
     *
     * @param {*} num 1-3分别代表朋友圈、微信群分享、诚信分享
     */
    share(num) {
        console.log('发起了分享' + num);

        let data = {
            appKey: cc.publicParameter.appKey,
            token: cc.publicParameter.token,
            shareType: 2
        }
        DBU.setSign(data);
        DBU.sendPostRequest('/hmmj-restful/task/draw/playerShare', data, res => {
            cc.publicMethod.hint(res.message)
        }, err => {
            cc.publicMethod.hint(err.message);
        }, cc.publicParameter.infoUrl)
    },
    copy: function (str) {
        cc.publicMethod.hint(str, '复制成功')
    },
    getInfo() {


        let data = {
            appKey: cc.publicParameter.appKey,
            token: cc.publicParameter.token,
        };
        DBU.setSign(data);
        var DBUdata = null;
        DBU.sendPostRequest('/hmmj-restful/player/playerInfo', DBU.setSign({
            appKey: cc.publicParameter.appKey,
            token: cc.publicParameter.token,
        }), res => {

            DBUdata = res.datas;
            console.log(DBUdata);

            cc.publicMethod.hint(res.message)

        }, err => {

            cc.publicMethod.hint(err.message);

        }, cc.publicParameter.infoUrl)
        return DBUdata;
    },

    /**
     *更新全局需要更新的数据
     *
     */
    upData(arr) {
        // 请求最新的数据

        DBU.sendPostRequest('/hmmj-restful/player/playerInfo', DBU.setSign({
            appKey: cc.publicParameter.appKey,
            token: cc.publicParameter.token,
        }), res => {

            cc.publicParameter.userInfo = res.datas;
            runData(res.datas);
            cc.publicMethod.hint(res.message)

        }, err => {

            cc.publicMethod.hint(err.message);

        }, cc.publicParameter.infoUrl)


        // 改变指定节点的内容
        function runData(newData) {
            let zh = new DBU.fnQuantize();
            // 遍历传递过来的参数
            arr.forEach(item => {

                // 对比是否配置文件中提供的对象 判断需要加载的是图像还是文字
                if (item == 'vipLevel') {
                    cc.publicParameter.infoObj[item].forEach(imgNode => {
                        DBU.loadUrl(newData[item], imgNode);
                    });
                } else {
                    cc.publicParameter.infoObj[item].forEach(txtNode => {
                        // 调用公共的文字加载方法并且转化为万进制
                        DBU.loadTxt(zh(newData[item]), txtNode);
                    });
                }
                console.log('数据更新完毕');

            });
        }
    },
    fnServerSocket() {
        // console.log('大师傅');

        // 初始化连接
        pomelo.init(
            {
                host: cc.publicParameter.sockData.ip,
                port: cc.publicParameter.sockData.port,
                handshakeCallback: () => {
                    console.log('握手成功');
                }
            },
            () => {
                var route = 'connector.entryHandler.enter';
                // 发送请求
                pomelo.request(route, {
                    token: cc.publicParameter.sockData.token,
                    refreshToken: cc.publicParameter.sockData.refreshToken
                }, data => {
                    // 判断是认证正确的情况下才会执行代码
                    if (data.code == 0) {
                        // 储存用户数据
                        cc.publicParameter.sockInfo = data.data;
                        console.log('发送啦啦啦啦', cc.publicParameter.sockInfo);
                        // 清除之前关闭事件的队列，以防触发多个队列的 相同事件
                        pomelo.removeAllListeners('close');
                        // 加入关闭事件的监听
                        pomelo.on("close",e=> {
                            setTimeout(()=>{
                                if(e.code!=1000){
                                cc.publicMethod.hint('您已断线')
                                    console.log("连接已断开，重连中",e);
                                    // 调用连接方法
                                    cc.publicMethod.fnServerSocket();
                                }else{
                                    cc.log('正常断开连接');
                                }                               
                            }, 2000);
                        });
                        // 判断用户是否是重新连接(roomExist为用户已有房间号)
                        if (data.data.roomExist!='') {
                            console.log('用户重连');
                            //显示重连框
                            // cc.DBUtility.fnScale('reconnectThe');
                            
                            // 加载游戏场景
                            cc.director.loadScene('Game');
                        }


                    }




                })

            }
        )
    },
}