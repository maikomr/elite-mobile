import BaseService from "./BaseService";
import { ELITE_REST_API_URL } from "../constants/general";

class CareerService extends BaseService {
  constructor() {
    super();
  }

  public async getAll() {
    return super.getAll(`${ELITE_REST_API_URL}/careers`);
  }
}

export default new CareerService();
