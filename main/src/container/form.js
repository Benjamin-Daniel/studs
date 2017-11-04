import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { updatePost, fetchPosts, deleteSelected, setMessage } from '../actions/index';
import { connect } from 'react-redux';

import UpdateForm from './update'

class Form extends Component {
    
    submit = (props) => {
        var id = this.props.student._id
        this.props.updatePost(id, props)
        .then((data) => {
            this.props.setMessage('updated')
            this.props.deleteSelected();
            this.props.fetchPosts();
        })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <UpdateForm onSubmit={this.submit} />
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    // ...
    student: state.activeStudent
});
export default connect(mapStateToProps, { updatePost, fetchPosts, deleteSelected, setMessage })(Form);