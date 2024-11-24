import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { PrismaModule } from '../prisma/prisma.module';
import { Mail } from '@prisma/client';

describe('MailController', () => {
  let controller: MailController;
  const mockService = {
    findAll: jest.fn(() => Promise.resolve([])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [MailController],
      providers: [MailService],
    })
      .overrideProvider(MailService)
      .useValue(mockService)
      .compile();

    controller = module.get<MailController>(MailController);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return an array of mails', async () => {
    const findAllMockResult: Mail[] = [
      {
        body: '',
        createdAt: new Date(),
        from: '',
        id: 0,
        updatedAt: undefined,
        title: '',
        subject: '',
        isRead: false,
        to: '',
      },
    ];
    (mockService.findAll as jest.Mock).mockImplementation(() =>
      Promise.resolve(findAllMockResult),
    );
    expect(await controller.findAll()).toBe(findAllMockResult);
  });
});
