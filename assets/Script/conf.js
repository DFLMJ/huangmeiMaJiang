const DBU = require('DBUtility');
window.conf = {
    user: {
        openid: null,
        access_token: null,
        expires_in: null
    }
};

cc.publicMethod = {
    /**
    *
    *
    * @param {*} txt 需要显示的提示
    */
    hint(str, hintModal) {
        // console.log(str);

        // hintModal.active=true;
        // hintModal.getChildByName('str').getComponent(cc.Label).string=str;
        // hintModal.runAction(cc.sequence(cc.show(),cc.scaleTo(0.01, 1.2, 1.2), cc.scaleTo(0.005, 1, 1),cc.delayTime(1),cc.callFunc(()=>{

        // hintModal.active=false;


        // })));
        hintModal = hintModal ? hintModal : cc.find('tips');
        hintModal.active = true;
        hintModal.getChildByName('str').getComponent(cc.Label).string = str;
        hintModal.runAction(cc.sequence(cc.show(), cc.scaleTo(0.01, 1.2, 1.2), cc.scaleTo(0.005, 1, 1), cc.delayTime(1), cc.callFunc(() => {

            // hintModal.active=false;


        })));

        // 使用微信传回的code 获得 access_token 用于注册 以及 微信openid
        let dataCode = {
            "appKey": "app",
            'code': str.code
        };
        DBU.setSign(dataCode);

        DBU.sendPostRequest('/hmmj-restful/player/login/access_token', dataCode, resCode => {

            console.log('结果集', res);

            // 使用传回的token 和 openid 来注册微信登录
            let dataWechat = {
                "appKey": "app",
                'access_token': resCode.datas.access_token,
                'openid': resCode.datas.openid,
            };
            DBU.setSign(dataWechat);

            DBU.sendPostRequest('/hmmj-restful/player/login/access_token', dataWechat, resWechat => {
                // 如果登录成功则会返回 登录成功
                console.log('结果集', resWechat, resWechat.message);

            }, err => {

                console.log('错误集', resWechat);

            }, 'http://ja5.ssssgame.com')

        }, err => {
            console.log('错误集', err);

        }, 'http://ja5.ssssgame.com')

    }
}