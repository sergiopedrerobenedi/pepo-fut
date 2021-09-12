import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initialiseTestTransactions } from 'typeorm-test-transactions';
import { BestFootEnum } from '../../players/enums/best-foot.enum';
import { PLAYER_POSITIONS } from '../../players/modules/players-positions/mocks/players-positions.mocks';
import { Team } from '../model/team.entity';
import { TeamsService } from '../teams.service';
import { GET_ALL_TEAMS_MOCK } from './mocks/teams.mocks';

initialiseTestTransactions();
describe('TeamsService', () => {
  let service: TeamsService;
  let repo: Repository<Team>;

  beforeEach(async () => {
    const getManyAndCount = jest
      .fn()
      .mockImplementation(() => Promise.resolve([GET_ALL_TEAMS_MOCK.items, GET_ALL_TEAMS_MOCK.count]));

    // const andWhereStadium = jest.fn(() => ({ getManyAndCount }));
    // const andWherePresident = jest.fn(() => ({ andWhere: andWhereStadium }));
    // const andWhereNationality = jest.fn(() => ({ andWhere: andWherePresident }));
    // const andWhereFoundationName = jest.fn(() => ({ andWhere: andWhereNationality }));
    const andWhereName = jest.fn(() => ({ andWhere: where }));

    const where = jest.fn(() => ({ getManyAndCount }));
    const leftJoindAndSelect1 = jest.fn(() => ({ where }));
    const leftJoindAndSelect2 = jest.fn(() => ({ leftJoinAndSelect: leftJoindAndSelect1 }));
    const skip = jest.fn(() => ({ leftJoinAndSelect: leftJoindAndSelect2 }));
    const take = jest.fn(() => ({ skip }));
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          // define all the methods that you use from the catRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            find: jest.fn().mockResolvedValue(GET_ALL_TEAMS_MOCK),
            findOne: jest.fn().mockResolvedValue(GET_ALL_TEAMS_MOCK.items[0]),
            create: jest.fn().mockReturnValue(GET_ALL_TEAMS_MOCK.items[0]),
            save: jest.fn().mockImplementation(() => Promise.resolve()),
            update: jest.fn().mockResolvedValue(true),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
            createQueryBuilder: jest.fn(() => ({ take })),
          },
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    repo = module.get<Repository<Team>>(getRepositoryToken(Team));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an array of teams', async () => {
      const teams = await service.getAll();
      expect(teams).toEqual(GET_ALL_TEAMS_MOCK);
    });
  });

  describe('getById', () => {
    it('should get a single Team', () => {
      const repoSpy = jest.spyOn(repo, 'findOne');
      expect(service.getById('fbefe545-286e-4fd8-9b16-ee49d04aadf5')).resolves.toEqual(GET_ALL_TEAMS_MOCK.items[0]);
      expect(repoSpy).toBeCalledWith({ where: { id: 'fbefe545-286e-4fd8-9b16-ee49d04aadf5' } });
    });
    it('should has an error when trying to recover single Team', () => {
      const repoSpy = jest.spyOn(repo, 'findOne').mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.getById('fbefe545-286e-4fd8-9b16-ee49d04aadf5')).rejects.toThrow();
      expect(repoSpy).toBeCalledWith({ where: { id: 'fbefe545-286e-4fd8-9b16-ee49d04aadf5' } });
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
  describe('create', () => {
    it('should successfully insert a team', () => {
      expect(
        service.create({
          name: 'Real Zaragoza',
          president: 'Christian Lapetra',
          nationality: 'Spain',
          stadium: 'La Romareda',
          logoPath: 'images/teams/realZaragoza.jpg',
          foundationDate: new Date('1932-06-12'),
          players: [
            {
              id: 'ae4750b3-ae08-4044-9a8b-c1a2602fdcd5',
              name: 'Sergio',
              surname: 'Nazario',
              birthday: new Date('1992-08-27'),
              injured: false,
              nationality: 'Brazil',
              heightCm: 179,
              weightKg: 80,
              bestFoot: BestFootEnum.AMBIDEXTROUS,
              positions: [PLAYER_POSITIONS[0], PLAYER_POSITIONS[1]],
            },
          ],
        }),
      ).resolves.toEqual(GET_ALL_TEAMS_MOCK[0]);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith({
        name: 'Real Zaragoza',
        president: 'Christian Lapetra',
        nationality: 'Spain',
        stadium: 'La Romareda',
        logoPath: 'images/teams/realZaragoza.jpg',
        foundationDate: new Date('1932-06-12'),
        players: [
          {
            id: 'ae4750b3-ae08-4044-9a8b-c1a2602fdcd5',
            name: 'Sergio',
            surname: 'Nazario',
            birthday: new Date('1992-08-27'),
            injured: false,
            nationality: 'Brazil',
            heightCm: 179,
            weightKg: 80,
            bestFoot: BestFootEnum.AMBIDEXTROUS,
            positions: [PLAYER_POSITIONS[0], PLAYER_POSITIONS[1]],
          },
        ],
      });
      expect(repo.save).toBeCalledTimes(1);
    });
    it('should throw an error when trying to insert a team by id', () => {
      const repoSpy = jest.spyOn(repo, 'save').mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(
        service.create({
          name: 'Real Zaragoza',
          president: 'Christian Lapetra',
          nationality: 'Spain',
          stadium: 'La Romareda',
          logoPath: 'images/teams/realZaragoza.jpg',
          foundationDate: new Date('1932-06-12'),
          players: [
            {
              id: 'ae4750b3-ae08-4044-9a8b-c1a2602fdcd5',
              name: 'Sergio',
              surname: 'Nazario',
              birthday: new Date('1992-08-27'),
              injured: false,
              nationality: 'Brazil',
              heightCm: 179,
              weightKg: 80,
              bestFoot: BestFootEnum.AMBIDEXTROUS,
              positions: [PLAYER_POSITIONS[0], PLAYER_POSITIONS[1]],
            },
          ],
        }),
      ).rejects.toThrow();
    });
  });

  describe('updateById', () => {
    it('should call the update by id method if exists', async () => {
      const repoSpy = jest.spyOn(repo, 'save');
      expect(
        service.updateById('fbefe545-286e-4fd8-9b16-ee49d04aadf5', {
          name: 'Real Zaragoza',
          logoPath: '/images/realZaragoza.jpg',
          nationality: 'France',
          players: [],
          president: 'Sergio Pedrero',
          stadium: 'La Romareda',
        }),
      ).resolves.not.toThrow();
    });
    it('should call the update by id method if not exists', async () => {
      expect(
        service.updateById('fbefe545-286e-4fd8-9b16-ee49d04aadf5', {
          name: 'Real Zaragoza',
          logoPath: '/images/realZaragoza.jpg',
          nationality: 'France',
          players: [],
          president: 'Sergio Pedrero',
          stadium: 'La Romareda',
        }),
      ).resolves.not.toThrow();
    });
    it('should has an error when trying to update team', () => {
      const repoSpy = jest.spyOn(repo, 'save').mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(
        service.updateById('asdasdsa', {
          name: 'Real Zaragoza',
          logoPath: '/images/realZaragoza.jpg',
          nationality: 'France',
          players: [],
          president: 'Sergio Pedrero',
          stadium: 'La Romareda',
        }),
      ).rejects.toThrow();
    });
  });

  describe('patchById', () => {
    it('should throw an error when trying to patch a team by id', () => {
      const repoSpy = jest.spyOn(repo, 'update').mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(
        service.patchById('bad uuid', {
          name: 'Real Zaragoza',
          logoPath: '/images/realZaragoza.jpg',
          nationality: 'France',
          players: [],
          president: 'Sergio Pedrero',
          stadium: 'La Romareda',
          foundationDate: new Date(),
        }),
      ).rejects.toThrow();
      expect(repoSpy).toBeCalledWith(
        { id: 'bad uuid' },
        {
          name: 'Real Zaragoza',
          logoPath: '/images/realZaragoza.jpg',
          nationality: 'France',
          players: [],
          president: 'Sergio Pedrero',
          stadium: 'La Romareda',
          foundationDate: new Date(),
        },
      );
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
  describe('deleteById', () => {
    it('should return delete a team by id', () => {
      const repoSpy = jest.spyOn(repo, 'delete');
      expect(service.deleteById('fbefe545-286e-4fd8-9b16-ee49d04aadf5')).resolves.not.toThrow();
      expect(repoSpy).toBeCalledWith('fbefe545-286e-4fd8-9b16-ee49d04aadf5');
      expect(repoSpy).toBeCalledTimes(1);
    });
    it('should throw an error when trying to delete a team by id', () => {
      const repoSpy = jest.spyOn(repo, 'delete').mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.deleteById('bad uuid')).rejects.toThrow();
      expect(repoSpy).toBeCalledWith('bad uuid');
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
});
