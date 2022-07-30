const fs = require('fs');

function someAsyncOperation(callback) {
    // Assume this takes 2500 ms to complete
    setTimeout(() => {
        callback()
    }, 2500);
}

const timeoutScheduled = Date.now();

// This setTimeout will not execute after 3000 ms becuase while the 'poll' phase was 
// waiting for 3 seconds 'someAsyncOperation' got called in 2500 ms and it took
// another 2000+ seconds to execute. 

// After poll phase ended means it does not have any other callbacks
// to execute the event loop will start next operation in event loop phase.

// then it will arrive at the
// timers phase of event loop where this setTimeout will trigger.
// So this timeout fuction will take apprx - 2500+2000 = 4500+ ms to execute
setTimeout(() => {
    const delay = Date.now() - timeoutScheduled;
    console.log(`${delay}ms have passed since I was scheduled`);
}, 3000);

// do someAsyncOperation which takes 2000 ms to complete
someAsyncOperation(() => {
    const startCallback = Date.now();

    // do something that will take 10ms...
    while (Date.now() - startCallback < 2000) {
        // do nothing
    }
});
