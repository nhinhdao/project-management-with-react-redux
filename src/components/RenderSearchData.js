import React, { Component } from 'react';

class RenderSearchData extends Component {
  handleClick = id => {
    let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`
    this.props.toggleRender();
    this.props.handleSearch(url);
  }

  render() {
    const { place } = this.props;
    return (
      <div onClick={() => this.handleClick(place.id)} className='RenderSearchData'>
        <div className="scrollit">
          {place.isAddedToList ? <span> &#9733; </span> : <span> &#9734; </span>}
          <small>{place.category}</small>
          <h6>{place.name}</h6>
        </div>
      </div>
    )
  }
}

export default RenderSearchData;