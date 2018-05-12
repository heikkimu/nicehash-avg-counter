import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class CoinSelector extends React.Component {

    getOptions() {
        let items = [];
        _.forEach(this.props.coins, function (item, id) {
            items.push(<option key={`coins-${id}`} value={item.algo}>{item.name}</option>);
        })
        return items;
    }

    render() {
        const { classes, handleChange, value } = this.props;
        return (
            <FormControl className={classes.formControl} style={{float: 'left'}}>
                <InputLabel htmlFor="coin-native-helper"></InputLabel>
                <Select
                    name="coin"
                    native
                    value={value.algo}
                    onChange={handleChange}
                    input={<Input id="coin-native-helper" />}
                >
                    {this.getOptions()}
                </Select>
                <FormHelperText>Select your coin</FormHelperText>
            </FormControl>
        );
    }
}

CoinSelector.propTypes = {
    classes: PropTypes.object.isRequired,
    coins: PropTypes.array.isRequired,
    value: PropTypes.object
};

export default withStyles(styles)(CoinSelector);