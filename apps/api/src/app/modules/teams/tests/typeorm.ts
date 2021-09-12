import { mock } from 'jest-mock-extended';
import { Repository, SelectQueryBuilder } from 'typeorm';
export const repositoryMock = mock<Repository<any>>();

export const qbuilderMock = mock<SelectQueryBuilder<any>>();

qbuilderMock.where.mockReturnThis();
qbuilderMock.andWhere.mockReturnThis();
qbuilderMock.select.mockReturnThis();
qbuilderMock.take.mockReturnThis();
qbuilderMock.skip.mockReturnThis();
qbuilderMock.leftJoinAndSelect.mockReturnThis();
qbuilderMock.getManyAndCount.mockName('get-many-and-count');

repositoryMock.createQueryBuilder.mockReturnValue(qbuilderMock);

export const getRepository = () => {
  return repositoryMock;
};
