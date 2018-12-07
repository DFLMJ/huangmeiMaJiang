

var DBUtility = {
    /**
     * 获取随机整数,不包括两个数
     *@method fnRandomNum
     * @param {number} iZero 随机数范围开始值
     * @param {number} iEnd  随机数范围结束值
     * @returns {number} 返回随机数
     */
    fnRandomNum: function (iZero, iEnd) {
        if (iZero >= iEnd) {
            fnEio(RangeError, '随机数临界值应大于起始值')
        }
        let min = Math.ceil(iEnd),
            max = Math.floor(iZero);
        return Math.floor(Math.random() * (max - min)) + min;
    },

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    },
    getRandFload(min, max) {
        return parseFloat((Math.random() * (max - min) + min).toFixed(1))
    },
    /**
     * 获取随机概率情况下的结果
     * @method getRandomProb
     * @param {number} arr 随机概率对应的结果数组
     * @param {number} Prob  存放随机概率的数组
     * @returns {number} 返回随机数
     */
    getRandomProb(arr, Prob) {
        var sum = 0,
            factor = 0,
            random = Math.random();

        for (var i = Prob.length - 1; i >= 0; i--) {
            sum += Prob[i]; // 统计概率总和
        };
        random *= sum; // 生成概率随机数
        for (var i = Prob.length - 1; i >= 0; i--) {
            factor += Prob[i];
            if (random <= factor)
                return arr[i];
        };
        return null;
    },
    /**
    * 加载图像URL
    * @method loadUrl
    * @param {String} Path 图片地址
    * @param {Node} Node  需要更改spriteFrame 的节点
    * @param {String} Type  图片的类型 例如jpg,Png 默认为png
    */
    loadUrl(Path, Node, Type) {
        if (!Path) {
            return;
        }
        cc.loader.load({ url: Path, type: Type || 'png' }, (e, texture) => {
            Node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
    },
    /**
     * 加载txt文字
     * @method loadTxt
     * @param {String} Txt Txt内容
     * @param {Node} ccNode  需要更改的节点
     */
    loadTxt(Txt, ccNode) {
        ccNode.getComponent(ccNode.getComponent(cc.Label)?cc.Label:cc.RichText).string = Txt;
    },
    /**
     * 缩放窗口
     * @method fnZoom
     * @param {Node} Node 需要缩放的节点
     * @returns {Node} 返回该节点
     */
    fnZoom(ccNode) {
        let num = ccNode.scaleX == 1 ? 0 : 1, fade = ccNode.opacity == 255 ? 255 : 0;
        let ani = cc.spawn(cc.scaleTo(0.2, num, num), cc.fadeTo(0.2, fade))
        ccNode.runAction(ani);

        return ccNode;
    },
    /**
     * 提示语窗口
     * @method fnShowTips
     * @param {String} Txt Txt内容
     */
    fnShowTips(Txt) {
        // 获取提示框节点
        let str = cc.find('Tips/txt');
        // 更改文字
        this.loadTxt(Txt,str);
        let ani = cc.sequence(cc.spawn(cc.fadeIn(0.3), cc.scaleTo(0.3, 1)), cc.delayTime(2), cc.spawn(cc.fadeOut(0.3), cc.scaleTo(0.3, 0)));
        // 执行动作
        str.parent.runAction(ani);
    },
    

}

module.exports = DBUtility;