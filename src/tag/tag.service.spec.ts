import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { PrismaService } from '../prisma/prisma.service';
import { Tag } from '@prisma/client';

jest.mock('@prisma/client', () => ({
  ...jest.requireActual('@prisma/client'),
}));

describe('TagService', () => {
  let service: TagService;
  const mockService = {
    tag: {
      findMany: jest.fn(() => Promise.resolve([])),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockService)
      .compile();

    service = module.get<TagService>(TagService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return a list of tags', async () => {
    const findAllMockResult: Tag[] = [
      {
        id: 2,
        name: 'Deleted',
      },
    ];
    (mockService.tag.findMany as jest.Mock).mockImplementation(() =>
      Promise.resolve(findAllMockResult),
    );
    expect(await service.findAll()).toStrictEqual(findAllMockResult);
  });
});
