/**
 * 非同期処理関数
 * @param data
 * @param callback
 */
function aFunc1(data, callback) {
    setTimeout(function() {
        callback(data * 2);
    }, Math.random() * 1000);
}

/**
 * 非同期関数の結果を使ってまた処理をするということを再帰的にやろうとすると
 * このようにコールバック地獄になる
 */
function sample_callback() {
    // 非同期関数を用いて100の2倍を求める
    aFunc1(100, function(value) {
        console.log(value);      // => 200
        aFunc1(value, function(value) {
            console.log(value);      // => 400
            aFunc1(value, function(value) {
                console.log(value);      // => 800
            });
        });
    });
}

/**
 * かといってこのように直列的に書くと処理の順序が安定しない
 */
function sample_timing_problem() {
    aFunc1(100, function(data) {
        console.log(data);      // => 200
    });
    aFunc1(200, function(data) {
        console.log(data);      // => 400
    });
    aFunc1(400, function(data) {
        console.log(data);      // => 800
    });
}

/**
 * 上記のプロブレムを解決すべく生み出されたPromise
 * @param data
 * @returns {Promise<unknown>}
 */
function aFunc2(data) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(data * 2);
        }, Math.random() * 1000);
    });
}

/**
 * コールバック地獄が解消される
 */
function sample_promise2() {
    aFunc2(100)
        .then((res) => {
            console.log(res)
            return aFunc2(res)
        })
        .then((res) => {
            console.log(res)
            return aFunc2(res)
        })
        .then((res) => {
            console.log(res)
            return aFunc2(res)
        })
        .then((res) => {
            console.log(res)
            return aFunc2(res)
        })
        .then((res) => {
            console.log(res)
        })
}

sample_promise2()