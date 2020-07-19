import { connect } from "react-redux";
import CategoryListScreen from "./CategoryListScreen";

const mapStateToProps = (state: any) => ({
  ...state.categories,
});

export default connect(mapStateToProps)(CategoryListScreen);
