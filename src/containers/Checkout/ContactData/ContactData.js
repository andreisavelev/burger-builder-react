import React, {Component} from 'react';

import Button from '../../../components/ui/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h1>Enter your contact data</h1>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="number" name="postal" placeholder="Your Postal Code" />
                    <Button btnType={'Success'}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;