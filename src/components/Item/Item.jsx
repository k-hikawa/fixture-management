import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Item.css';

export default class Item extends Component {
  constructor(props) {
    super(props);
    library.add(faBan);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    const numOfStock = 3;
    const numOfRental = this.getRandomInt(4);
    const isFullRentaled = (numOfRental === numOfStock) ? true : false;

    return (
      <div className="Item_root">
        <Link to={'/rental/aaa'} onClick={() => this.props.selectItem(this.props.item)}>
          <div className="Item_header">
            <img className="Item_thumbnail" src={this.props.item.img} alt="備品画像" />
            <span className="Item_label">{numOfRental} / {numOfStock} 貸出中</span>
          </div>
          <div className="Item_body">
            <h5>{this.props.item.title}</h5>
          </div>
        </Link>
        {isFullRentaled && (
          <div className="Item_FullRentaled">
            <FontAwesomeIcon
              className="Item_FullRentaled_icon"
              icon="ban"
            />
          </div>
        )}
      </div>
    );
  }
}