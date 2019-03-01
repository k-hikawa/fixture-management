import React, { Component } from 'react';

import Tag from '../Tag';
import './TagList.css';

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        'php', 'javascript', 'perl', 'c#', 'python', 'ruby',
        'json', 'xml', 'react', 'redux', 'mobx', 'jquery'
      ],
    };
  }

  render() {
    return (
      <div className="TagList_root">
        <div className="TagList_header">
          <span>タグで絞り込み</span>
        </div>
        <div className="TagList_body">
          {this.state.tags.map((tag, index) => {
            return (
              <Tag key={index} tag={tag} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default TagList;