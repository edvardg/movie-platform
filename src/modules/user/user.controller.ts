import {
    Controller,
    Get,
    UseGuards,
    Req,
    Param,
    Put,
    Body,
    UnauthorizedException,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import { AccessControlGuard } from '../../common/guards/access-control.guard';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './dto';

@Controller('users')
@ApiTags('Users')
@UseGuards(AccessControlGuard)
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'Successfully retrieved user by ID'
    })
    async getUser(@Param('id') id: string): Promise<UserDto> {
        return this.userService.getUserById(id);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'Successfully updated user by ID'
    })
    @ApiBody({
        description: 'UpdateUserDto',
        type: UpdateUserDto,
        required: true
    })
    async updateUser(
        @Req() req,
        @Param('id') id: string,
        @Body() data: UpdateUserDto
    ): Promise<UserDto>
    {
        UserController.validateUserId(req.user.userId, id);
        return this.userService.updateUser(id, data);
    }

    private static validateUserId(reqUserId: string, id: string): void {
        if (reqUserId !== id) {
            throw new UnauthorizedException({ message: 'Not Authorized' });
        }
    }
}
