import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Tooltip from 'material-ui/Tooltip';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    fab: {
        margin: theme.spacing.unit * 2,
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 3,
    },
});

class LinearDeterminate extends React.Component {
    state = {
        completed: 0,
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, this.props.timeout / 100);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    timer = null;

    progress = () => {
        const { completed } = this.state;
        if (completed === 100) {
            this.setState({ completed: 0 });
        } else {
            this.setState({ completed: completed + 1 });
        }
    };

    render() {
        const { classes } = this.props;
        const totalTime = this.props.timeout / 1000;
        const timeLeft = Math.round(totalTime - ((this.props.timeout / 1000 / 100) * this.state.completed));
        return (
            <Tooltip id="tooltip-icon" title={`Reloading data in ${timeLeft} seconds`}>
                <div className={classes.root}>
                    <LinearProgress variant="determinate" value={this.state.completed} />
                </div>
            </Tooltip>
        );
    }
}

LinearDeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
    timeout: PropTypes.number.isRequired
};

export default withStyles(styles)(LinearDeterminate);