import { Test, TestingModule } from '@nestjs/testing';
import { QuicksService } from './quicks.service';

describe('QuicksService', () => {
  let service: QuicksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuicksService],
    }).compile();

    service = module.get<QuicksService>(QuicksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
