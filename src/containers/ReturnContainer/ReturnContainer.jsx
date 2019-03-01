import React, { Component } from 'react';

import RentalList from '../../components/RentalList';
import './ReturnContainer.css';

export default class ReturnContainer extends Component {
  componentDidMount() {
    this.props.getRentalList();
  }

  render() {
    const returnStore = this.props.returnStore;
    return (
      <div className="ReturnContainer">
        <RentalList
          rentalList={returnStore.rentalList}
          doReturn={(fixtureName, rentalId, returnRow) => this.doReturn(fixtureName, rentalId, returnRow)}
        />
      </div>
    );
  }

  doReturn(fixtureName, rentalId, returnRow) {
    if (window.confirm('「' + fixtureName + '」を返却します')) {
      this.props.doReturn(rentalId, returnRow);
    }
  }
}