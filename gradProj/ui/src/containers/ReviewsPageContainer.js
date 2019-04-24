import ReviewsPage from "../components/ReviewsPage";
import { connect } from "react-redux";
import { loadReviews, loadMoreReviews } from "../actions/ReviewsActions";

const mapStateToProps = state => ({
  reviews: state.reviews ? state.reviews.docs : undefined,
  total: state.reviews ? state.reviews.total : undefined,
  page: state.reviews ? state.reviews.page : undefined,
  limit: state.reviews ? state.reviews.limit : undefined,
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { loadReviews, loadMoreReviews }
)(ReviewsPage);
