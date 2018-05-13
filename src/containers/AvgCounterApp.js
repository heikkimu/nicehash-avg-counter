import { connect } from 'react-redux';
import AvgCounterApp from '../components/AvgCounterApp'
import { changeAccount, changeCoin, loadData, changeChunk } from '../redux/modules/AvgCounterApp';

function mapStateToProps(state) {
    return {
        AvgCounterApp: state.AvgCounterApp,// gives our component access to state through props.toDoApp
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeAccount: (value) => dispatch(changeAccount(value)),
        changeCoin: (value) => dispatch(changeCoin(value)),
        changeChunk: (value) => dispatch(changeChunk(value)),
        loadData: () => dispatch(loadData())
    }; // here we're mapping actions to props
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AvgCounterApp);