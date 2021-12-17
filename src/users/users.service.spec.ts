import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import { Users, UsersRepository } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
    let service: UsersService;
    let usersRepository: UsersRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
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

        service = module.get<UsersService>(UsersService);
        usersRepository = module.get<UsersRepository>(UsersRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('UserService.findAll ', () => {
        it('should return an array of users', async () => {
            usersRepository.find = jest.fn();
            const data = service.findAll();
            expect(service.findAll()).toBe(data);
        });
    });

    
    
    describe('UserService.create ', () => {
        it('should create an user', async () => {
            usersRepository.create = jest.fn();
            const myuser = new Users;
            const data = service.create(myuser);
            expect(service.create(myuser)).toBe(data);
        });
    });

    describe('UserService.update ', () => {
        it('should update an user', async () => {
            usersRepository.update = jest.fn();
            const myuser = new Users;
            const data = service.update(1, myuser);
            expect(service.update(1, myuser)).toBe(data);
        });
    });

    describe('UserService.remove ', () => {
        it('should delete an user', async () => {
            usersRepository.delete = jest.fn();
            const myuser = new Users;
            const data = service.remove(1);
            expect(service.remove(1)).toBe(data);
        });
    });

    describe('UserService.findOne ', () => {
        it('should return an user', async () => {
            var myuser = new Users;
            myuser.id = 1;
            const result = new Promise<Users>((resolve, reject) => {
                setTimeout(() => {
                    resolve(myuser);
                }, 300);
            });
            jest.spyOn(usersRepository, 'findOne').mockImplementation(() => result);
            expect(await service.findOne(1)).toBe(result);
        });
    });

});
