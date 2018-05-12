import _ from 'lodash';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { getPlotSettings, round } from '../utils/index';

const styles = theme => ({});


class Plot extends React.Component {
    state = {
        plotData: {}
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.data) {
            this.updateData(nextProps);
        }
    }

    updateData(props) {
        const data = _.find(_.assign({}, props.data), { 'algo': props.selectedCoin.algo });
        if(undefined === data) {
            return
        }
        const speedsAndTimes = _.compact(data.data.map((item) => { // eslint-disable-line
            const speed = item[1].a * 1;
            if (!_.isNaN(speed) && _.isNumber(speed) && speed > 0) {
                return { speed: speed, time: item[0] * 300 /* convert to unix time */ };
            }  
        }));
        const chunks = _.chunk(speedsAndTimes, props.chunkSize);
        const means = [];
        const plotData = [];
        const plotLabels = [];
        for (let i = 0; chunks.length > i; i++) {
            const mean = {};
            const time = _.map(chunks[i], 'time')[0];
            mean.speed = _.mean(_.map(chunks[i], 'speed'));
            mean.date = moment.unix(time).format('DD.MM.YYYY');
            mean.time = moment.unix(time).format('HH:mm');
            if( moment.unix(time).isValid() && !_.isNaN(mean.speed)) {
            	plotData.push(mean.speed);
            	plotLabels.push(moment.unix(time).format('DD.MM.YYYY HH:mm'))
                means.push(mean);
            }
        }
        const avgSpeed = _.mean(_.map(speedsAndTimes, 'speed'));
        this.setState({ plotData: getPlotSettings(plotLabels, [
            {datasetLabel: 'Speed', data: plotData},
            {datasetLabel: `7d Avg (${round(avgSpeed)}${props.selectedCoin.suffix})`, data: _.fill(Array(plotData.length), avgSpeed)},
        ]) })
    }

    render() {
        return (<Line data={this.state.plotData} />);
    }
}

Plot.propTypes = {
    label: PropTypes.string,
    selectedCoin: PropTypes.object,
    avg: PropTypes.bool,
    data: PropTypes.array,
    chunkSize: PropTypes.number
}
export default withStyles(styles)(Plot);