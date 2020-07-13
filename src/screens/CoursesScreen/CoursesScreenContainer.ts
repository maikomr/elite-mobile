import { connect } from "react-redux";
import CoursesScreen from "./CoursesScreen";
import { fetchAllAsync } from "../../state/categories/categories.actions";

const mapStateToProps = (state: any) => ({
  ...state.categories,
});

const mapDispatchToProps = {
  fetchAllAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesScreen);
