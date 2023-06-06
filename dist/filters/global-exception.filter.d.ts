import { ExceptionFilter, ArgumentsHost, BadRequestException, NotFoundException } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException | NotFoundException, host: ArgumentsHost): void;
}
