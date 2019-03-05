import React, { Component } from 'react';

class RenderReviews extends Component {
  render() {
    return (
      <div className="reviewDivs">
        {this.props.reviews.map(review => 
          <div className="reviewContent" key={review.id}>
            <img src={review.user.image_url} alt='review' className='iconImage'/>
            <span>{" "}<strong>Name: </strong>{review.user.name}{" | "}<strong>Rating: </strong>{review.rating}</span><br/>
            <span><strong>Uploaded: </strong>{review.time_created}</span><br/>
            <span><strong>Content: </strong>{review.text}</span>
          </div>
          )}
      </div>
    )
  }
}

export default RenderReviews;