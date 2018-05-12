import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ReactSpeedometer from "react-d3-speedometer";

class Speedometer extends React.Component {
    state = {
        max: 0,
        min: 0,
        current: 0,
    };
    componentWillReceiveProps(newProps) {
        if (newProps.data) {
            const data = _.find(newProps.data, { 'algo': newProps.selectedCoin.algo });
            const speeds = _.compact(_.map(data.data, '[1].a').map(Number));
            this.setState({
                max: _.max(speeds),
                min: _.min(speeds),
                current: _.last(speeds)
            })
        }
    }
    render() {

        const { min, max, current } = this.state;
        return <div style={{margin: 'auto', width: '100%', 'text-align': 'center'}}> 
                <ReactSpeedometer
                    value={current}
                    minValue={min}
                    maxValue={max}
                    height={180}
                    forceRender={true}
                    needleTransitionDuration={2000}
                    needleTransition="easeBounceOut"
                    currentValueText={"${value} " + this.props.selectedCoin.suffix} // eslint-disable-line 
                />
            </div>;
    }
}

Speedometer.propTypes = {
    data: PropTypes.array,
    selectedCoin: PropTypes.object
}

export default Speedometer;