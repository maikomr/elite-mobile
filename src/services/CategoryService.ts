import BaseService from "./BaseService";
import { ELITE_REST_API_URL } from "../constants/general";

class CategoryService extends BaseService {
  constructor() {
    super();
  }

  public async getAll() {
    return super.getAll(`${ELITE_REST_API_URL}/categories`);
  }
}

export default new CategoryService();
