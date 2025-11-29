// Copyright (c) 2012, Chuck Jazdzewski
// Licensed via the Microsoft Reciprocal License (MS-RL) (http://opensource.org/licenses/MS-RL)

(function () {

    function marker() { }

    marker.prototype.done = function (v) { this.then(v); };
    marker.prototype.fail = function (v) { return this.then(null, v); };
    marker.prototype.error = function (e) { return this.then(null, e); }
    marker.prototype.promise = function () { var r = new marker(); r.then = this.then; return r; };

    var objectToString = Object.prototype.toString;
    function isFunction(obj) { return objectToString.call(obj) === "[object Function]"; }
    var isError = require ? require('util').isError : function (v) { return v instanceof Error };

    function promiseLike(p) {
        return p && isFunction(p.then) && p.then.length == 3;
    }

    var notifications = [];

    function deferral() {
        var dispatching = false;
        var resolved = false;
        var failed = false;
        var resolvedWith;
        var errorValue;
        var resolveCalls = [];
        var errorCalls = [];
        var progressCalls = [];

        function then(success, error, progress) {
            if (!resolved && !dispatching) {
                if (success)
                    resolveCalls.push(success);
                if (error)
                    errorCalls.push(error);
                if (progress)
                    progressCalls.push(progress);
            }
            else {
                try {
                    if (failed) {
                        if (error)
                            error(errorValue);
                    }
                    else {
                        var result = success ? success(resolvedWith) : resolvedWith;
                        if (typeof result != 'undefined') {
                            if (promiseLike(result)) {
                                resolved = false;
                                result.then(resolve, reject, progress);
                            }
                            else
                                resolvedWith = result;
                        }
                    }
                }
                catch (e) {
                    reject(e);
                }
            }
            return this;
        }

        function resolve(value, p2) {
            if (resolved) return;

            if (isError(value)) {
                reject(value);
            }

            if (value == null && p2)
                value = p2;

            resolved = true;
            resolvedWith = value;
            for (var i = 0; i < resolveCalls.length; i++) {
                try {
                    var r = resolveCalls[i](resolvedWith);
                    if (typeof r !== "undefined") {
                        if (promiseLike(r)) {
                            resolveCalls = resolveCalls.slice(i + 1);
                            if (resolveCalls.length > 0) {
                                resolved = false;
                                var that = this;
                                r.then(function (v) { resolve(v); },
                                reject, progress);
                                break;
                            }
                        }
                        resolvedWith = r;
                    }
                }
                catch (e) {
                    resolved = false;
                    reject(e);
                    break;
                }
            }
            return this;
        }

        function reject(value) {
            resolved = true;
            failed = true;
            errorValue = value;
            for (var i = 0; i < errorCalls.length; i++) {
                try {
                    errorCalls[i](errorValue);
                }
                catch (e) {
                    errorValue = e;
                }
            }
            return this;
        }

        function progress(value) {
            if (!resolved) {
                for (var i = 0; i < progressCalls.length; i++) {
                    try {
                        progressCalls[i](value);
                    }
                    catch (e) {
                        reject(e);
                        break;
                    }
                }
            }
        }

        var result = new marker();
        result.then = then;
        result.resolve = resolve;
        result.reject = reject;
        result.progress = progress;
        result.resolvedWith = function () { return resolvedWith; }
        for (var i = 0, len = notifications.length; i < len; i++)
            notifications[i](result);

        return result;
    }

    function all(a) {
        var results = [];
        var promises;
        if (promiseLike(a))
            promises = Array.prototype.slice.call(arguments, 0);
        else
            promises = a;
        var expected = promises.length;
        var result = deferral();
        if (promises.length == 0)
            result.resolve([]);
        else
            promises.forEach(function (p, i) {
                function gotOne(v) {
                    results[i] = v;
                    if (--expected == 0)
                        result.resolve(results);
                }
                if (promiseLike(p))
                    p.then(gotOne, result.reject, result.progress);
                else
                    gotOne(p);
            });
        return result.promise();
    }

    function sync(f) {
        var d = deferral();
        try {
            d.resolve(f(p));
        }
        catch (e) {
            d.reject(e);
        }
        return d.promise();
    }

    function defer(f) {
        var d = deferral();
        try {
            f(function (v) {
                if (promiseLike(v)) v.then(d.resolve, d.reject);
                else d.resolve(v);
            }, d.reject, d.progress);
        }
        catch (e) {
            d.reject(e);
        }
        return d.promise();
    }

    function timeout(delay, value) {
        var timer;
        var p = defer(function (resolve) {
            timer = setTimeout(function () {
                timer = 0;
                resolve(value);
            }, delay);
        });
        p.cancel = function () {
            if (timer) clearTimeout(timer);
        };
        return p;
    }

    exports.deferral = deferral;
    exports.all = all;
    exports.is = function (p) { return p instanceof marker; }
    exports.like = promiseLike;
    exports.resolved = function (v) { var result = deferral(); result.resolve(v); return result.promise(); }
    exports.sync = sync;
    exports.defer = defer;
    exports.notify = function (f) { notifications.push(f); }
    exports.timeout = timeout;
})();