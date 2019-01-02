cc.static = {};
//获取md5.min.js 资源 cc.static.crypto.md5(str);
cc.static.md5Sign = require('./Tool/md5.min');
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
    /**
    * 为数字加上单位：万或亿
    *
    * 例如：
    *      1000.01 => 1000.01
    *      10000 => 1万
    *      99000 => 9.9万
    *      566000 => 56.6万
    *      5660000 => 566万
    *      44440000 => 4444万
    *      11111000 => 1111.1万
    *      444400000 => 4.44亿
    *      40000000,00000000,00000000 => 4000万亿亿
    *      4,00000000,00000000,00000000 => 4亿亿亿
    *
    * @param {number} number 输入数字.
    * @param {number} decimalDigit 小数点后最多位数，默认为2
    * @return {string} 加上单位后的数字
    */
    fnQuantize() {
        var addWan = function (integer, number, mutiple, decimalDigit) {
            var digit = getDigit(integer);
            if (digit > 3) {
                var remainder = digit % 8;
                if (remainder >= 5) {   // ‘十万’、‘百万’、‘千万’显示为‘万’
                    remainder = 4;
                }
                return Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万';
            } else {
                return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
            }
        };

        var getDigit = function (integer) {
            var digit = -1;
            while (integer >= 1) {
                digit++;
                integer = integer / 10;
            }
            return digit;
        };

        return function (number, decimalDigit) {
            decimalDigit = decimalDigit == null ? 1 : decimalDigit;
            var integer = Math.floor(number);
            var digit = getDigit(integer);
            // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
            var unit = [];
            if (digit > 3) {
                var multiple = Math.floor(digit / 8);
                if (multiple >= 1) {
                    var tmp = Math.round(integer / Math.pow(10, 8 * multiple));
                    unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
                    for (var i = 0; i < multiple; i++) {
                        unit.push('亿');
                    }
                    return unit.join('');
                } else {
                    return addWan(integer, number, 0, decimalDigit);
                }
            } else {
                return number;
            }
        };
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
    * 加载远程图像URL
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
     *加载位于 resources 文件夹下的资源
     *
     * @param {*} Path 图片地址
     * @param {*} Node 需要更改的spriteFrame节点
     * @param {*} [Type=cc.SpriteFrame] 资源类型，默认为cc.SpriteFrame
     */
    loadRes(Path, Node, Type = cc.SpriteFrame) {
        cc.loader.loadRes(Path, Type, function (err, spriteFrame) {
            Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
    /**
     * 加载txt文字
     * @method loadTxt
     * @param {String} Txt Txt内容
     * @param {Node} ccNode  需要更改的节点
     */
    loadTxt(Txt, ccNode) {
        ccNode.getComponent(ccNode.getComponent(cc.Label) ? cc.Label : cc.RichText).string = Txt;
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
     *缩放窗口并加入特殊动画
     *需要指定背景隔离层为modalBg
     *
     * @param {*} e 点击事件的对象
     * @param {*} target 点击事件传递的模态框名字
     */
    fnScale(e, target, callBack) {
        let t1 = target.split(',')[0];
        if (target.split(',').length > 1) {
            callBack();
        }
        // console.log(this[target].active);
        if (!this[t1].scaleX == 1) {
            // this[t1].active=true;
            console.log(6);

            this[t1].runAction(cc.sequence(cc.scaleTo(0, 1, 1), cc.scaleTo(0.1, 1.1, 1.2), cc.scaleTo(0.1, 1, 1)));
            this.modalBg.runAction(cc.scaleTo(0, 1, 1));
        }

    },
    /**
     * 给关闭按钮添加监听事件
     *
     * @param {*} e
     */
    fnCloseBtn(e) {
        // e.target.parent.active=false;        
        // this.modalBg.active = false;
        e.target.parent.runAction(cc.scaleTo(0, 0, 0));
        let i = 0;
        e.target.parent.parent.children.forEach(item => {
            if (item.scaleX != 0) {
                i++;
            };
        })
        console.log(i,'i');
        
        if (i == 1) {
            this.modalBg.runAction(cc.scaleTo(0, 0, 0));
        }

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
        this.loadTxt(Txt, str);
        let ani = cc.sequence(cc.spawn(cc.fadeIn(0.3), cc.scaleTo(0.3, 1)), cc.delayTime(2), cc.spawn(cc.fadeOut(0.3), cc.scaleTo(0.3, 0)));
        // 执行动作
        str.parent.runAction(ani);
    },
    /**
     *生成列表预制体
     *
     * @param {cc.Node} target 预制体的父节点
     * @param {cc.Prefab} pre 需要创建的预制体
     * @param {Array} data 需要遍历的数据
     * @param {Function} callBack 传入data、item元素
     */
    fnCreateItem(target, pre, data, callBack) {
        target.children.forEach((item, i) => {
            // console.log(i, 'p');
            // item.parent=null;
            item.destroy();
        })
        for (let index = 0; index < (data.len ? data.len : data.length); index++) {
            const item = cc.instantiate(pre);
            callBack(data[index], item);
            item.parent = target;
        }
    },

    /**
     *通用ajax方法
     *
     * @param {*} data
     * @param {*} method
     * @param {*} callBack
     */
    ajax(data, method, callBack) {
        // const xml
        // Promise()

    },


    /**
     *发送Get请求
     *
     * @param {String} path 接口方法地址(除去接口域名地址及端口的地址)
     * @param {JSON} data 参数json
     * @param {Function} handler 成功返回回调
     * @param {Function} error 异常返回回调
     * @param {String} extraUrl 接口域名地址及端口
     * @returns {Object} 结果集
     */
    sendGetRequest(path, data, handler, error, extraUrl) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;//设置请求超时
        var str = "?";
        for (var k in data) {
            if (str != "?") {
                str += "&";
            }
            str += k + "=" + data[k];
        }
        if (extraUrl == null) {
            extraUrl = cc.static.url;
        }
        var requestURL = extraUrl + path + encodeURI(str);
        // console.log("RequestURL:" + requestURL);
        xhr.open("GET", requestURL, true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                try {
                    var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        handler(ret);
                    }                        /* code */
                } catch (e) {
                    error && error(e, xhr)
                }
                finally {

                }
            }
        };
        xhr.send();
        return xhr;
    },
    /**
      *发送Post请求
      *
      * @param {String} path 接口方法地址(除去接口域名地址及端口的地址)
      * @param {JSON} data 参数json
      * @param {Function} handler 成功返回回调
      * @param {Function} error 异常返回回调
      * @param {String} extraUrl 接口域名地址及端口
      * @returns {Object} 结果集      
      */
    sendPostRequest: function (path, data, handler, error, extraUrl) {
        var xhr = cc.loader.getXMLHttpRequest();
        var url = (extraUrl ? extraUrl : cc.static.url) + path;
        xhr.open("POST", url);
        //设置请求头
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 300)) {
                // console.log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                try {
                    var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        //用户令牌不能为空，用户令牌不正确，玩家信息不正确
                        if (ret.result == 100030 || ret.result == 100050 || ret.result == 100060) {
                            // cc.publicMethod.hint(path + "：" + ret.result);
                            cc.publicMethod.hint("用户授权失效");
                            cc.sys.localStorage.removeItem('token');
                            cc.static.isLogin = false;
                            setTimeout(function () { location.href = cc.static.reUrl + (cc.static.urlUtil()["pushCode"] ? "/?pushCode=" + cc.static.urlUtil()["pushCode"] : ""); }, 2000);//window.location.reload(true); 
                            return;
                        }
                        cc.log(path, ret);
                        // if (ret.result != 0 && ret.result != 1) {

                        //     return;
                        // }
                        if (ret.result != 0 && ret.result != 1) {
                            cc.publicMethod.hint(ret.message);
                            return;
                        }
                        handler(ret);
                    }                        /* code */
                } catch (e) {
                    // console.log("err:" + e);
                    //handler(null);
                    error && error(e, xhr);
                    cc.log(path, e);
                }
                finally {
                    //
                }
            } else {
            }
        };
        // xhr.send(userstr);
        xhr.send(JSON.stringify(data));
        return xhr;
    },
    //  //设置签名并且MD5加密
    setSign(params) {
        // 按字典排序
        var raw = function (args) {
            var keys = Object.keys(args);
            keys = keys.sort()
            var newArgs = {};
            keys.forEach(function (key) {
                if (key == 'sign') {
                    return;
                }
                newArgs[key] = args[key];
            });

            var string = '';
            for (var k in newArgs) {
                string += k + '=' + newArgs[k];
            }
            //签名规则
            string += '4bcaf7499b59888we9e0egbccdmcdcfb';
            return string;
        };
        //md5加密
        var string = cc.static.md5Sign(raw(params));
        params.sign = string;
        return params;
    }



}

cc.DBUtility = DBUtility;


// 全局事件派发事件
cc.director.GlobalEvent = {
    handles_: {},
    //发送事件
    emit: function (eventName, data) {
        var returns = [] //返回值

        data.eventName = eventName//保存一下事件名字

        for (var findEvenName in this.handles_) {
            if (findEvenName == eventName) {
                for (var i = 0; i < this.handles_[findEvenName].length; i++) {
                    var returnValue = this.handles_[findEvenName][i](data)
                    returns.push(returnValue)
                }
            }
        }

        return returns
    },
    //添加普通事件
    on: function (eventName, callback, target) {
        // console.log('收到事件', eventName);
        this.handles_[eventName] = this.handles_[eventName] || []

        this.handles_[eventName].push(callback.bind(target))
    },
    //通过事件名和target移除一个监听器
    off: function (eventName) {
        for (var i = 0; i < this.handles_[eventName].length; i++) {
            this.handles_[eventName][i] = null
        }
    },
}




module.exports = DBUtility;