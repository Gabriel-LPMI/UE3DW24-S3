import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) { }

     create(createUserDto: CreateUserDto) {
        return this.usersRepository.save(createUserDto);
    }

    findAll() {
        return this.usersRepository.find();
    }

    findOne(id: number) {
        return this.usersRepository.findOne(id);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        updateUserDto.id = id;
        return this.usersRepository.save(updateUserDto);
    }

    remove(id: number) {
        return this.usersRepository.delete(id);
    }
}
