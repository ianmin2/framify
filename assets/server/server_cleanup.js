module.exports = () => {

    //@ DO A PROGRAM CLEANUP BEFORE THE ACTUAL EXIT 

    process.stdin.resume(); //so the program will not close instantly

    function exitHandler(options, err) {

        if (options.cleanup) {
            console.log(`\n\n@framify`.yell +
                `\nThe application exited gracefully\n\n`.info
            );
        }
        if (err) console.log(err.stack);
        if (options.exit) process.exit();

    }

    //@ HANDLE A  NATURAL APPLICATION EXIT
    process.on('exit', exitHandler.bind(null, { cleanup: true }));

    //@ CATCH A DELIBERATE ctrl+c 
    process.on('SIGINT', exitHandler.bind(null, { exit: true }));

    //@ CATCH UNCAUGHT EXCEPTIONS
    process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

};