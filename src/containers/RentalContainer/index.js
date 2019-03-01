import { connect } from 'react-redux';

import { selectRentalItem, postRentalData } from '../../modules/Rental';
import { getUserList } from '../../modules/User';
import RentalContainer from './RentalContainer';

function mapStateToProps(state) {
  return {
    rentalItem: state.rentalItem,
    userList: state.userList,
  };
}

export default connect(mapStateToProps, { selectRentalItem, getUserList, postRentalData })(RentalContainer);
