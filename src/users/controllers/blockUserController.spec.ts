import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, BadRequestException } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';


describe('BlockUserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // Enable global validation pipe
    await app.init();
  });

  it('POST /blocked-users/:userId/block - success', async () => {
    const userId = '666f162f4f82e980bb1ec718';
    const blockUserDto = {
      blockedUsers: ['anotherUserId'],
    };

    const response = await request(app.getHttpServer())
      .post(`/blocked-users/${userId}/block`)
      .send(blockUserDto)
      .expect(201);

    expect(response.body.message).toBe('Users blocked successfully');
    expect(response.body.blockedUser).toHaveProperty('_id'); // Example property check
  });

  it('POST /blocked-users/:userId/block - validation error', async () => {
    const userId = 'invalidUserIdFormat';
    const blockUserDto = {
      // invalid data
    };

    const response = await request(app.getHttpServer())
      .post(`/blocked-users/${userId}/block`)
      .send(blockUserDto)
      .expect(400);

    expect(response.body.message).toContain('Invalid userId format');
    expect(response.body.statusCode).toBe(400);
  });

  it('POST /blocked-users/:userId/unblock - success', async () => {
    const userId = '666f162f4f82e980bb1ec718';
    const unblockUserDto = {
      unblockedUsers: ['anotherUserId'],
    };

    const response = await request(app.getHttpServer())
      .post(`/blocked-users/${userId}/unblock`)
      .send(unblockUserDto)
      .expect(200);

    expect(response.body.message).toBe('Users unblocked successfully');
    expect(response.body.unblockedUser).toHaveProperty('_id'); // Example property check
  });

  it('POST /blocked-users/:userId/unblock - validation error', async () => {
    const userId = 'invalidUserIdFormat';
    const unblockUserDto = {
      // invalid data
    };

    const response = await request(app.getHttpServer())
      .post(`/blocked-users/${userId}/unblock`)
      .send(unblockUserDto)
      .expect(400);

    expect(response.body.message).toContain('Invalid userId format');
    expect(response.body.statusCode).toBe(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
