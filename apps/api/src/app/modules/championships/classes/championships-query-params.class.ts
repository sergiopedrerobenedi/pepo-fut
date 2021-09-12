export class ChampionshipQueryParams {
  name?: string;
  description?: string;
  country?: string;
  season?: string;
  limit?: number;
  offset?: number;

  constructor(data?: ChampionshipQueryParams) {
    if (data) {
      this.name = data.name;
      this.description = data.description;
      this.country = data.country;
      this.season = data.season;
      this.limit = data.limit;
      this.offset = data.offset;
    }
  }
}
