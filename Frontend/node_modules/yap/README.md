# yap - Yet Another Promise module

An implementation of the **Promise/A** specification from **Common/JS** (http://wiki.commonjs.org/wiki/Promises/A)

## Summary

yap is used to implement asynchronous methods and provides a consistent mechanism to handle the results and report
errors.

## Funtions

### yap.all(a)

Returns a promise for an array of values promised by elements of the array `a`. The promise will be fulfilled when all
of the promises in the array are fulfilled. If any of the promises are broken then the returned promise is broken and
is rejected with the first error reported. If any of the values of array `a` is not a promise the value is copied to
the result.

Assuming the existence of a function `waitForIt(v,m)`, that creates a promise that resolves to `v` after `m` 
milliseconds, the following,

    yap.all([waitForIt(1, 10), waitForIt(2, 100), waitForIt(3, 20)]).then(function (p) {
	    console.info(p);
	});

will print `[1, 2, 3]` to the console after 100ms, which is the time it takes to resolve the longest promise. All the
resolve asynchronously.

### yap.defer(f)

Returns a promise for the work performed by `f`. `f` is called with three parameters, `resolve`, `reject` and `progress` 
which are the `resolve`, `reject` and `progress` functions of a `deferral`. If an exception is thrown in `f` then `reject` 
is automatically called. 

The following is an example of using `defer` to generate a promise that will be resolved after a second with the value `1`.

     var waitOneSec = yap.defer(function (resolve) {
         setTimeout(function() {
            resolve(1);
         }, 1000);
     });

The `resolve` function can be passed directly as node standard async callback function. It recognizes the common callback
patterns. The following example takes advantage of this to create a promise for buffer of 1024 random bytes.

    var somethingRandom = yap.defer(function (resolve) {
	    crypto.randomBytes(1024, resolve);
	});

### yap.deferral()

Create a `deferral`. A `deferral` is the core of yap. An asynchronous operation first creates a `deferral` and then either
reports it successfully delivered on a promise by calling `resolve()`, or the failure to deliver on the promise by calling
`reject()`. Long running asynchronous tasks can report their progress by calling `progress()`. A `promise` can be extracted
by calling `promise()` which will only support `then()` and related helpers. Although a `deferral` follows the `promise` 
pattern, it should not be visuble outside the asynchronous task.

The following example creates a `promise` for a `1` in one second.

    var d = yap.deferral();
	setTimout(function () {
	    d.resolve(1);
	}, 1000);
	var waitOneSec = d.promise();

### yap.is(p)

Returns `true` if `p` is a `promise` created by yap, `false` otherwise.

### yap.like(p)

Returns `true` if `p` supports the promise pattern (e.g. has a `then` method), `false` otherwise. This should return true
for any promise implementation, not just yap. yap uses `like()` to decide whether a value is a promise. This enables other
promise implementations to be usable with yap helpers such as `all()`.

### yap.resolved(v)

Returns a promise that is already resolved to the value `v`.

### yap.sync(f)

Returns a promise for the result of calling `f`. If an exception is raised in `f` then the promise is rejected. Turns a 
synchronouse function into a promise.

### yap.timeout(delay, [value])

Returns a promise that will resolve to `value` (or `undefined` if missing) after delay milliseconds. This returns a promise
that contains a `cancel()` method as well that allows the callback to be cancelled. If it is cancelled the promise will 
never be resolved.

### deferral.resolve(v)

Resolves a `deferral` with value `v`. Once a `deferral` is resolved subsequent calls to `resolve()`, `progress()` and 
`reject()` are ignored. This will cause the first parameters of the `then` methods to be called.

### deferral.resolve(e, v)

An alternate way to call resolve where `e` is either an exception object or `null` and `v` is the value with which to 
resolve the `deferral`. This allows `resolve` to be passed in as the callback function for a standard node callback.

### deferral.reject(e)

Rejects a `deferral` with the error `e`. `e` should be an `Error` object such as would be received in a `catch` clause.
Once a `deferral` is rejected subsequent calls to `resolve()`, `progress()` and `reject()` are ignored. This causes the 
functions passed as the second parameter of the `then` methods to be invoked.

### deferral.progress(v)

Reports progress of a `deferral`. This causes the functions passed as the third parameter of the `then` methods to be 
invoked.

### deferral.promise()

Returns the `promise` that for the work that communicates it result with a `deferral`. Even though the `deferral` is
itself a `promise`, it should not be available outside the asynchronouse task. Use the `promise` returned by 
`promise()` instead.

### promise.then(fulfilledHandler, [errorHandler], [progressHandler])

Supply callback to be called when the promise is either fulfilled, rejected or is reporting progress. This is the
central method of the promise pattern. The `then()` method returns the promise itself which allows the promise
to be chained. If the `fulfilledHandler` returns a result then that result will be the value passed to any
`fulfilledHandler`s added after it. If it returns a promise the `fulfilledHandler`s that are added after it
are resolved with the result of the promise. For example,

    waitForIt(1, 100).then(function (v) {
	    return v + 1;
	}).then(function (v) {
		return waitForIt(v + 1, 100);
	}).then(function (v) {
		console.info(v);
	});

will report `3` to the console after 200ms.

### promise.done(fulfilledHandler)

A helper method to call `then()` with only a `fulfilledHandler`. This differs from `then()` in that it doesn't
return the `promise`. This can be used indicate that no more `then()` methods are expected.

### promise.fail(errorHandler)

A helper method to call `then()` with only a `errorHandler`.

### promise.error(errorHandler)

A helper method to call `then()` with only a `errorHandler`.
