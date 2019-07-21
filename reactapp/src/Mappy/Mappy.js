import React from 'react'

import './mappy.css';

class Mappy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    }
  }

  attachScript(filepath) {
    const script = document.createElement("script");

    script.src = filepath;
    document.body.appendChild(script);

    script.onload = (function () {
      this.setState({ isLoading: false })
    }).bind(this)
  }

  componentDidMount() {
    this.attachScript('./helper.js');
  }

  render() {
    return (
      <div>
        <div style={{ width: '640px', height: '480px' }} id="mapContainer"></div>
        {this.state.isLoading ?
          "Loading..."
          :
          <div>
            <button onClick={window.addMarkersToMap(window.map)}>
            </button>
          </div>
        }

      </div>
    )

  }
}


export default Mappy;