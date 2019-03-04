import React, { Component } from 'react';

function Field(props) {
  return (
    <div>
        <h4 class="uk-card-title">{props.title}:</h4>
        <p>{props.content}</p>
    </div>
  )
}

class Review extends Component {

  componentDidMount() {
      this.calculateFields();
  }

  calculateFields() {

  }

  render() {
    let completedFields = [];
    let entries = Object.entries(this.props.data);
    for(const [name, val] of entries){
        completedFields.push(<Field title={name} content={val}/>);
    }
    return(
      <div>
          {completedFields}
      </div>
    );
  }
}

export default Review
