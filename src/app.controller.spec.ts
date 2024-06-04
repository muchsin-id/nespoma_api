import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return Documentation Page', () => {
      const res = {} as Response; // Mock the Response object
      expect(appController.root(res)).toHaveBeenCalledWith(res);
    });
  });
});
