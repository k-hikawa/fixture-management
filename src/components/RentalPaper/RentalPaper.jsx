import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './RentalPaper.css';

export default class RentalPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectUserId: '',
    }
  }

  render() {
    return (
      <div className="RentalPaper_root">
        <h2>借りる人と返却日を選択してください　</h2>
        <div className="RentalPaper_item">
          <div className="RentalPaper_itemImage">
            <img src={this.props.rentalItem.fixtureImage} alt="備品画像" />
          </div>
          <div className="RentalPaper_itemTitle">
            <span>{this.props.rentalItem.fixtureName}</span>
          </div>
        </div>
        <div className="RentalPaper_form">
          <ul>
            <li>
              <span>借りる人</span>
              {this.renderUserList()}
            </li>
            <li>
              <span>返却日　</span>
              <label><input type="date"/></label>
            </li>
          </ul>
          <Link to="/">
            <button
              className="RentalPaper_submitBtn"
              onClick={() => this.postRentalData(this.state.selectUserId, this.props.rentalItem.fixtureId)}
            >借りる</button>
          </Link>
        </div>
      </div>
    );
  }

  renderUserList() {
    return (
      <select id="studentName" onChange={this.handleChange.bind(this)} value={this.state.selectUserId}>
      {this.props.userList.list.map(function(user, index) {
        const userName = user.userName;
        const fullName = userName.lastName + userName.firstName;
        return (
          <option key={index} value={user.userId}>{fullName}</option>
        );
      })}
      </select>
    );
  }

  handleChange(e){
    this.setState({
      selectUserId: e.target.value
    });
  }

  postRentalData(userId, fixtureId) {
    this.props.postRentalData(userId, fixtureId, this.props.rentalItem.fixtureName);
  }
}
