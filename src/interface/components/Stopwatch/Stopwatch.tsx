import React from 'react';

/**
 * A stopwatch that allows you to measure the duration of an action
 * @constructor
 */
function Stopwatch() {
    const [time, setTime] = React.useState(0);
    const [isLaunched, setIsLaunched] = React.useState(false);

    React.useEffect(() => {
        let interval: number;
        if (isLaunched) {
            interval = setInterval(() => {
                setTime((prevState) => prevState + 10);
            }, 10);
        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isLaunched]);

    return (
        <div className="flex">
            <div className="flex flex-row">
                <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
            </div>
            <div className="buttons">
                <button onClick={() => setIsLaunched(true)}>Start</button>
                <button onClick={() => setIsLaunched(false)}>Stop</button>
                <button onClick={() => setTime(0)}>Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch;
