# spawn-applescript

Run AppleScript and get the result.

This is a fork of [run-applescript](https://www.npmjs.com/package/run-applescript) that uses `spawn`instead of `exec`.
Which guards against `[ERR_CHILD_PROCESS_STDIO_MAXBUFFER]` errors when large stdoutput buffers are encounted.

The original `runAppleScript` and `runAppleScriptSync` functions can also be called using `execAppleScript` and `execApplescriptSync` respectively.
