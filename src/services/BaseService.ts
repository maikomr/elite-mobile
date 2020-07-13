export default class BaseService {
  protected async getAll(url: string) {
    const res = await fetch(url);
    const data = await res.json();
    return data.map((d: any) => ({ ...d.acf, id: d.id }));
  }
}
