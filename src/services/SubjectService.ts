import BaseService from "./BaseService";
import { ELITE_REST_API_URL } from "../constants/general";

class SubjectService extends BaseService {
  constructor() {
    super();
  }

  public async getAll() {
    return super.getAll(`${ELITE_REST_API_URL}/subjects`);
  }
}

export default new SubjectService();
