export class TeamsQueryParams {
  name?: string;
  president?: string;
  nationality?: string;
  stadium?: string;
  foundationDate?: Date;
  championshipName?: string;
  limit?: number;
  offset?: number;

  constructor(data?: TeamsQueryParams) {
    if (data) {
      this.name = data.name;
      this.president = data.president;
      this.nationality = data.nationality;
      this.stadium = data.stadium;
      this.foundationDate = data.foundationDate;
      this.championshipName = data.championshipName;
      this.limit = data.limit;
      this.offset = data.offset;
    }
  }
}
