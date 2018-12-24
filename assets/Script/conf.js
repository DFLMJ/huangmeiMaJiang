const DBU = require('DBUtility');
window.conf = {
    user: {
        openid: null,
        access_token: null,
        expires_in: null
    }
};

cc.publicParameter  = {
    // infoUrl:'http://ja5.ssssgame.com',
    infoUrl:'/mjDL',
    appKey:'app',
    // 用户的后台token 有效期24小时
    token:'45036f60fc2399d7d82bb3062f71a21a',
    // app签名 暂未配置DBU里面的签名 所以暂无影响
    CAdES:'4bcaf7499b59888we9e0egbccdmcdcfb',
    rollID:null
    
}