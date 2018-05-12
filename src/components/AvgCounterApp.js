import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import AppBar from './AppBar';
import CoinSelector from './CoinSelector';
import TimeSelector from './TimeSelector';
import Plot from './Plot';
import AvgPlot from './AvgPlot';
import Speedometer from './Speedometer';


const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});

class AvgCounterApp extends React.Component {
    handleChange = event => {
        const { name, value } = event.target;
        if (name === 'chunkSize') {
            this.props.changeChunk(value * 1);
        } else if (name === 'coin') {
            this.props.changeCoin(value * 1);
        }
    }

    componentWillMount() {
        this.props.loadData();
    }
    render() {
        const { coins, selectedCoin, past, chunkSize } = this.props.AvgCounterApp;
        const { classes } = this.props;
        return (
            <div style={{background: "#eeeeee"}}>
                <AppBar />
                <CoinSelector
                    handleChange={this.handleChange}
                    coins={coins}
                    value={selectedCoin} />
                <TimeSelector
                    handleChange={this.handleChange}
                    value={chunkSize} />
                <div style={{clear: 'both'}}></div>
                <Paper className={classes.root} elevation={1}>
                    <Speedometer
                        data={past}
                        selectedCoin={selectedCoin} />
                </Paper>
                <Paper className={classes.root} elevation={1}>
                    <AvgPlot
                        data={past}
                        chunkSize={chunkSize}
                        selectedCoin={selectedCoin} />
                </Paper>
                <Paper className={classes.root} elevation={1}>
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