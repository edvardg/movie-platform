import {IsString, IsEmail, IsOptional, IsNotEmpty, IsEnum} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {Trim} from "class-sanitizer";
import {MovieTag} from "../../../common/constants";

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
