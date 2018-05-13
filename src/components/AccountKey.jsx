import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import Button from 'material-ui/Button';

import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        float: 'left'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
        marginTop: '2em'
    },
});

class AccountKey extends React.Component {

    state = {
        value: this.props.value,
        showSubmit: false
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
            showSubmit: true
        });
    }

    onClick = () => {
        const event = {target: {value: this.state.value, name: 'accountKey'}}
        this.props.handleChange(event);
    }


    render() {
        const { classes, error, defaultAccountKey } = this.props;
        let errorMessage = '';
        if (error) {
            errorMessage = `${error}, you may use: ${defaultAccountKey}`
        }
        let showSaveButton = { display: 'none' };
        if (this.state.showSubmit) {
            showSaveButton = {display: 'inline-flex'};
        }
        return (
            <div>
                <FormControl className={classes.formControl} error={error}>
                    <InputLabel htmlFor="coin-native-helper"></InputLabel>
                    <Input
                        label="Account Key"
                        className={classes.textField}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <FormHelperText>{errorMessage || 'Nicehash account Bitcoin address'}</FormHelperText>
                </FormControl>
                <FormControl style={showSaveButton}>
                    <Button 
                        name="accountKey"
                        variant="raised"
                        size="small"
                        color="primary"
                        className={classes.button}
                        onClick={this.onClick}>
                        Save
                    </Button>
                </FormControl>
            </div>
        );
    }
}

AccountKey.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    defaultAccountKey: PropTypes.string
};

export default withStyles(styles)(AccountKey);