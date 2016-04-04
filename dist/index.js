/// <reference path="typings/main.d.ts" />
"use strict";
var plugins = require("./gulpfunction.plugins");
module.exports = function (functionsToExecuteArg, executionModeArg) {
    if (executionModeArg === void 0) { executionModeArg = 'forEach'; }
    //important vars
    var executionMode = executionModeArg; //can be forEach or atEnd
    var functionsToExecute = functionsToExecuteArg;
    var promiseArray = [];
    var runFunction = function (functionArg) {
        var returnValue = functionArg();
        if (typeof returnValue !== "undefined" && typeof returnValue.then !== "undefined") {
            promiseArray.push(returnValue);
        }
    };
    var checkAndRunFunction = function () {
        if (typeof functionsToExecute === "function") {
            runFunction(functionsToExecute);
        }
        else if (Array.isArray(functionsToExecute)) {
            for (var anyFunction in functionsToExecute) {
                runFunction(functionsToExecute[anyFunction]);
            }
        }
        else {
            throw new Error("gulp-callfunction: something is strange with the given arguments");
        }
        return plugins.Q.all(promiseArray);
    };
    var hasExecutedOnce = false;
    var forEach = function (file, enc, cb) {
        switch (executionMode) {
            case "forEach":
                checkAndRunFunction().then(function () {
                    cb(null, file);
                });
                break;
            case "forFirst":
                !hasExecutedOnce ? checkAndRunFunction().then(function () {
                    cb(null, file);
                }) : cb(null, file);
                hasExecutedOnce = true;
                break;
            case "atEnd":
                cb(null, file);
                break;
            default:
                break;
        }
    };
    var atEnd = function (cb) {
        if (executionMode === "atEnd") {
            checkAndRunFunction().then(function () {
                cb();
            });
        }
        else {
            cb();
        }
    };
    return plugins.through2.obj(forEach, atEnd);
};

//# sourceMappingURL=data:application/json;base64,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QUFDO0lBQ0wsQ0FBQyxDQUFDO0lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxDQUFDLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwaW5ncy9tYWluLmQudHNcIiAvPlxuXG5pbXBvcnQgcGx1Z2lucyA9IHJlcXVpcmUoXCIuL2d1bHBmdW5jdGlvbi5wbHVnaW5zXCIpO1xuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmdW5jdGlvbnNUb0V4ZWN1dGVBcmc6YW55fGFueVtdLGV4ZWN1dGlvbk1vZGVBcmc6c3RyaW5nID0gJ2ZvckVhY2gnKSB7XG4gICAgLy9pbXBvcnRhbnQgdmFyc1xuICAgIGxldCBleGVjdXRpb25Nb2RlID0gZXhlY3V0aW9uTW9kZUFyZzsgLy9jYW4gYmUgZm9yRWFjaCBvciBhdEVuZFxuICAgIGxldCBmdW5jdGlvbnNUb0V4ZWN1dGUgPSBmdW5jdGlvbnNUb0V4ZWN1dGVBcmc7XG4gICAgbGV0IHByb21pc2VBcnJheSA9IFtdO1xuICAgIGxldCBydW5GdW5jdGlvbiA9IGZ1bmN0aW9uKGZ1bmN0aW9uQXJnKXtcbiAgICAgICAgbGV0IHJldHVyblZhbHVlID0gZnVuY3Rpb25BcmcoKTtcbiAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5WYWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgcmV0dXJuVmFsdWUudGhlbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcHJvbWlzZUFycmF5LnB1c2gocmV0dXJuVmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxldCBjaGVja0FuZFJ1bkZ1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHlwZW9mIGZ1bmN0aW9uc1RvRXhlY3V0ZSA9PT0gXCJmdW5jdGlvblwiICkge1xuICAgICAgICAgICAgcnVuRnVuY3Rpb24oZnVuY3Rpb25zVG9FeGVjdXRlKTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGZ1bmN0aW9uc1RvRXhlY3V0ZSkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGFueUZ1bmN0aW9uIGluIGZ1bmN0aW9uc1RvRXhlY3V0ZSkge1xuICAgICAgICAgICAgICAgIHJ1bkZ1bmN0aW9uKGZ1bmN0aW9uc1RvRXhlY3V0ZVthbnlGdW5jdGlvbl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ3VscC1jYWxsZnVuY3Rpb246IHNvbWV0aGluZyBpcyBzdHJhbmdlIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50c1wiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGx1Z2lucy5RLmFsbChwcm9taXNlQXJyYXkpO1xuICAgIH07XG5cbiAgICBsZXQgaGFzRXhlY3V0ZWRPbmNlID0gZmFsc2U7XG4gICAgbGV0IGZvckVhY2ggPSBmdW5jdGlvbiAoZmlsZSwgZW5jLCBjYikgeyAvL3RoZSBmb3JFYWNoIGZ1bmN0aW9uIGlzIGNhbGxlZCBmb3IgZXZlcnkgY2h1bmtcbiAgICAgICAgc3dpdGNoIChleGVjdXRpb25Nb2RlKXtcbiAgICAgICAgICAgIGNhc2UgXCJmb3JFYWNoXCI6XG4gICAgICAgICAgICAgICAgY2hlY2tBbmRSdW5GdW5jdGlvbigpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgZmlsZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZm9yRmlyc3RcIjpcbiAgICAgICAgICAgICAgICAhaGFzRXhlY3V0ZWRPbmNlID8gY2hlY2tBbmRSdW5GdW5jdGlvbigpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgZmlsZSk7XG4gICAgICAgICAgICAgICAgfSkgOiBjYihudWxsLCBmaWxlKTtcbiAgICAgICAgICAgICAgICBoYXNFeGVjdXRlZE9uY2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImF0RW5kXCI6XG4gICAgICAgICAgICAgICAgY2IobnVsbCwgZmlsZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxldCBhdEVuZCA9IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIGlmIChleGVjdXRpb25Nb2RlID09PSBcImF0RW5kXCIpIHtcbiAgICAgICAgICAgIGNoZWNrQW5kUnVuRnVuY3Rpb24oKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHBsdWdpbnMudGhyb3VnaDIub2JqKGZvckVhY2gsYXRFbmQpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==