const DBU = require('DBUtility');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _isCapturing: false,
    },

    // use this for initialization
    onLoad: function () {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    init: function () {
        this.ANDROID_API = "org/cocos2d/littleK/WXAPI";
        this.IOS_API = "LxbFunctionMgr";
    },

    testIOS: function () {
        // jsb.reflection.callStaticMethod(this.IOS_API, "share:shareTitle:shareDesc:",cc.vv.SI.appweb,title,desc);
    },
    login: function () {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "wxLogin", "()V");
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.IOS_API, "wechatToLogin");
        }
        else {
            console.log("platform:" + cc.sys.os + " dosn't implement share.");
        }
    },
    Vibrate: function (time) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            switch (time) {
                case 1000:
                    jsb.reflection.callStaticMethod(this.ANDROID_API, "Vibrate1", "()V");
                    break;
                case 2000:
                    jsb.reflection.callStaticMethod(this.ANDROID_API, "Vibrate2", "()V");
                    break;
                case 3000:
                    jsb.reflection.callStaticMethod(this.ANDROID_API, "Vibrate3", "()V");
                    break;
                case 4000:
                    jsb.reflection.callStaticMethod(this.ANDROID_API, "Vibrate4", "()V");
                    break;
                case 5000:
                    jsb.reflection.callStaticMethod(this.ANDROID_API, "Vibrate5", "()V");
                    break;
            }
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            // jsb.reflection.callStaticMethod(this.IOS_API, "share:shareTitle:shareDesc:",cc.vv.SI.appweb,title,desc);
            jsb.reflection.callStaticMethod(this.IOS_API, "shakeClickAction");
        }
        else {
            console.log("platform:" + cc.sys.os + " dosn't implement share.");
        }
    },

    wxpay: function (prepayId, nonceStr, timeStamp, sign) {
        var partnerId = "1292091601";
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "wxPay", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", partnerId, prepayId, nonceStr, timeStamp, sign);
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.IOS_API, "wxPay");
        }
        else {
            console.log("platform:" + cc.sys.os + " dosn't implement share.");
        }
    },
    onPayResp: function () {
         cc.publicMethod.hint("支付成功");
        cc.static.payCallBack.emit("callback", {
            type: cc.static.payScene
        });
    },

    alipay: function (order) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "alipay", "(Ljava/lang/String;)V", order);
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.IOS_API, "alipay");
        }
        else {
            console.log("platform:" + cc.sys.os + " dosn't implement share.");
        }
    },
    onAlipayResp: function (code) {

    },
    share: function (url, title, desc) {
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod(this.ANDROID_API, "wxShare2Session", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", url, title, desc);
        }
        else if (cc.sys.os == cc.sys.OS_IOS) {
            jsb.reflection.callStaticMethod(this.IOS_API, "wxShare:title:desc:", cc.vv.SI.appweb, title, desc);
        }
        else {
            console.log("platform:" + cc.sys.os + " dosn't implement share.");
        }
    },

    shareResult: function () {
        if (this._isCapturing) {
            return;
        }
        this._isCapturing = true;
        var size = cc.director.getWinSize();
        var currentDate = new Date();
        var fileName = "result_share.jpg";
        var fullPath = jsb.fileUtils.getWritablePath() + fileName;
        if (jsb.fileUtils.isFileExist(fullPath)) {
            jsb.fileUtils.removeFile(fullPath);
        }
        var texture = new cc.RenderTexture(Math.floor(size.width), Math.floor(size.height));
        texture.setPosition(cc.p(size.width / 2, size.height / 2));
        texture.begin();
        cc.director.getRunningScene().visit();
        texture.end();
        texture.saveToFile(fileName, cc.IMAGE_FORMAT_JPG);

        var self = this;
        var tryTimes = 0;
        var fn = function () {
            if (jsb.fileUtils.isFileExist(fullPath)) {
                var height = 100;
                var scale = height / size.height;
                var width = Math.floor(size.width * scale);

                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    jsb.reflection.callStaticMethod(self.ANDROID_API, "ShareIMG", "(Ljava/lang/String;II)V", fullPath, width, height);
                }
                else if (cc.sys.os == cc.sys.OS_IOS) {
                    jsb.reflection.callStaticMethod(self.IOS_API, "shareIMG:width:height:", fullPath, width, height);
                }
                else {
                    console.log("platform:" + cc.sys.os + " dosn't implement share.");
                }
                self._isCapturing = false;
            }
            else {
                tryTimes++;
                if (tryTimes > 10) {
                    console.log("time out...");
                    return;
                }
                setTimeout(fn, 50);
            }
        }
        setTimeout(fn, 50);
    },
    onTipResp: function (code) {
        setTimeout(function () {  cc.publicMethod.hint(code); }, 2000);
        //  cc.publicMethod.hint(code);
    },

    onLoginResp: function (code) {
        //  cc.publicMethod.hint(code);
        // setTimeout(function(){ cc.publicMethod.hint("微信登录成功！");},2000);

        setTimeout(function () {


            // 使用微信传回的code 获得 access_token 用于注册 以及 微信openid
            let dataCode = {
                "appKey": "app",
                'code':code
            };
            DBU.setSign(dataCode);

            DBU.sendPostRequest('/hmmj-restful/player/login/access_token', dataCode, resCode => {

                cc.publicMethod.hint(`result ${resCode.result}, access_token ${resCode.access_token}`)

                // 使用传回的token 和 openid 来注册微信登录
                let dataWechat = {
                    "appKey": "app",
                    'access_token': resCode.datas.access_token,
                    'openid': resCode.datas.openid,
                };
                DBU.setSign(dataWechat);

                DBU.sendPostRequest('/hmmj-restful/player/login/wechat', dataWechat, resWechat => {
                    // 如果登录成功则会返回 登录成功
                    console.log('结果集', resWechat, resWechat.message);

                    cc.publicMethod.hint(`token ${resWechat.datas.token}`)


                }, err => {
                    cc.publicMethod.hint(`resWechatErr ${err}`)


                }, 'http://ja5.ssssgame.com')

            }, err => {
                cc.publicMethod.hint(`resErr ${err}`)

            }, 'http://ja5.ssssgame.com')




            // var code = JSON.parse(code);
            // var data = {
            //     nickName: code.nickname,
            //     avatarUrl: code.headimgurl,
            //     openId: code.openid,
            //     wxUnionid: code.unionid,
            //     sex: code.sex
            // };

            // cc.static.HTTP.sendPostRequest("/hmmj-restful/player/login/access_token", data, function (ret) {
            //     //  cc.publicMethod.hint(JSON.stringify(ret));
            //     if (ret.code == 0) {
            //         var dt = ret.data;
            //         var userinfo = {
            //             token: dt.token,
            //             id: dt.id,
            //             mobile: dt.mobile,
            //             sex: dt.sex,
            //             userName: dt.userName,
            //             avatarUrl: dt.avatarUrl,
            //             integral: dt.integral,
            //         };
            //         cc.sys.localStorage.setItem('userData', JSON.stringify(userinfo));
            //         cc.sys.localStorage.setItem('state', "1");//记录为微信的登录状态

            //         cc.static.loginSuccess();

            //     } else {
            //         cc.static.usersMessageFn(ret.message, -400);
            //     }
            // }, function (err) {
            //     cc.static.usersMessageFn("网络异常");
            // }, cc.static.url);
        }, 2000);
    },
});
