import React, {useState, useEffect} from 'react';

import socket from '../../../socketConfig';

const Counter = ({isOver}) => {
    const [timer, setTimer] = useState({countDown : "", msg : ""});
    useEffect(() => {
        socket.on('timer', (data) => {
            setTimer(data);
        });
    })

    useEffect(() => {
        socket.on('timer', (data) => {
            setTimer(data);
        });
        socket.on('done', () => {
            socket.removeListener('timer');
        })
    }, []);

    const {countDown} = timer;
    return (
        <>
            {!isOver ? 
            <div className="countdown-container">
                <span className='countdown'>{countDown}</span>
            </div>
            : null}
        </>
    )
}

export default Counter;