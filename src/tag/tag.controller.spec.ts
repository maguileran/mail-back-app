import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { PrismaModule } from '../prisma/prisma.module';
import { Tag } from '@prisma/client';

describe('TagController', () => {
  let controller: TagController;
  const mockService = {
    findAll: jest.fn(() => Promise.resolve([])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [TagController],
      providers: [TagService],
    })
      .overrideProvider(TagService)
      .useValue(mockService)
      .compile();

    controller = module.get<TagController>(TagController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return an array of tags', async () => {
    const findAllMockResult: Tag[] = [{ id: 1, name: 'spam' }];
    (mockService.findAll as jest.Mock).mockImplementation(() =>
      Promise.resolve(findAllMockResult),
    );
    expect(await controller.findAll()).toBe(findAllMockResult);
  });
});
