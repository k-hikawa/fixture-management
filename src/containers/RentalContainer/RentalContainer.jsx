import React, { Component } from 'react';

import RentalPaper from '../../components/RentalPaper';
import './RentalContainer.css';

export default class RentalContainer extends Component {
  constructor(props) {
    super(props);
    props.getUserList();
  }

  render() {
    return (
      <div className="RentalContainer">
        <RentalPaper
          rentalItem={this.props.rentalItem}
          userList={this.props.userList}
          postRentalData={(userId, fixtureId, fixtureName) => this.postRentalData(userId, fixtureId, fixtureName)}
        />
      </div>
    );
  }

  postRentalData(userId, fixtureId, fixtureName) {
    if (window.confirm(fixtureName + 'を借ります.\n借りる人に間違いはありませんね？')) {
      this.props.postRentalData(userId, fixtureId);
    }
  }
}
