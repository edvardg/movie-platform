import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationParams {
    @ApiPropertyOptional({
        minimum: 0,
        default: 0,
    })
    @IsOptional()
    skip?: number;

    @ApiPropertyOptional({
        minimum: 1,
        maximum: 10,
        default: 10,
    })
    @IsOptional()
    limit?: number;
}