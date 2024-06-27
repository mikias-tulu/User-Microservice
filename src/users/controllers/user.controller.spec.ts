import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';


describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST user - success', async () => {
    const createUserDto = {
      name: 'mt',
      surname: 'sd',
      username: 'sd',
      birthDate: '2001-01-01T00:00:00.000Z',
    };

    const response = await request(app.getHttpServer())
      .post('/user')
      .send(createUserDto)
      .expect(201);

    expect(response.body.message).toBe('User created successfully');
    expect(response.body.user).toHaveProperty('_id'); // Example property check
  });

  it('/POST user - validation error', async () => {
    const createUserDto = {
      /* invalid data */
    };

    const response = await request(app.getHttpServer())
      .post('/user')
      .send(createUserDto)
      .expect(400);

    expect(response.body.message).toContain(`\"name\" is required`);
    expect(response.body.statusCode).toBe(400);
  });

  it('PUT /user/:userId - success', async () => {
    const userId = '666f162f4f82e980bb1ec718';

    const updatedUser = {
      surname: 'khanna',
    };

    const response = await request(app.getHttpServer())
      .put(`/user/${userId}`)
      .send(updatedUser)
      .expect(200);

    expect(response.body.message).toBe('User updated successfully');
    expect(response.body.user.surname).toEqual(updatedUser.surname);
  });

  it('PUT /user/:userId - success', async () => {
    const userId = '666f162f4f82e980bb1ec718c';

    const updatedUser = {
      surname: 'khanna',
    };

    const response = await request(app.getHttpServer())
      .put(`/user/${userId}`)
      .send(updatedUser)
      .expect(400);

    expect(response.body.message).toBe('Invalid userId format');
  });

  it('PUT /user/:userId - success', async () => {
    const userId = '666f162f4f82e980bb1ec718c';

    const updatedUser = {
      surname: 'khanna',
    };

    const response = await request(app.getHttpServer())
      .put(`/user/${userId}`)
      .send(updatedUser)
      .expect(400);

    expect(response.body.message).toBe('Invalid userId format');
  });

  it('GET /user/:userId - success', async () => {
    const userId = '666f162f4f82e980bb1ec718';

    const response = await request(app.getHttpServer())
      .get(`/user/${userId}`)
      .expect(200);

    expect(response.body.message).toBe('User returned successfully');
    expect(response.body.user._id).toEqual('666f162f4f82e980bb1ec718');
  });

  afterAll(async () => {
    await app.close();
  });
});
