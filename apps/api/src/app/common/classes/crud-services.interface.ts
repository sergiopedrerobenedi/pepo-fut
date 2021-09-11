import { Repository } from 'typeorm';
import { Pagination } from './pagination.class';

export interface ICrudServices<E, D, C, U> {
  getAll(queryParams): Promise<Pagination<D>>;
  getById(id: string): Promise<D>;
  create(createDto: C): Promise<void>;
  updateById(id, updateDto: U, repository?: Repository<E>): Promise<void>;
  patchById(id, createDto: C): Promise<void>;
  deleteById(id): Promise<void>;
  fromEntityToDto(entity: E): D;
}
