import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import SelectField from 'material-ui/SelectField'
//import asyncValidate from './asyncValidate' --> this is to imitate server latency
import { createStudent, clearStudent } from '../actions/index';

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
const up = {
    textAlign: 'center',
    marginTop: '70px'
}

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
// eslint-disable-next-line
const renderSelectField = ({
  input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) =>
    <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
    />
const style = {
    width: '100%',
};

class AddStuds extends Component {
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
                    <Field name="otherNames" style={style} component={renderTextField} label="Other Name" />
                </div>
                <div>
                    <Field name="email" style={style} component={renderTextField} label="Email" />
                </div>
                <div>
                    <Field name="sex" component={renderRadioGroup} label="Sex">
                        <RadioButton value="male" label="male" />
                        <RadioButton value="female" label="female" />
                    </Field>
                </div>
                <div>
                    <Field name="level" component="select">
                        <option value="beginner">Beginner</option>
                        <option defaultValue value="intermediate">Intermediate</option>
                        <option value="veteran">Veteran</option>
                    </Field>
                </div>
                <div style={up}>
                    <button style={{ marginRight: '5px' }} className='btn' type="submit" disabled={pristine || submitting}>
                        Submit
                    </button>
                    <h3 className='btn red' onClick={() => this.props.clearStudent()}>
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
    return bindActionCreators({ createStudent: createStudent, clearStudent: clearStudent }, dispatch)
}
AddStuds = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddStuds);

export default reduxForm({
    form: 'AddStuds', // a unique name for this form
    validate,
    initialValues: {
        level: 'beginner'
    }
})(AddStuds);