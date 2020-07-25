import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import admissionPeriod from "./state/admissionPeriod/admissionPeriod.reducer";
import admissionType from "./state/admissionType/admissionType.reducer";
import career from "./state/career/career.reducer";
import course from "./state/course/course.reducer";
import faculty from "./state/faculty/faculty.reducer";
import subject from "./state/subject/subject.reducer";

const rootReducer = combineReducers({
  admissionPeriod,
  admissionType,
  career,
  course,
  faculty,
  subject,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
