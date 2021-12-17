import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { Users, UsersRepository } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
    let controller: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                UsersRepository,
                {
                    provide: getRepositoryToken(Users),
                    useValue: {
                        save: jest.fn(),
                        find: jest.fn()
                    },
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('UserController.findAll ', () => {
        it('should return an array of users', async () => {
            usersService.findAll = jest.fn();
            const data = controller.findAll();
            expect(controller.findAll()).toBe(data);
        });
    });

    describe('UserController.findOne ', () => {
        it('should return an user', async () => {
            usersService.findOne = jest.fn();
            const data = controller.findOne("1");
            expect(controller.findOne("1")).toBe(data);
        });
    });

    describe('UserController.create', () => {
        it('should create an user', async () => {
            usersService.create = jest.fn();
            var myuser = new CreateUserDto();
            const data = controller.create(myuser);
            expect(controller.create(myuser)).toBe(data);
        });
    });

    describe('UserController.update', () => {
        it('should update an user', async () => {
            usersService.update = jest.fn();
            var myuser = new UpdateUserDto();
            const data = controller.update("12", myuser);
            expect(controller.update("12", myuser)).toBe(data);
        });
    });

    describe('UserController.delete', () => {
        it('should delete an user', async () => {
            usersService.remove = jest.fn();
            const data = controller.remove("12");
            expect(controller.remove("12")).toBe(data);
        });
    });


});
