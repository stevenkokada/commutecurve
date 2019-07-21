import React from 'react';
import CanvasJSReact from './canvasjs.react';
import GoogleSuggest from './PlaceAutocomplete'
import Mappy from './Mappy/Mappy.js';
import axios from 'axios';
import Moment from 'moment';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.desiredTime = React.createRef();
    this.tolerance = React.createRef();
    this.state = {
      startLocation: undefined,
      endLocation: undefined,
      data: undefined,
      timezoneOffset: new Date().getTimezoneOffset() / 60,
      tolerance: undefined,
      errorMessage: ''
    }
  }

  componentDidMount() {
  }

  setStartLocation = (startLocation) => {
    this.setState(() => {
      return {
        startLocation
      }
    })
  }

  setEndLocation = (endLocation) => {
    this.setState(() => {
      return {
        endLocation
      }
    })
  }

  setDesiredTime = (desiredTime) => {
    this.setState(() => {
      return { desiredTime }
    })
  }

  submitData = (e) => {
    e.preventDefault();

    if(this.state.startLocation && this.state.endLocation && this.desiredTime && this.tolerance) {
      axios.get('http://ec2-18-217-197-235.us-east-2.compute.amazonaws.com:8000/histogram', {
        params: {
          startLocation: this.state.startLocation.formatted_address,
          endLocation: this.state.endLocation.formatted_address,
          timeOffset: this.state.timezoneOffset,
          desiredTime: this.desiredTime.current.value,
          tolerance: this.tolerance.current.value,
        }
      })
      .then(response => {
        const rawDataArray = response.data.query_data;
        let data = [];

        rawDataArray.forEach((datum) => {
          var timeString = Moment(datum.label).format('LT');
          var value = datum.y;

          data.push({label: timeString, y: value});
        });

        this.setState(() => {
          return {
            data,
          };
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
    else {
      this.setState(() => { 
        return {error: 'Please fill out all four fields!' }
      });
    }

  }

  render() {
    const options = {
      title: {
        text: 'Commute Time'
      },
      colorSet: 'blue',
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: "line",
          dataPoints: this.state.data
        }
      ],
      dataPointWidth: 30,
    }

    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.submitData}>
          Start Location: <GoogleSuggest
            passUpLocation={this.setStartLocation}
          />
          End Location: <GoogleSuggest
            passUpLocation={this.setEndLocation}
          />
          Desired Departure Time: <input type="time" ref={this.desiredTime}></input>
          Tolerance (Minutes): <input type="number" min="0" ref={this.tolerance}></input>
          <button>Submit</button>
        </form>

        <Mappy />
        {
          this.state.data && 
          <CanvasJSChart options={options}
          onRef={ref => this.chart = ref}
        />
        }
      </div>
    )
  }
}

export default App;
