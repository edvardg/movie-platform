import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
    FailedToCreateUserException,
    FailedToGetUserException,
    FailedToUpdateUserException,
    UserNotFoundException
} from '../../common/exceptions';
import { User, UserDocument } from './user.model';
import { UpdateUserDto, UserDto } from './dto';
import { RegisterDto } from '../auth/dto';

@Injectable()
export class UserService {
    private logger: Logger = new Logger(UserService.name);

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(data: RegisterDto): Promise<User> {
        try {
            const user = new this.userModel(data);
            return await user.save();
        } catch (err) {
            this.logger.error('Failed to create user');
            this.logger.error(err.toString());
            throw new FailedToCreateUserException(err.toString());
        }
    }

    async getUserById(id: string): Promise<UserDto> {
        let user;
        try {
            user = await this.userModel.findById(id);
        } catch (err) {
            this.logger.error(`Failed to get user with id: ${id}`);
            this.logger.error(err.toString());
            throw new FailedToGetUserException(err.toString());
        }
        if (!user) {
            this.logger.error(`No user found with id: ${id}`);
            throw new UserNotFoundException(`No user found with id: ${id}`);
        }
        return user;
    }

    async updateUser(id: string, data: UpdateUserDto): Promise<UserDto> {
        let user;
        try {
            user = await this.userModel.findOneAndUpdate({ _id: id }, data, { new: true });
        } catch (err) {
            this.logger.error(`Failed to update user with id: ${id}`);
            this.logger.error(err.toString());
            throw new FailedToUpdateUserException(err.toString());
        }
        if (!user) {
            this.logger.error(`No user found with id: ${id}`);
            throw new UserNotFoundException(`No user found with id: ${id}`);
        }
        return user;
    }

    async getUserByEmail(email, selectPassword = false): Promise<User> {
        if (!selectPassword) {
            return this.userModel.findOne({ email });
        }
        return this.userModel.findOne({ email }).select('email password').exec();
    }
}
