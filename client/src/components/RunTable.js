import React from 'react'

import {Link} from 'react-router-dom';

function RunTable(props) {

    const returnButtons = (props) => {
        if (props.owned) {
            return <td><Link to={{pathname: '/edit-run', state: {run: props.run}}} test={'hello world'}><button>Edit</button></Link><button onClick={() => this.deleteRun(props.run._id)}>Delete</button></td>
        } 
    }

    return (
            <tr>
                <td>{props.run.game}</td>
                <td>{props.run.completed}</td>
                <td>{props.run.pokemon.length}</td>
                {/* <td><Link to={{pathname: '/edit-run', state: {run: props.run}}} test={'hello world'}><button>Edit</button></Link><button onClick={() => this.deleteRun(props.run._id)}>Delete</button></td> */}
                {returnButtons(props)}
            </tr>
    )
}

export default RunTable;
