import React, { Component } from 'react';

import './Tag.css';

export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  render() {
    const classes = this.state.isSelected ? 'Tag_root select' : 'Tag_root';
    return (
        <div className={classes} onClick={this.changeTagState.bind(this)}>
          <span className="Tag_label">{this.props.tag}</span>
        </div>
    );
  }

  changeTagState() {
    this.setState({ isSelected: !this.state.isSelected });
  }
}
