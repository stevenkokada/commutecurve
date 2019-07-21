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

    this.earliestTime = React.createRef();
    this.latestTime = React.createRef();
    this.state = {
      startLocation: undefined,
      endLocation: undefined,
      data: undefined,
      timezoneOffset: new Date().getTimezoneOffset() / 60,
      tolerance: undefined,
      errorMessage: '',
      optimalTime: undefined,
      optimalTravelLength: undefined,
      waypoint0: null,
      waypoint1: null,
      route: null,
      rawData: null,
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

  timeToDateObj = (hoursandMinutes) => {
    const timeSplit = hoursandMinutes.split(':');
    const hours = parseInt(timeSplit[0]) % 24;
    const minutes = parseInt(timeSplit[1]);

    const currentTime = new Date();
    return new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hours, minutes, 0, 0);
  }

  calculateOptimalTime = (e) => {
    e.preventDefault();

    const earliestDate = this.timeToDateObj(this.earliestTime.current.value);
    const latestDate = this.timeToDateObj(this.latestTime.current.value);
  
    const earliestMoment = Moment(earliestDate).add(5, 'days');
    let latestMoment = Moment(latestDate).add(5, 'days');

    // Account for things that go past midnight

    if (latestMoment.isBefore(earliestMoment)) {
      latestMoment.add(1, 'day');
    }

    const validRoutes = this.state.rawData.filter((datum) => {
      const tempMoment = Moment(new Date(datum.label));
      return tempMoment.isBetween(earliestMoment, latestMoment, 'minute', '[]');
    });

    let bestEntry = validRoutes[0];
    validRoutes.forEach((elt) => {
      if (elt.y < bestEntry.y){
        bestEntry = elt;
      }
    });

    const optimalTime = Moment(new Date(bestEntry.label)).format('LT');

    this.setState(() => {
      return {
        optimalTime,
        optimalTravelLength: bestEntry.y,
      }
    });
  }

  submitData = (e) => {
    e.preventDefault();
    if(this.state.startLocation && this.state.endLocation) {
      axios.get('http://ec2-18-217-197-235.us-east-2.compute.amazonaws.com:8000/histogram', {
        params: {
          startLocation: this.state.startLocation.formatted_address,
          endLocation: this.state.endLocation.formatted_address,
          timeOffset: this.state.timezoneOffset,
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
            error: '',
            data,
            rawData: rawDataArray,
          };
        });

        this.setState({waypoint0: response.data.waypoint0, waypoint1: response.data.waypoint1, route: response.data.query_data[0]["route"][0]});
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
        <form>
          Start Location: <GoogleSuggest
            passUpLocation={this.setStartLocation}
          />
          End Location: <GoogleSuggest
            passUpLocation={this.setEndLocation}
          />
          <button onClick={this.submitData}>Submit</button>
        </form>
        <form>
          Earliest Desired Departure Time: <input type="time" ref={this.earliestTime}></input>
          Latest Desired Departure Time: <input type="time" min="0" ref={this.latestTime}></input>
          <button onClick={this.calculateOptimalTime}>Submit</button>
        </form>
        { this.state.optimalTime && <div>
          <p>{`If you want to leave between ${this.earliestTime.current.value} and ${this.latestTime.current.value}, you should head out at ${this.state.optimalTime} for a travel length of ${this.state.optimalTravelLength} minutes.`}</p>
        </div>}

        <Mappy route={this.state.route}/>
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
