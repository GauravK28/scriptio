import React, {useState, useEffect} from 'react';

import socket from '../../../socketConfig';

const Counter = props => {
    const [timer, setTimer] = useState({countDown : "", msg : ""});
    useEffect(() => {
        socket.on('timer', (data) => {
            setTimer(data);
        });
        socket.on('done', () => {
            socket.removeListener('timer');
        })
    }, []);

    const {countDown, msg} = timer;
    return (
        <>
            <div className="countdown-container">
                <span className='countdown'>{countDown}</span>
            </div>
        </>
    )
}

export default Counter;