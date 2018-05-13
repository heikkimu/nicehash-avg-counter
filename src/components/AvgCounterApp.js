import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';

import AppBar from './AppBar';
import CoinSelector from './CoinSelector';
import TimeSelector from './TimeSelector';
import Plot from './Plot';
import AvgPlot from './AvgPlot';
import Speedometer from './Speedometer';
import ProgressBar from './ProgressBar';



const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});

class AvgCounterApp extends React.Component {
    state = {
        timeout: 60000
    };

    handleChange = event => {
        const { name, value } = event.target;
        if (name === 'chunkSize') {
            this.props.changeChunk(value * 1);
        } else if (name === 'coin') {
            this.props.changeCoin(value * 1);
        }
    }

    componentWillMount() {
        this.props.loadData()
        setInterval(() => this.props.loadData(), this.state.timeout)
    }
    render() {
        const { coins, selectedCoin, past, chunkSize } = this.props.AvgCounterApp;
        const { timeout } = this.state;
        const { classes } = this.props;
        return (
            <div style={{ background: "#eeeeee" }}>
                <AppBar />
                <CoinSelector
                    handleChange={this.handleChange}
                    coins={coins}
                    value={selectedCoin} />
                <TimeSelector
                    handleChange={this.handleChange}
                    value={chunkSize} />
                <div style={{ clear: 'both' }}></div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="headline" gutterBottom align="center">
                        Current speed
                    </Typography>
                    <Speedometer
                        data={past}
                        selectedCoin={selectedCoin} />
                    <ProgressBar timeout={timeout} />
                </Paper>
                <Paper className={classes.root} elevation={1}>
                    <Tooltip title="This will show you the avg-mining speed by the time. For example: What's your avg speed in during the last 10 minutes, last 30 minutes etc.">
                        <Typography variant="headline" gutterBottom align="center">
                            Trend speed
                        </Typography>
                    </Tooltip>
                    <AvgPlot
                        data={past}
                        chunkSize={chunkSize}
                        selectedCoin={selectedCoin} />
                </Paper>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="headline" gutterBottom align="center">
                        Mining history, normalized by the sample size
                    </Typography>
                    <Plot
                        data={past}
                        chunkSize={chunkSize}
                        selectedCoin={selectedCoin} />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(AvgCounterApp);