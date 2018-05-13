import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { getTimeInReasonableFormat } from '../utils/index';

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

class TimeSelector extends React.Component {

    render() {
        const { classes, handleChange, value, error } = this.props;
        if(error) {
            return '';
        }

        return (
            <FormControl className={classes.formControl} style={{float: 'left'}}>
                <InputLabel htmlFor="coin-native-helper"></InputLabel>
                <Select
                    native
                    value={value}
                    onChange={handleChange}
                    name='chunkSize'
                    input={<Input id="coin-native-helper" />}
                >
                    {_.fill(Array(200), 1).map((item, i) => {
                        return <option key={`chunksize-${i}`} value={i}>{getTimeInReasonableFormat(i)}</option>
                    })}
                </Select>
                <FormHelperText>Select the sample size</FormHelperText>
            </FormControl>
        );
    }
}

TimeSelector.propTypes = {
    classes: PropTypes.object.isRequired,
    handleChange: PropTypes.func,
    value: PropTypes.number
};

export default withStyles(styles)(TimeSelector);