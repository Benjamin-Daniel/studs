import React, { Component } from 'react';
import { addStudent } from '../actions/index'
import { connect } from 'react-redux';

class Header extends Component {
    onclick() {
        this.props.addStudent()
    }
    render() {
        return (
            <nav style={{ backgroundColor: 'lavender' }}>

                <div className="nav-wrapper"  >
                    <a href="/" className="brand-logo black-text">STUDS</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a
                            className='color-dd-gradient'
                            onClick={this.onclick.bind(this)}>ADD A STUDENT</a></li>
                    </ul>
                </div >
                <div className="fixed-action-btn"
                    onClick={this.onclick.bind(this)}
                    id='add'>
                    <a className="btn-floating btn-large btn blue black-text waves-effect waves-light">
                        <i className="large material-icons">add</i>
                    </a>
                </div>
            </nav >
        );
    }
}

export default connect(null, { addStudent })(Header);