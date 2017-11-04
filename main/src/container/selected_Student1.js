import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteSelected, updatePost, clearStudent, fetchPosts, deletePost } from '../actions/index';
import { bindActionCreators } from 'redux';
import Form from '../container/form';


class Student extends Component {

    deleteStudent() {
        var thestudent = this.props.student;
        var id = thestudent._id;
        this.props.deletePost(id)
            .then((data) => {
                if (!data.error) {
                    let sucess = data.payload.data.sucess
                    console.log(sucess)
                    console.log('deleted')
                    //this.props.clearStudent()
                    //this.props.deleteSelected()
                    //this.props.fetchPosts()
                } else {
                    let theerror = data.payload.response.data.error;

                    console.log(theerror);
                }
            })
    }
    render() {
        console.log(this.props)
        if (!this.props.student) {
            return 
            <div>Select a book to get started
            </div>
        }

        const selectedStudent = this.props.student;
        const studentLevel = selectedStudent.level;
        var studentImgUrl = `img/${studentLevel}.svg`;
        var divStyle = {
            overFlow: '-webkit-paged-y',
            WebkitTransition: 'all', // note the capital 'W' here
            msTransition: 'all' // 'ms' is the only lowercase vendor prefix
        };
        return (
            <div>
                {/* One container to rule them all! */}
                <h3>Details for:</h3>
                <div>{this.props.student.name}</div>
                <div className="container main">
                    <div>
                        <div className="cover"
                            onClick={() => {
                            }}
                        >
                            <div
                                className="X"
                                onClick={() => {
                                    this.props.deleteSelected()
                                }}
                            >
                            <i className="material-icons right">close</i></div>
                        </div>

                        <div className="row">
                            <div className="col s12 m12">
                                <div className="card mist index z-depth-5" style={divStyle}>

                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator activator-img" src={studentImgUrl} title="click on the image to edit and see the info" alt={`${studentLevel}`} />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4"><p>My name is {selectedStudent.name} </p><i className="material-icons right">more_vert</i></span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">{selectedStudent.name} {selectedStudent.otherNames}<i className="material-icons right">close</i></span>
                                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                                        <div className="col s12">
                                            <h3
                                                onClick={() => {
                                                    { this.deleteStudent() }
                                                }}
                                                id='delete' className="btn red" >DELETE</h3>
                                        </div>
                                        <div id="" className="col s12"><Form /></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        student: state.activeStudent
    };
}


//export default connect(mapStateToProps, { deleteSelected, updatePost, fetchPosts, clearStudent, deletePost })(Student)
