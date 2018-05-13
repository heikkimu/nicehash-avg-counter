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
        if (newProps.data && (newProps.data !== this.props.data)) {
            
            const data = _.find(newProps.data, { 'algo': newProps.selectedCoin.algo });
            const speeds = _.compact(_.map(data.data, '[1].a').map(Number));
            const time = _.last(data.data)[0]*300
            console.log('time', time)
            this.setState({
                max: _.max(speeds),
                min: _.min(speeds),
                current: _.last(speeds),
                latestTime:  moment.duration(moment.unix(time).diff(moment())).humanize(true)
            })
        }
    }
    render() {

        const { min, max, current, latestTime } = this.state;
        return <div style={{margin: 'auto', width: '100%', textAlign: 'center'}}> 
                <ReactSpeedometer
                    value={current}
                    minValue={min}
                    maxValue={max}
                    height={180}
                    forceRender={true}
                    needleTransitionDuration={2000}
                    needleTransition="easeBounceOut"
                    currentValueText={"${value} " + `${this.props.selectedCoin.suffix} (${latestTime})`} // eslint-disable-line 
                />
            </div>;
    }
}

Speedometer.propTypes = {
    data: PropTypes.array,
    selectedCoin: PropTypes.object
}

export default Speedometer;