import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { createPost, fetchPosts, deleteSelected } from '../actions/index';

const validate = values => {
    const errors = {}
    const requiredFields = [
        'name',
        'otherNames',
        'email',
        'level',
        'sex'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const style = {
    width: '100%',
};
const up = {
    textAlign: 'center',
    marginTop: '70px'
}
const select = {
    width: 'auto',
    textAlign: 'center',
    background: 'buttonface'
}
const renderTextField = ({
  input,
    label,
    meta: { touched, error },
    ...custom
}) =>
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />


/*const renderCheckbox = ({ input, label }) =>
    <Checkbox
        label={label}
        checked={input.value ? true : false}
        onCheck={input.onChange}
    />
*/
const renderRadioGroup = ({ input, ...rest }) =>
    <RadioButtonGroup
        {...input}
        {...rest}
        valueSelected={input.value}
        onChange={(event, value) => input.onChange(value)}
    />


class UpdateForm extends Component {
    render() {
        const { handleSubmit, pristine, submitting } = this.props
        return (
            <form className='form-it' onSubmit={handleSubmit}>
                <div>
                    <Field
                        name="name"
                        component={renderTextField}
                        label="Name"
                        style={style}
                    />
                </div>
                <div>
                    <Field name="otherNames" component={renderTextField} style={style} label="Other Name" />
                </div>
                <div>
                    <Field name="email" component={renderTextField} style={style} label="Email" />
                </div>
                <div>
                    <label>Sex</label>
                    <Field name="sex" component={renderRadioGroup} label="Sex">
                        <RadioButton value="male" label="male" />
                        <RadioButton value="female" label="female" />
                    </Field>
                </div>
                <div>
                    <label>Level</label>
                    <Field name="level" component="select" style={select}>
                        <option></option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="veteran">Veteran</option>
                    </Field>
                </div>
                <div style={up}>
                    <button style={{ marginRight: '5px' }} className='btn' type="submit" disabled={pristine || submitting}>
                        Submit
                    </button>
                    <h3 className='btn red' onClick={() => this.props.deleteSelected()}>
                        Cancel
                    </h3>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    // ...
    student: state.activeStudent
});
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createPost: createPost, fetchPosts: fetchPosts, deleteSelected: deleteSelected }, dispatch)
}
UpdateForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateForm);

export default reduxForm({
    form: 'example', // a unique name for this form
    validate
})(UpdateForm);