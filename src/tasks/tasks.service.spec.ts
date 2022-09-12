import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task.-status.enum';
import { TasksRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'test',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the results', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TaskRepository.findOne and returns the result', async () => {
      const mockTask = {
        id: 'someId',
        title: 'some title',
        description: 'description',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('azerty', mockUser);
      expect(result).toEqual(mockTask);
    });
    it('calls TaskRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('azerty', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
