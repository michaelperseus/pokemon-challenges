import React from 'react';

//Sorts all submitted runs by Variation
export const sortRunsByType = async function() {
    const runs = [
        {
            type: 'nuzlocke',
            runs: 0
        },
        {
            type: 'solo-run',
            runs: 0
        },
        {
            type: 'wedlocke',
            runs: 0
        },
        {
            type: 'wonderlocke',
            runs: 0
        },
        {
            type: 'monotype',
            runs: 0
        }
    ]

    runs.forEach(type => {
        for (var i = 0; i < this.state.runs.length; i++) {
            if (type.type === this.state.runs[i].variation) {
                type.runs++
            } 
    }
    })
    const ordered = runs.sort((a, b) => a.runs > b.runs ? -1 : 1);

    const typeTable = ordered.map(type => {
    return <tr key={type.type}><td>{type.type}</td><td>{type.runs}</td></tr>
    })

    this.setState({typeTable: typeTable})
}

//Sorts all submitted runs by Completion Status
export const sortRunsByStatus = async function() {
    const runs = [
        {
            status: 'completed',
            runs: 0
        },
        {
            status: 'in progress',
            runs: 0
        },
        {
            status: 'failed',
            runs: 0
        }
    ]

    runs.forEach(type => {
        for (var i = 0; i < this.state.runs.length; i++) {
            if (type.status === this.state.runs[i].completed) {
                type.runs++
            } 
    }
    })
    const ordered = runs.sort((a, b) => a.runs > b.runs ? -1 : 1);

    const statusTable = ordered.map(type => {
    return (
            <tr key={Math.random()}>
                <td>{type.status}</td>
                <td>{type.runs}</td>
            </tr>
        )
    })

    this.setState({statusTable: statusTable})
}