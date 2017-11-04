import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { fetchPosts, createPost, deleteSelected, clearStudent, setError } from '../actions/index';
import { connect } from 'react-redux';

import AddStuds from './addStuds'

class NewForm extends Component {
    submit = (props) => {
        this.props.createPost(props)
            .then(data => {
                if (data.error) {
                    this.props.clearStudent();
                    return this.props.setError('Server\'s down')
                }
                this.props.clearStudent();
                this.props.fetchPosts();
            })
    }

    render() {
        if (this.props.add === false) {
            return <div></div>
        } else {
            return (
                <div className='container'>
                    <div className='cover'>
                        <div
                            onClick={() => {
                                this.props.clearStudent()
                            }}
                            className='X'><i className="material-icons right">close</i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card mist hest index lavender darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">Add Student</span>
                                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                                        <AddStuds onSubmit={this.submit.bind(this)} />
                                    </MuiThemeProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
function mapStateToProps(state) {
    return {
        add: state.addStudent
    };
}

export default connect(mapStateToProps, { createPost, deleteSelected, clearStudent, fetchPosts, setError })(NewForm);