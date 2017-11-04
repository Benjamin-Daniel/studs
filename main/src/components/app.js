import React, { Component } from 'react';
import All from '../container/all_students';
import Student from '../container/selected_Student';
import NewForm from '../container/newForm';
import Header from '../container/Header';
import Toast from '../container/Toast';
import ToastError from '../container/ToastError';

export default class App extends Component {
  render() {
    return (
      <div>
          <Header />
          <All />
          <Student />
          <NewForm />
          <Toast />
          <ToastError />
      </div>
    );
  }
}
