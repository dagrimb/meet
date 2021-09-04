import React, { Component } from 'react';

class CitySearch extends Component {

  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
  }
  
  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => { // filter the state of "suggestions" and use the result as the state's
      // value
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    console.log("CHANGE", this.props.locations, suggestions)
    this.setState({ 
      query: value,
      suggestions,
    });
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false, // set showSuggestions state to false when item is clicked
    });

   this.props.updateEvents(suggestion);
  }

  render() {
    return (
      <div className="CitySearch">
        <div className="heading">
          <h1>Meet App</h1>
          <p>Choose your nearest city</p>
        </div>
        <div className="search">
        <input
          type="text"
          className="city"
          placeholder="Search for a city"
          value={this.state.query}
          onChange={this.handleInputChanged} // pass input change function created above--this will see
          // whether text changes have been made on input
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
        
        <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}> {/* if showSuggestions is true, the list
        will be visible; if not, the list will not be visible */}
          {this.state.suggestions.map((suggestion) => (
            <li 
              className="suggestedCities"
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >{suggestion}</li>
          ))}
          <li 
            className="selectAll"
            onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
          </ul>
          
          </div>
      </div>
    );
  }
}

export default CitySearch;