import React from "react"
import GoogleMapLoader from "react-google-maps-loader"
import GooglePlacesSuggest from "react-google-places-suggest"
import MY_API_KEY from "./api_key_secret"

export default class  extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            search: "",
            value: "",
        }
    }

    componentDidMount() {
        this.setState({value: this.props.initialValue});
        console.log(this.props.initialValue);
        console.log(this.state);
    }
 
    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    }
 
    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        this.setState({search: "", value: geocodedPrediction.formatted_address})
        this.props.passUpLocation(geocodedPrediction);
    }
    
    handleNoResult = () => {
        console.log('No results for ', this.state.search)
    }
 
    handleStatusUpdate = (status) => {
        // console.log(status)
    }

 
    render() {
        const {search, value} = this.state
        return (
            <GoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <GooglePlacesSuggest
                            googleMaps={googleMaps}
                            autocompletionRequest={{
                                input: search,
                                // Optional options
                                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                            }}
                            // Optional props
                            onNoResult={this.handleNoResult}
                            onSelectSuggest={this.handleSelectSuggest}
                            onStatusUpdate={this.handleStatusUpdate}
                            textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                            customRender={prediction => (
                                <div className="customWrapper">
                                    {prediction
                                        ? prediction.description
                                        : "My custom no results text"}
                                </div>
                            )}
                        >
                            <input
                                type="text"
                                value={value}
                                placeholder="Search a location"
                                onChange={this.handleInputChange}
                            />
                        </GooglePlacesSuggest>
                    )
                }
            />
        )
    }
}