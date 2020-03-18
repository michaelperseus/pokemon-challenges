import React from 'react';

//Takes in a string and returns is capitalized
export const capitalizeString = function (string) {
    const lowercase = string.toLowerCase();

    let final = lowercase[0].toUpperCase().concat(lowercase.slice(1));
    return final
}

//Sorts all submitted runs by Variation
export const sortRunsByType = async function () {
    const runs = [{
        type: 'nuzlocke',
        runs: 0
    },
    {
        type: 'egglocke',
        runs: 0
    },
    {
        type: 'eeveelocke',
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
    },
    {
        type: 'shinylocke',
        runs: 0
    },
    {
        type: 'eliminationlocke',
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
        return <tr key={type.type}><td>{capitalizeString(type.type)}</td><td>{type.runs}</td></tr>
    })

    this.setState({ typeTable: typeTable })
}


//Sorts all submitted runs by Completion Status
export const sortRunsByStatus = async function () {
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
                <td>{capitalizeString(type.status)}</td>
                <td>{type.runs}</td>
            </tr>
        )
    })

    this.setState({ statusTable: statusTable })
}



//Check is text contains filtered words
export const checkFilter = async function (word) {

    const banList = [' anal ', ' analplug ', ' analsex', ' anus ', ' ass ', ' asshole ', ' bastard ', ' bitch ', ' blowjob ', ' bullshit ', ' clit ', ' clitoris ', ' cock ', ' cocksucker ', ' cuckold ', ' condom ', ' cum ', ' cumshot ', ' cumslut ', ' cunt ', ' damn ', ' dick ', ' dicks ', ' dickhead ', ' dildo ', ' dirtbag ', ' ejaculate ', ' fag ', ' fags ', ' faggot ', ' faggy ', ' faggy ', ' fellatio ', ' fuck ', ' fucker ', ' fuckface ', ' fuk ', ' genital ', ' genitals ', ' goddamn ', ' handjob ', ' hitler ', ' homo ', ' jackoff ', ' jerkoff ', ' jizz ', ' masterbate', ' masterbation ', ' motherfucker ', ' molest ', ' nazi ', ' nigga ', ' nigger ', ' nipple ', ' oral ', ' orgasm ', ' orgy ', ' pedo ', ' pedophile ', ' penis ', ' prostitute ', ' pussy ', ' rape ', ' raped ', ' rapes ', ' rapist ', ' retard ', ' scrotum ', ' sex ', ' sexual ', ' shit ', 'shitface ', ' slut ', ' slutty ', ' sperm ', ' testicles ', ' tit ', ' titty', ' tits ', ' twat ', ' vagina ', ' whore '];

    let check = {
        check: false,
        value: ''
    }

    let lowerWord = word.toLowerCase();
    let spacedWord = ` ${lowerWord} `;

    banList.forEach(w => {
        if (spacedWord.includes(w)) {
            check.check = true
            check.value = w
            return
        }
    })

    return check
}



