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


//Check if Pokemon is in Galar Pokedex
export const checkGalar = async function (poke) {

    const galarList = ['grookey', 'thwackey', 'rillaboom', 'scorbunny', 'raboot', 'cinderace', 'sobble', 'drizzile', 'inteleon', 'blipbug', 'dottler', 'orbeetle', 'rookidee', 'corvisquire', 'corviknight', 'skwovet', 'greedent', 'nickit', 'thievul', 'obstagoon', 'wooloo', 'dubwool', 'chewtle', 'drednaw', 'yamper', 'boltund', 'gossifleur', 'eldegoss', 'sizzlipede', 'centiskorch', 'rolycoly', 'carkol', 'coalossal', 'arrokuda', 'barraskewda', 'perrserker', 'milcery', 'alcremie', 'applin', 'flapple', 'appletun', 'sirfetchd', 'cursola', 'impdimp', 'morgrem', 'grimmsnarl', 'hatenna', 'hattrem', 'hatterene', 'cufant', 'copperajah', 'cramorant', 'toxel', 'toxtricity', 'silicobra', 'sandaconda', 'runerigus', 'sinistea', 'polteageist', 'morpeko', 'falinks', 'snom', 'frosmoth', 'clobbopus', 'grapploct', 'pincurchin', 'mr.rime', 'stonjourner', 'eiscue', 'duraludon', 'dracozolt', 'arctozolt', 'dracovish', 'arctovish', 'dreepy', 'drakloak', 'dragapult', 'zacian', 'zamazenta', 'eternatus'];

    let check = false

    if (galarList.includes(poke)) {
        check = true
    } else {
        check = false
    }
    return check
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


//Returns class for average rating
export const returnRatingClass = function (rating) {
    if (rating < 3) {
        return 'badRating'
    }
    if (rating < 5) {
        return "okRating"
    }
    return "goodRating"
}


//Returns users rating for a game
export const returnUserRating = async function (game, user) {
    const userRating = await fetch(`/games/rating/${game}/${user}`)
        .then(res => res.json())

    return userRating
}