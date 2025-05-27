import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API documentation for the Contacts management system',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The contact ID'
            },
            name: {
              type: 'string',
              description: 'The contact name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'The contact email'
            },
            phone: {
              type: 'string',
              description: 'The contact phone number'
            }
          }
        }
      }
    }
  },
  apis: ['./src/resources/**/*.routes.js']
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);

// OpenAPI documentation generation
if (process.argv[1].endsWith('swagger.config.js')) {
  const fs = await import('fs');
  const { default: path } = await import('path');
  
  try {
    const outputPath = path.join(process.cwd(), 'docs', 'swagger.json');
    fs.writeFileSync(outputPath, JSON.stringify(swaggerDocs, null, 2));
    // eslint-disable-next-line no-console
    console.log('Swagger documentation generated successfully!');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating Swagger documentation:', error);
    process.exit(1);
  }
}
