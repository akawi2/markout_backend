import { Test, TestingModule } from '@nestjs/testing';
import { QuicksController } from './quicks.controller';

describe('QuicksController', () => {
  let controller: QuicksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuicksController],
    }).compile();

    controller = module.get<QuicksController>(QuicksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
