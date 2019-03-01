import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './SearchForm.css';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    library.add(faSearch);
  }

  render() {
    return (
      <form className="SearchForm_root" actions="/" autoComplete="off">
        <input
          className="SearchForm_input"
          type="text"
          name="q"
          placeholder="検索"
        />
        <button className="SearchForm_submit">
          <FontAwesomeIcon
            className="SearchForm_icon"
            icon="search"
          />
        </button>
      </form>
    );
  }
}