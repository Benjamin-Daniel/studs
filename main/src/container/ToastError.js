import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from 'react-redux'

class ToastError extends Component {
    notify = (mes) => toast.error(mes);

    render() {
        if (this.props.error) {
            return (
                <div>
                    <div className='null'>
                        {this.notify(this.props.error)}
                    </div>
                    <ToastContainer
                        position="top-right"
                        type="error"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        pauseOnHover
                    />
                    {/*Can be written <ToastContainer /> */}
                </div>
            );
        }
        return null
    }
}

function mapStateToProps(state) {
    return {
        error: state.error
    };
}


export default connect(mapStateToProps)(ToastError)
