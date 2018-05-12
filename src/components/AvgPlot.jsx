import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { getPlotSettings, round, getTimeInReasonableFormat } from '../utils/index';

const styles = theme => ({});


class AvgPlot extends React.Component {
    state = {
        plotData: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.updateData(nextProps);
        }
    }

    updateData(props) {
        const data = _.find(props.data, { 'algo': props.selectedCoin.algo });
        if (undefined === data) {
            return
        }
        const speedsAndTimes = _.compact(data.data.map((item) => { // eslint-disable-line
            const speed = item[1].a * 1;
            if (!_.isNaN(speed) && _.isNumber(speed) && speed > 0) {
                return { speed: speed, time: item[0] * 300 /* convert to unix time */ };
            }
        }));
        _.reverse(speedsAndTimes);
        const plotData = [];
        const plotLabels = [];
        for (let i = 80; i > 0; i--) {
            let time = 3 * i * 2 // 12 = 1h
            let chunks = _.first(_.chunk(speedsAndTimes, time));
            plotData.push(_.mean(_.map(chunks, 'speed')));
            plotLabels.push(getTimeInReasonableFormat(time));
        }
        const avgSpeed = _.mean(_.map(speedsAndTimes, 'speed'));
        this.setState({
            plotData: getPlotSettings(plotLabels, [
                { datasetLabel: 'Trend', data: plotData },
                {datasetLabel: `7d Avg (${round(plotData[0])}${props.selectedCoin.suffix})`, data: _.fill(Array(plotData.length), avgSpeed)},
            ])
        })
    }

    render() {
        return (<Line height={100} data={this.state.plotData} />);
    }
}

AvgPlot.propTypes = {
    label: PropTypes.string,
    selectedCoin: PropTypes.object,
    avg: PropTypes.bool,
    data: PropTypes.array,
    chunkSize: PropTypes.number
}
export default withStyles(styles)(AvgPlot);