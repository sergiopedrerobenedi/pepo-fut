import { ApiProperty } from '@nestjs/swagger';

export class Pagination<T> {
  @ApiProperty({ type: Object, isArray: true, description: 'Array of entities' })
  items: T[];
  @ApiProperty({ type: Number, description: 'Total number of existing entities in the database' })
  count: number;

  constructor(items, count) {
    this.items = items;
    this.count = count;
  }
}
