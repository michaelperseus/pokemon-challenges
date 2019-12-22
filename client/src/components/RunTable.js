import React from 'react'

import {Link} from 'react-router-dom';

function RunTable(props) {

    const returnOwned = (props) => {
        if (props.owned) {
            return <td><Link to={{pathname: '/edit-run', state: {run: props.run}}} test={'hello world'}><button>Edit</button></Link><button onClick={() => this.deleteRun(props.run._id)}>Delete</button></td>
        } else {
            return <td>{props.run.user}</td>
        }
    }

    return (
            <tr>
                <td><Link to={`run/${props.run._id}`}>{props.run.game}</Link></td>
                <td>{props.run.completed}</td>
                <td>{props.run.pokemon.length}</td>
                {returnOwned(props)}
            </tr>
    )
}

export default RunTable;
