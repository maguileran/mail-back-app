import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { PrismaService } from '../prisma/prisma.service';
import { Mail } from '@prisma/client';

jest.mock('@prisma/client', () => ({
  ...jest.requireActual('@prisma/client'),
}));

describe('MailService', () => {
  let service: MailService;
  const mockService = {
    mail: {
      findMany: jest.fn(() => Promise.resolve([])),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockService)
      .compile();

    service = module.get<MailService>(MailService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return a list of mails', async () => {
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
    (mockService.mail.findMany as jest.Mock).mockImplementation(() =>
      Promise.resolve(findAllMockResult),
    );
    expect(await service.findAll()).toStrictEqual(findAllMockResult);
  });
});
