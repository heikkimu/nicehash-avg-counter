import _ from 'lodash';
const COIN_CHANGED = 'COIN_CHANGED';
const CHUNK_CHANGED = 'CHUNK_CHANGED';
const LOAD_DATA = 'LOAD_DATA';
const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';

export function changeCoin(value) {
    return {
        type: COIN_CHANGED,
        value
    }
}
export function changeChunk(value) {
    return {
        type: CHUNK_CHANGED,
        value
    }
}
export function loadData() {
    return {
        type: 'LOAD_DATA',
        payload: {
            request: {
                url: 'api?method=stats.provider.ex&addr=39LnghJqWrRvAzJAmN7NNCgGL2vTEhoaXf'
            }
        }
    }
}
const initialState = {
    coins: [],
    selectedCoin:  JSON.parse(localStorage.getItem('coin')) || {},
    loading: false,
    chunkSize: localStorage.getItem('chunkSize')*1 ||10
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case COIN_CHANGED:
            const selectedCoin = _.find(state.coins, { algo: action.value })
            localStorage.setItem('coin', JSON.stringify(selectedCoin))
            return Object.assign(
                {},
                state,
                { selectedCoin }
            )
        case CHUNK_CHANGED:
            localStorage.setItem('chunkSize', action.value)
            return Object.assign(
                {},
                state,
                { chunkSize: action.value }
            )
        case LOAD_DATA:
            return { ...state, loading: true };
        case LOAD_DATA_SUCCESS:
            const { current, past } = action.payload.data.result;
            const coins = current.map(function (item, id) {
                return { algo: item.algo, name: item.name, suffix: item.suffix }
            })
            return { ...state, current, past, loading: false, coins, selectedCoin: coins[0] }
        default:
            return state;
    }
}