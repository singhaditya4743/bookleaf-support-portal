import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { applyTokenFromLogin } from '@/config/swagger-auto-auth';

const HIDE_DOCUMENTED_RESPONSES_CSS = `
  .swagger-ui .responses-inner > table.responses-table,
  .swagger-ui .responses-inner > div > h4:last-child { display: none; }
`;

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('BookLeaf Support Portal API')
    .setDescription('Author support and ticket management API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Login and current user')
    .addTag('Author - Books', 'Books and royalty details of the logged-in author')
    .addTag('Author - Tickets', 'Support queries raised by the logged-in author')
    .addTag('Admin - Tickets', 'Ticket queue and ticket management for the BookLeaf team')
    .addTag('Admin - Replies', 'Replies sent to the author')
    .addTag('Admin - Notes', 'Internal notes, visible only to admins')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customCss: HIDE_DOCUMENTED_RESPONSES_CSS,
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      responseInterceptor: applyTokenFromLogin,
    },
  });
}
