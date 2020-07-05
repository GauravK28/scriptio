import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


class Practice extends Component {
    render() {
        return (
            <div className="container">
                {/* <h3>Practice Mode</h3> */}
                <div className="card-container">
                    <h3>Practice Mode</h3>
                    <div className="description">Hone your typing skills with instant single player races.</div>
                    <div className="user-input">
                        <Button className="StartPractice" size="lg" block variant="primary" >Start Practice</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Practice;


// onClick={() => this.startGame()}