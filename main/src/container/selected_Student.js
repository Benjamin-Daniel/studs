import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteSelected, setMessage, setError, updatePost, clearStudent, fetchPosts, deletePost } from '../actions/index';
import Form from '../container/form';

const img = {
    height: '25em'
}
const block = {
    display: 'block',
    fontSize: '20px',
    textTransform: 'capitalize'
}
const caps = {
    fontFamily: '"Product Sans", Arial, sans-serif',
    textTransform: 'capitalize'
}

class Student extends Component {
    deleteStudent() {
        var thestudent = this.props.student;
        var id = thestudent._id;
        this.props.deletePost(id)
            .then((data) => {
                this.props.deleteSelected()
                this.props.clearStudent()
                //this.props.setError('Server\'s down 👻')
                if (data.error) {
                    // let theerror = data.payload.response.data.error;
                    this.props.deleteSelected()
                    this.props.clearStudent()
                    return this.props.setError(`${thestudent.name} wasn't deleted`)
                }
                if (!data.error) {
                    this.props.setMessage(`${thestudent.name} has been deleted`)
                    this.props.deleteSelected()
                    this.props.clearStudent()
                    return this.props.fetchPosts()
                        .then((data) => {
                            if (data.error) {
                                this.props.setError('Server\'s down 👻')
                            }
                        })
                }
            })
    }

    render() {
        if (!this.props.student) {
            return <div className='null'></div>
        }
        const selectedStudent = this.props.student;
        const studentLevel = selectedStudent.level;
        var studentImgUrl = `img/${studentLevel}.svg`;
        return (
            <div>
                <h3>Details for:</h3>
                <div>{this.props.student.name}</div>
                <div className="container main">
                    <div>
                        <div className="cover">
                            <div
                                className="X"
                                onClick={() => {
                                    this.props.deleteSelected()
                                }}
                            ><i className="material-icons right">close</i>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12 m12">
                                <div className="card mist index z-depth-5">

                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img className="activator activator-img" style={img} src={studentImgUrl} title="click on the image to edit and see the info" alt={`${studentLevel}`} />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4"><p>My name is <span className='color-dd-gradient' style={caps}>{selectedStudent.name}</span> </p><i className="material-icons right">more_vert</i></span>
                                        <span style={block}>Level: {selectedStudent.level}</span>
                                        <span style={block}>Sex: {selectedStudent.sex}</span>
                                        <span style={{
                                            display: 'block',
                                            fontSize: '20px'
                                        }}>Email: {selectedStudent.email}</span>
                                        <span className='grey-text'>click the image to edit this student</span>
                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4"><span className='color-dd-gradient' style={caps}>{selectedStudent.name} {selectedStudent.otherNames}</span><i className="material-icons right">close</i></span>
                                        <div className="col s12">
                                            <h3
                                                onClick={this.deleteStudent.bind(this)}
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


export default connect(mapStateToProps, { deleteSelected, setMessage, setError, updatePost, fetchPosts, clearStudent, deletePost })(Student)
