import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ReactSpeedometer from "react-d3-speedometer";
import moment from 'moment';

class Speedometer extends React.Component {
    state = {
        max: 0,
        min: 0,
        current: 0,
        latestTime: 0
    };
    componentWillReceiveProps(newProps) {
        if (newProps.data && (newProps.selectedCoin !== this.props.selectedCoin)) {

            const data = _.find(newProps.data, { 'algo': newProps.selectedCoin.algo });
            const speeds = _.compact(_.map(data.data, '[1].a').map(Number));
            const last = _.last(data.data);
            let time = 0;
            let currentSpeed = 0;
            if (last[1].a)
            // If it has speed in latest measurements
            {
                currentSpeed = last[1].a * 1;
                time = last[0] * 300;
            } else {
                // Find last speed & time
                const lastIndex = _.findLastIndex(data.data, (item) => { return item[1].a });
                time = data.data[lastIndex][0] * 300;
                currentSpeed = data.data[lastIndex][1].a * 1;
            }

            this.setState({
                max: _.max(speeds),
                min: _.min(speeds),
                current: currentSpeed,
                latestTime: moment.duration(moment.unix(time).diff(moment())).humanize(true)
            })
        }
    }
    render() {

        const { min, max, current, latestTime } = this.state;
        const { selectedCoin, error } = this.props;
        if (error) {
            return '';
        }
        return <div style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>
            <ReactSpeedometer
                value={current}
                minValue={min}
                maxValue={max}
                height={180}
                forceRender={true}
                needleTransitionDuration={2000}
                needleTransition="easeBounceOut"
                currentValueText={"${value} " + `${selectedCoin.suffix} (${latestTime})`} // eslint-disable-line 
            />
        </div>;
    }
}

Speedometer.propTypes = {
    data: PropTypes.array,
    selectedCoin: PropTypes.object,
    error: PropTypes.bool
}

export default Speedometer;