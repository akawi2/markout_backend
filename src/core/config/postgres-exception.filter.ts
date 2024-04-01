import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { PostgresError } from 'pg-error';

@Catch(PostgresError)
export class PostgresExceptionFilter implements ExceptionFilter {
  catch(exception: PostgresError, host: ArgumentsHost) {
    // Handle the exception and return an appropriate response
    // You can access the request, response, and other context information from the host object
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    // Customize the error response based on the exception
    const statusCode = 500; // Set an appropriate status code
    const errorMessage = 'An error occurred while processing your request.'; // Set an appropriate error message

    response
      .status(statusCode)
      .json({
        statusCode,
        message: errorMessage,
      });
  }
}