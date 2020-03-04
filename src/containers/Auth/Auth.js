import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../components/ui/Input/Input';
import Button from "../../components/ui/Button/Button";
import classes from './Auth.css';
import {auth} from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please, enter your email',
                    type: 'email'
                },
                validation: {
                    required: true,
                    isEmail: true,
                    valid: false
                },
                value: '',
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please, enter your password',
                    type: 'password'
                },
                validation: {
                    required: true,
                    minLength: 6,
                    valid: false
                },
                value: '',
                touched: false
            }
        },

        isSignUp: true
    };

    /**
     * Run validation checks
     * @param value
     * @param rule
     * @returns {boolean}
     */
    checkValidity(value, rule) {
        let isValid = true;


        if (rule && rule.required) {
            isValid = value.trim() !== '';
        }

        return isValid;
    };

    onInputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                validation: {
                    ...this.state.controls[controlName].validation,
                    valid: this.checkValidity(
                        event.target.value,
                        this.state.controls[controlName].validation
                    )
                },
                touched: true,
            }
        };

        console.log(updatedControls);

        this.setState({
            controls: updatedControls
        });
    };

    onAuth = event => {
        event.preventDefault();

        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp
        )
    };

    onSwitchModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        });
    };

    render() {
        const orderFormArray = [];

        for (let key in this.state.controls) {
            if (this.state.controls.hasOwnProperty(key)) {
                orderFormArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
        }

        let form = (
            <form onSubmit={this.onAuth}>
                {orderFormArray.map(item => (
                    <Input key={item.id}
                           changed={event => this.onInputChangedHandler(event, item.id)}
                           elementType={item.config.elementType}
                           elementConfig={item.config.elementConfig}
                           valid={item.config.validation ? item.config.validation.valid : true}
                           touched={item.config.touched}
                           value={item.config.value}/>
                ))}
                <Button btnType={'Success'}>
                    SUBMIT
                </Button>
            </form>
        );

        return (
            <div className={classes.Auth}>
                {form}

                <Button btnType={'Danger'}
                        clicked={this.onSwitchModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}
                </Button>
            </div>
        );
    }
}

const maoDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp))
    };
};

export default connect(null, maoDispatchToProps)(Auth);