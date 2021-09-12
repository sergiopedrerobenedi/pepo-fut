import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTeamDto } from '../dto/create-team.dto';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { TeamsController } from '../teams.controller';
import { TeamsService } from '../teams.service';
import { GET_ALL_TEAMS_MOCK } from './mocks/teams.mocks';
describe('Teams Controller', () => {
  let controller: TeamsController;
  let service: TeamsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        {
          provide: TeamsService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(GET_ALL_TEAMS_MOCK),
            getById: jest
              .fn()
              .mockImplementation((id: string) => Promise.resolve({ ...GET_ALL_TEAMS_MOCK.items[0], id })),
            create: jest.fn().mockImplementation((createTeamDto: CreateTeamDto) => Promise.resolve()),
            updateById: jest.fn().mockImplementation((id) => Promise.resolve()),
            deleteById: jest.fn().mockImplementation((id: string) => Promise.resolve()),
            patchById: jest.fn().mockImplementation((id: string, newTeamData: CreateTeamDto) => Promise.resolve()),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
    service = module.get<TeamsService>(TeamsService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTeams', () => {
    it('should get an array of teams', async () => {
      await expect(controller.getAll()).resolves.toEqual(GET_ALL_TEAMS_MOCK);
    });
  });
  describe('getById', () => {
    it('should get a single team', async () => {
      await expect(controller.getById('fbefe545-286e-4fd8-9b16-ee49d04aadf5')).resolves.toEqual(
        GET_ALL_TEAMS_MOCK.items[0],
      );
    });
    it('should not exists team requested', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(null);
      await expect(controller.getById('not uuid')).rejects.toThrow(new NotFoundException());
    });
    it('should error occurs when team requested', async () => {
      jest.spyOn(service, 'getById').mockRejectedValueOnce('Internal Server Error');
      await expect(controller.getById('not uuid')).rejects.toThrow(new InternalServerErrorException(''));
    });
  });

  describe('insert', () => {
    const newTeamDto: CreateTeamDto = {
      name: 'Real Madrid',
      foundationDate: new Date('2021-09-12T13:51:17.506Z'),
      logoPath: '/logos/images.jpg',
      nationality: 'Spain',
      players: [],
      president: 'Florentino Perez',
      stadium: 'Santiago Bernabeu',
    };
    it('should create a new team', async () => {
      await expect(controller.create(newTeamDto)).resolves.not.toThrow();
    });
    it('should error occurs when trying to create team', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce('Internal Server Error');
      await expect(controller.create(newTeamDto)).rejects.toThrow(new InternalServerErrorException(''));
    });
  });
  describe('updateById', () => {
    const updateTeamDto: UpdateTeamDto = {
      name: 'Real Madrid',
      logoPath: '/logos/images.jpg',
      nationality: 'Spain',
      players: [],
      president: 'Florentino Perez',
      stadium: 'Santiago Bernabeu',
    };
    it('should update/create an existing team', async () => {
      await expect(controller.updateById('fbefe545-286e-4fd8-9b16-ee49d04aadf5', updateTeamDto)).resolves.not.toThrow();
    });
    it('should error occurs when trying to update/create team', async () => {
      jest.spyOn(service, 'updateById').mockRejectedValueOnce('Internal Server Error');
      await expect(controller.updateById('fbefe545-286e-4fd8-9b16-ee49d04aadf5', updateTeamDto)).rejects.toThrow(
        new InternalServerErrorException(''),
      );
    });
  });

  describe('patchById', () => {
    const createTeam: CreateTeamDto = {
      name: 'Real Madrid',
      logoPath: '/logos/images.jpg',
      foundationDate: new Date(),
      nationality: 'Spain',
      players: [],
      president: 'Florentino Perez',
      stadium: 'Santiago Bernabeu',
    };
    it('should patch an existing team', async () => {
      await expect(controller.patchById('fbefe545-286e-4fd8-9b16-ee49d04aadf5', createTeam)).resolves.not.toThrow();
    });

    it('should not exists team requested', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(null);
      await expect(controller.patchById('fbefe545-286e-4fd8-9b16-ee49d04aadf5', createTeam)).rejects.toThrow(
        new NotFoundException(),
      );
    });

    it('should error occurs when trying to patch by id team', async () => {
      jest.spyOn(service, 'patchById').mockRejectedValueOnce('Internal Server Error');
      await expect(controller.patchById('fbefe545-286e-4fd8-9b16-ee49d04aadf5', createTeam)).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });
  });

  describe('deleteById', () => {
    it('should delete a team by id', async () => {
      await expect(controller.deleteById('a uuid that exists')).resolves.not.toThrow();
    });
    it('should not exists team requested', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(null);
      await expect(controller.deleteById('fbefe545-286e-4fd8-9b16-ee49d04aadf5')).rejects.toThrow(
        new NotFoundException(),
      );
    });

    it('should error occurs when trying to delete by id team', async () => {
      jest.spyOn(service, 'deleteById').mockRejectedValueOnce('Internal Server Error');
      await expect(controller.deleteById('fbefe545-286e-4fd8-9b16-ee49d04aadf5')).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });
  });
});
