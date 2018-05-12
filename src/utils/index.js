const getDataSet = (datasetLabel, data, color) => {
    return {
        label: datasetLabel,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
    }
}

export function getPlotSettings(labels, datasets) {
    /**
     * labels = [scale for x-axis]
     * datasets = [{datasetLabel: <string>, data: <array>}]
     */
    const colors = ['rgba(75,192,192,1)', 'red']
    let ds = datasets.map((item, i) => {
        return getDataSet(item.datasetLabel, item.data, colors[i])
    })

    return {
        labels: labels,
        datasets: ds
    }
}

export function round(item) {
    return Math.round(item * 100) / 100
};

export function getTimeInReasonableFormat(chunkSize) {
    const time = chunkSize * 300;
    let d = Math.floor(time / (3600 * 24));
    let h = Math.floor(time / 3600);
    let m = Math.floor(time % 3600 / 60);

    if (d) {
        h = h - 24 * d;
        return `${d}d ${h}h ${m}min`;
    }
    return `${h}h ${m}min`;
}