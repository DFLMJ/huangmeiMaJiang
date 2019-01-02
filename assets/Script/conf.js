const DBU = require('DBUtility');
window.conf = {
    user: {
        openid: null,
        access_token: null,
        expires_in: null
    }
};

cc.publicParameter = {
    // infoUrl:'http://ja5.ssssgame.com',
    infoUrl: '/mjDL',
    appKey: 'app',
    // 用户的后台token 有效期24小时
    token: '79c964c07f256c2bbd7dd0d9f87c512e',
    // app签名 暂未配置DBU里面的签名 所以暂无影响
    CAdES: '4bcaf7499b59888we9e0egbccdmcdcfb',
    rollID: null,
}
cc.publicMethod = {
    hint: function (str) {
        DBU.loadTxt(str, cc.find('tips/str'));
        cc.find('tips').stopAllActions();
        cc.find('tips').runAction(cc.sequence(cc.scaleTo(0,1), cc.delayTime(1), cc.scaleTo(0,0)));
    }
}