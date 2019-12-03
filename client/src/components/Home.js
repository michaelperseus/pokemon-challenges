import React, { Component } from 'react';

import HomeBanner from '../img/Home_Banner.png'

class Home extends Component {
    render() {
        return (
            <div>
                <div className="homeBox">
                    <img src={HomeBanner} alt="Home Screen Banner"></img>
                    <p>'Pokemon Challenges' is a Lorem ipsum dolor sit amet, case solum sed ea, an atqui nusquam dissentias est, mei inani discere an. Duis quaestio te quo. Mei cu veri saperet alienum. Te vix dolore vivendum sensibus, eos laoreet accusam explicari an. Per ut audiam invenire. Et sed prima indoctum expetenda, ne duo dolorum persecuti. Nonumy laboramus in ius, augue exerci necessitatibus has te.</p>
                </div>
            </div>
        )
    }
}

export default Home;