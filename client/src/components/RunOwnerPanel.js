import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

async function setFeatured(username, runId) {
    const runData = {
        username,
        runId
    }
    await fetch('/users/saveFeaturedRun', {
        method: 'POST',
        body: JSON.stringify(runData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Username': `${localStorage.getItem('user')}`
        }
    }).then(res => {
        if (res.status === 200) {
            return window.location.reload(true);
        } else {
            return alert('An error has occured');
        }
    })
}

function RunOwnerPanel(props) {
    const [feat, setFeat] = useState(false);
    const [featText, setFeatText] = useState('Make Featured Run');

    useEffect(() => {
        fetch(`/users/verifyFeatRun/${props.runId}/${props.user}`)
            .then(res => res.json())
            .then(data => {
                if (data.check) {
                    setFeat(true);
                    setFeatText('Your Featured Run!');
                }
            })
    }, [props.runId, props.user]);

    return (
        <div id='ownerPanel'>
            <p>Owner Controls</p>
            <button onClick={() => setFeatured(props.user, props.runId)} disabled={feat}>{featText}</button>
            <button className='editButton'><Link to={`/edit-run/${props.runId}`}>Edit Run</Link></button>
        </div>
    )
}


export default RunOwnerPanel;
