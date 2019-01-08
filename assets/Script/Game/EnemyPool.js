

var EnemyPool = cc.Class({
    extends: cc.Component,
    properties: {
        topMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '上未打麻将'
        },
        tophMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '上已打麻将'
        },
        leftMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '左未打麻将'
        },
        leftlMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '左已打麻将'
        },
        downMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '下未打麻将'
        },
        downhMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '下已打麻将'
        },
        rightMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '右未打麻将'
        },
        righthMJ: {
            default: null,
            type: cc.Prefab,
            displayName: '右已打麻将'
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    /**
     *
     *
     * @param {Array} arr 存放的有 上 右 下 左 的麻将预制体的一个数组
     *top: { s:  cc.Prefab, h:  cc.Prefab, },
     *left: { s:  cc.Prefab, h:  cc.Prefab, },
     *down: { s:  cc.Prefab, h:  cc.Prefab, },
     *right: { s:  cc.Prefab, h:  cc.Prefab, },
     */
    init(arr) {
        
        // 初始化一个麻将对象池
        this.enemyPool = {
            top: { s: new cc.PrefabPool, h: new cc.PrefabPool, },
            left: { s: new cc.PrefabPool, h: new cc.PrefabPool, },
            down: { s: new cc.PrefabPool, h: new cc.PrefabPool, },
            right: { s: new cc.PrefabPool, h: new cc.PrefabPool, },
        };
        for (const objKey in this.enemyPool) {
            if (object.hasOwnProperty(obj)) {
                const obj = this.enemyPool[objKey];
                for (const itmeKey in obj) {
                    if (object.hasOwnProperty(itme)) {
                        const item = this.enemyPool[objKey][itmeKey];
                        // 根据属性名判断需要加载的数量 未打的麻将 数量为14个 已打的麻将为24个
                        if (itmeKey == 's') {
                            for (let index = 1; index < 15; index++) {
                                // 生成将预制体实例化
                                const element = cc.instantiate(array[objKey][0]);
                                // 放入对象池
                                item.put(element);
                            }

                        } else {
                            for (let index = 1; index < 25; index++) {
                                // 生成将预制体实例化
                                const element = cc.instantiate(array[objKey][0]);
                                // 放入对象池
                                item.put(element);
                            }
                        }

                    }
                }

                const element = object[obj];

            }
        }


    },
    // update (dt) {},
});
