import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { selectRentalItem } from '../../modules/Rental';
import { getTagList } from '../../modules/Tag';
import TopContainer from './TopContainer';

function mapStateToProps(state) {
  return {
    rentalItem: state.rentalItem,
    tagList: state.tagList,
  };
}

export default withRouter(connect(mapStateToProps, { selectRentalItem, getTagList })(TopContainer));