
import { Test } from '@nestjs/testing';
import {ServiceController} from './service.controller'
import { ServiceService } from './service.service';

describe('ServiceController', () => {
    let serviceController: ServiceController;
    let service: ServiceService;

beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [], // Add
        controllers: [ServiceController], // Add
        providers: [        {
            provide: ServiceService,
            useValue: {
                find: jest.fn(),
                findOne: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn()
            }
          }],   // Add
    }).compile();

    serviceController = moduleRef.get<ServiceController>(ServiceController);
    service = moduleRef.get<ServiceService>(ServiceService);
    });

it('should be defined', () => {
    expect(serviceController).toBeDefined();
    });
it('should be defined', () => {
    expect(service).toBeDefined();
    });
});
