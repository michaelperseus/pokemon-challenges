import React from 'react'

import {Link} from 'react-router-dom';

function RunTable(props) {

    const deleteRun = (id) => {

        const deleteData = {
            id: id
        }
        
        fetch(`/runs/delete`, {
            method: 'DELETE',
            body: JSON.stringify(deleteData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (res.status === 200) {
                window.location.reload(true);
            } else {
                alert('Error deleting')
            }
        })
    }

    const returnOwned = (props) => {
        if (props.owned) {
            return <td className="userEdit"><Link to={{pathname: `/edit-run/${props.run._id}`, state: {run: props.run}}}><button>Edit</button></Link><button onClick={() => deleteRun(props.run._id)} className="userDeleteRun">Delete</button></td>
        } else {
            return <td><Link to={`/user/${props.run.user}`}>{props.run.user}</Link></td>
        }
    }

    return (
            <tr>
                <td><Link to={`/run/${props.run._id}`}>{props.run.game}</Link></td>
                <td className="nonMobile">{props.run.completed}</td>
                <td className="nonMobile">{props.run.pokemon.length}</td>
                {returnOwned(props)}
            </tr>
    )
}

export default RunTable;
