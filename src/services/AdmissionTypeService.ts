import BaseService from "./BaseService";
import { ELITE_REST_API_URL } from "../constants/general";

class AdmissionTypeService extends BaseService {
  constructor() {
    super();
  }

  public async getAll() {
    return super.getAll(`${ELITE_REST_API_URL}/admission-types`);
  }
}

export default new AdmissionTypeService();
