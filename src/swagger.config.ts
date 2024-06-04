import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';

// Function to extract resource names from controllers
function extractResourceNames(): string[] {
  const resourceNames: string[] = [];

  // Get all modules in AppModule
  const importedModules = Reflect.getMetadata('imports', AppModule);
  importedModules.forEach((module: any) => {
    // Annotate the type of 'module'
    // Get all controllers in each module
    const controllers = Reflect.getMetadata('controllers', module);
    if (controllers) {
      controllers.forEach((controller: any) => {
        // Annotate the type of 'controller'
        // Extract controller name from metadata
        const controllerName = Reflect.getMetadata('path', controller);
        resourceNames.push(controllerName);
      });
    }
  });
  return resourceNames;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tags = extractResourceNames().map((name) => ({ name }));
const app = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const title = app.name;
const description = app.description;
const version = app.version;

export const swaggerConfig = new DocumentBuilder()
  .setTitle(title)
  .setDescription(description)
  .setVersion(version)
  .build();

export const swaggerOptions: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  deepScanRoutes: true,
  include: [],
};
