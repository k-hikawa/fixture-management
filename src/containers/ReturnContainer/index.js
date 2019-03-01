import { connect } from 'react-redux';

import { getRentalList, doReturn } from '../../modules/Return';
import ReturnContiner from './ReturnContainer';

function mapStateToProps(state) {
  return {
    returnStore: state.returnStore,
  };
}

export default connect(mapStateToProps, { getRentalList, doReturn })(ReturnContiner);
