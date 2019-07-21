import React from 'react';
import CanvasJSReact from './canvasjs.react';
// import GoogleMapLoader from "react-google-maps-loader"
// import GooglePlacesSuggest from "react-google-places-suggest"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const data = [
  {label: "1:00", y: 45},
  {label: "1:30", y: 47},
  {label: "2:00", y: 40},
  {label: "2:30", y: 38},
  {label: "3:00", y: 40},
  {label: "3:30", y: 43},
  {label: "4:00", y: 45},
  {label: "4:30", y: 47},
  {label: "5:00", y: 50},
  {label: "5:30", y: 55},
  {label: "6:00", y: 60},
  {label: "6:30", y: 57},
  {label: "7:00", y: 55},
  {label: "7:30", y: 54},
  {label: "8:00", y: 45},
  {label: "8:30", y: 42},
  {label: "9:00", y: 40},
];

class App extends React.Component {
  render() {
    const options = {
      title: {
        text: ''
      },
      colorSet: 'blue',
      data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: data
      }
      ],
      dataPointWidth: 70,
    }

    return (
      <div>
      <CanvasJSChart options = {options}
        onRef={ref => this.chart = ref}
      />
      </div>
    )
  }
}

export default App;
