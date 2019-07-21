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
    if (!this.state.isLoading && this.props.route) {
      window.showRoute(this.props.route);
    }
    return (
      <div>
        <div style={{ width: '640px', height: '480px' }} id="mapContainer"></div>
        <div id="panel"></div>
        {this.state.isLoading ?
          "Loading..."
          :
          <div>
          </div>
        }

      </div>
    )

  }
}


export default Mappy;