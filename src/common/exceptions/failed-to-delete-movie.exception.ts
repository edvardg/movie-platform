import { PreconditionFailedException } from '@nestjs/common';

export class FailedToDeleteMovieException extends PreconditionFailedException {
    constructor(error?: string) {
        super('error.failed_to_delete_movie', error);
    }
}
