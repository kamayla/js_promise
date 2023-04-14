// 関数の定義

/**
 * 引数が100円以上なら決済が成功するAPI
 * @param pay
 * @returns {Promise<unknown>}
 */
const buy = (pay) => {
    return new Promise((resolve, reject) => {
        // 非同期のAPI処理に模した決済処理(決済処理には1秒を要する)
        setTimeout(() => {
            if (pay >= 100) {
                resolve({
                    result: 'Your payment is success'
                })
            } else {
                reject({
                    errors: {
                        pay: 'Your settlement is insufficient in amount'
                    }
                })
            }
        }, 1000);
    })
}


// 処理実行

console.log("==============処理の開始=================");

buy(90)
    .then((res) => {
        // 非同期処理が成功するとこのthenに処理が流れます
        console.log(res)
    })
    .catch((e) => {
        // 非同期処理が失敗するとcatchに処理が流れます
        console.log(e)
    })
    .finally(() => {
        console.log('finallyは処理の最後には必ず呼ばれます')
    })

// buyは非同期処理を内包したPromiseなので、以下の処理が先に実行される
console.log('==============処理の末尾=================');