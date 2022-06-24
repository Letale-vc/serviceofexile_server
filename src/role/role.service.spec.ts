import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { UserRoles } from './role.enum';
import {RoleService} from './role.service'

describe('RoleService', () => {
    let roleService: RoleService;
    let roleModel: Repository<Role>
   
beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [], // Add
        controllers: [], // Add
        providers: [RoleService,{
            provide: getRepositoryToken(Role), useValue:{
                find: jest.fn(),
                save: jest.fn()
            }
        }],   // Add
    }).compile();

    roleService = moduleRef.get<RoleService>(RoleService);
    roleModel = moduleRef.get<Repository<Role>>(getRepositoryToken(Role))
    });

it('should be defined', () => {
    expect(roleService).toBeDefined();
    });
it('should be defined', () => {
    expect(roleModel).toBeDefined();
    });

    describe('getRoles',  () =>{
    

       it('should be expect getRolesResult', async()=>{ 
        const getRolesResult = [{id:1, name: UserRoles.Admin}]

        jest.spyOn(roleModel, 'find').mockResolvedValue(getRolesResult)
        const result = await roleService.getRoles()
        expect(result).toEqual(getRolesResult)
       })
    })

    describe('onModuleInit', ()=>{
        it('should be called fn roleModel.save if not find roles in db', async ()=>{
      
            jest.spyOn(roleModel, 'find').mockResolvedValue([])
           const repoSpy = jest.spyOn(roleModel, 'save')
           await roleService.onModuleInit()
            expect(repoSpy).toBeCalled()
           
        })
        it('should not called  roleModel.save if  find roles in db', async ()=>{
            const getRolesResult = [{id:1, name: UserRoles.Admin}]
            jest.spyOn(roleModel, 'find').mockResolvedValue(getRolesResult)
            const repoSpy = jest.spyOn(roleModel, 'save')
           await roleService.onModuleInit()
            expect(repoSpy).toBeCalledTimes(0)
           
        })
    })
});
