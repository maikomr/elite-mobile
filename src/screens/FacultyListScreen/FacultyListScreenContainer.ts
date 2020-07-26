import { connect } from "react-redux";
import FacultyListScreen from "./FacultyListScreen";
import { fetchAllAsync } from "../../state/faculty/faculty.actions";

const mapStateToProps = (state: any) => ({
  ...state.faculty,
});

const mapDispatchToProps = {
  fetchAllAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(FacultyListScreen);
