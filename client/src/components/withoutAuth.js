import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default function withoutAuth(ComponentToProtect) {
   return class extends Component {
       constructor() {
           super();
           this.state = {
               loading: true,
               redirect: false,
           }
       };

       componentDidMount () {
            if(localStorage.getItem('token')) {
                return this.setState({loading: false, redirect: true});
            }
            this.setState({loading: false})
        }

       render() {
           const {loading, redirect} = this.state;
           if (loading) {
               return null;
           }
           if (redirect) {
               return <Redirect to="/" />
           }
           return <ComponentToProtect {...this.props} />;
       }
   }
}
