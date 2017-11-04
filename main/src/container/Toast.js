import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { connect } from 'react-redux'
// import { setMessage } from '../actions/index';

class Toast extends Component {
    notify = (mes) => toast(mes);

    render() {
        if (this.props.message === null) {
            return <div></div>
        }
        return (
            <div>
                <div className='null'>
                    {this.notify(this.props.message)}
                </div>
                <ToastContainer
                    position="bottom-left"
                    type="default"
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
}

function mapStateToProps(state) {
    return {
        message: state.message
    };
}


export default connect(mapStateToProps)(Toast)
