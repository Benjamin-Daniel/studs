import React, { Component } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line
import { bindActionCreators } from 'redux'
import { fetchPosts, selectedStudent, addStudent, setError } from '../actions/index'

const imgstyle = {
    width: '-webkit-fill-available',
    height: '-webkit-fill-available'
}
const listStyle = {
    display: 'list-item'
}
class All extends Component {

    componentDidMount() {
        this.props.fetchPosts()
            .then(data => {
                if (data.error) {
                    this.props.setError('Server\'s down 👻');
                }
            })
    }

    renderPosts() {
        if (!this.props.students) {
            return (
                <div className='text-center'> Loading...
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>

                        <div className="spinner-layer spinner-red">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>

                        <div className="spinner-layer spinner-yellow">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>

                        <div className="spinner-layer spinner-green">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.props.students.length === 0) {
            return (
                <div>
                    The Database is empty
                <div className='flow-text'>
                        Well i guess this is the first time you are using this app.
                    This is a School <code className='blue-text'>(Bakery)</code> web app, each student has a
                    a particular level,
                    <ul style={{ display: 'flex', flexDirection: 'column' }}>
                            <li style={listStyle}>
                                <p>
                                    Beginner
                                </p>
                                <small>
                                    The student's in this catergory are those that have no or little
                                    experience in this field
                            </small>
                            </li>
                            <li style={listStyle}>
                                <p>
                                    Intermediate
                                </p>
                                <small>
                                    The student's in this catergory are those that are averagely
                                experience in this field
                                </small>
                            </li>
                            <li style={listStyle}>
                                <p>
                                    Veteran
                                </p>
                                <small>
                                        The student's in this catergory are those that are
                                        experienced in this field
                                 </small>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
        return this.props.students.map((student) => {
            var Pronoun = 'He';
            if (student.sex === 'female') {
                Pronoun = 'She'
            }
            const studentLevel = student.level;
            var studentImgUrl = `img/${studentLevel}.svg`;
            return (
                <li key={student._id} onClick={() => {
                    this.props.selectedStudent(student);
                }}
                    className="StudentListItem hoverable item waves-effect">
                    <div className="col s12 m9 l9">

                        <span className="color-dd-gradient theHeader truncate">{student.otherNames} {student.name}</span>
                        <br />
                        {Pronoun} was added on {student.added}
                    </div>
                    <div className="col s3 m3 l3 hide-on-small-only">
                        <p className='center-align' style={{ margin: '0', textTransform: 'capitalize' }}>{studentLevel}</p>
                        <img src={`${studentImgUrl}`} width='120px' height='150px' style={imgstyle} alt={`${studentLevel}`} />
                    </div>
                </li>
            )
        });


    }
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <ul>
                        {this.renderPosts()}
                    </ul>
                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        students: state.students.all
    };
}

/*
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectedStudent: selectedStudent }, dispatch)
}
*/

export default connect(mapStateToProps, { fetchPosts, selectedStudent, addStudent, setError })(All);

