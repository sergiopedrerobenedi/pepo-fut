import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../../../app.module';
import { User } from '../../users/model/user.entity';
import { UsersService } from '../../users/users.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'pepo_fut',
          synchronize: true,
          logging: true,
          entities: [User],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = await moduleFixture.get('UserRepository');
    userService = new UsersService(userRepository);
    await app.init();
  });

  // After all Auth e2e tests, delete teste2e mocked user from database
  afterAll(async () => {
    await userRepository.query(`delete from  "user"  where username = 'teste2e'`);
    await app.close();
  });

  it('POST /auth/sign-up successfully', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({
        username: 'teste2e',
        password: 'teste2e',
        firstName: 'teste2e',
        lastName: 'teste2e',
        email: 'teste2e@test.com',
      })
      .expect(201); // responses 201-Created
  });

  it('POST /auth/sign-up conflict error', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({
        username: 'teste2e',
        password: 'teste2e',
        firstName: 'teste2e',
        lastName: 'teste2e',
        email: 'teste2e@test.com',
      })
      .expect(409); // responses 409-Conflict error
  });

  it('POST /login successfully', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'teste2e',
        password: 'teste2e',
      })
      .expect(200); // responses 200-OK
  });

  it('POST /login not valid credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'username',
        password: 'password',
      })
      .expect(401); // responses 401-Unauthorized error
  });

  it('POST /new-token successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'teste2e',
        password: 'teste2e',
      })
      .expect(200); // responses 200-OK
    const { body } = response;
    const { refreshToken } = body;

    return request(app.getHttpServer())
      .post('/auth/new-token')
      .send({
        refreshToken,
      })
      .expect(201); // responses 401-Unauthorized error
  });

  it('POST /new-token invalid signature refresh token', async () => {
    return request(app.getHttpServer())
      .post('/auth/new-token')
      .send({
        refreshToken: 'fail',
      })
      .expect(400); // responses 400-Bad request-Invalid signature refresh token
  });

  it('POST /new-token bad request params', async () => {
    return request(app.getHttpServer())
      .post('/auth/new-token')
      .send({
        refreshToken: 1233,
      })
      .expect(400); // responses 400-Bad request- refreshToken must be a string
  });
});
