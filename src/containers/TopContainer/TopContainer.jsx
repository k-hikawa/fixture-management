import React, { Component } from 'react';

import ItemList from '../../components/ItemList';
import TagList from '../../components/TagList';
import './TopContainer.css';

export default class TopContainer extends Component {
  componentDidMount() {
    this.props.getTagList();
  }

  render() {
    return (
      <div className="TopContainer">
        <TagList />
        <ItemList selectItem={(item) => this.selectItem(item)} />
      </div>
    );
  }

  selectItem(item) {
    // storeにレンタルする備品の情報ぶちこむ
    this.props.selectRentalItem(item);
  }
}
