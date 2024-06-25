import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  
  @Catch()
  export class ExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(ExceptionsFilter.name);
  
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : { message: 'Internal server error' };
  
      // Log the error details
      this.logger.error(
        `HTTP Status: ${status} Error Message: ${JSON.stringify(message)} Path: ${request.url} Method: ${request.method} Timestamp: ${new Date().toISOString()}`,
        exception.stack,
      );
  
      response.status(status).json({
        success: false,
        error: true,
        data: null,
        errorMessage: message,
      });
    }
  }
  