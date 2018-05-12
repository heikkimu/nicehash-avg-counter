import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function AppBarBlue(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Nicehash - average counter
                     </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

AppBarBlue.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarBlue);