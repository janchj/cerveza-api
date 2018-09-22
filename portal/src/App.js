import React, { Component } from 'react';
import Moment from 'moment';
import groupBy from 'lodash.groupby';
import sortBy from 'lodash.sortby';
import { Line } from 'react-chartjs-2';

import service from './beer-maker-service';
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      chartsData: []
    }

    this.options = {
      high: 100,
      ticks: [1, 10, 20, 30],
      low: 0,
    };
  }

  componentDidMount(){
    this.getReadings();
  }

  async getReadings() {
    const {data} = await service.getDeviceReadings('21001b000d47353136383631');
    // group by sensor address
    const grouped = groupBy(data.sensors, b => b.address);

    Object.entries(grouped).forEach(([key, value]) => {
      // sort by date
      const sorted = sortBy(value, [o => o.createdAt]);
      // take last 50 readings
      //const sliced = sorted.slice(0, 50);

      let chartsData = [...this.state.chartsData];
      chartsData.push({
        labels: sorted.map(r => Moment(r.createdAt).format('MMM DD, hh:mm:ss')),
        datasets: [{
          label: 'sensorData',
          data: sorted.map(r => Number(r.reading).toFixed(2)),
        }]
      });
      // shape graph
      this.setState({chartsData});
    });
  }

  render() {
    const lineGraphs = this.state.chartsData.map(chart => {
      return <Line data={chart} options={this.options} />
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Beer Maker</h1>
        </header>
        {lineGraphs}
      </div>
    );
  }
}

export default App;
