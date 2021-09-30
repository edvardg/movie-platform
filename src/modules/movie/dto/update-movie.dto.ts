import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { MovieTag } from '../../../common/constants';

export class UpdateMovieDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    title?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    director?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    cast?: string;

    @ApiPropertyOptional()
    @IsEnum(MovieTag, { each: true })
    @IsOptional()
    tags?: MovieTag[];
}
