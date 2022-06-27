import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from './role.entity'
import { UserRoles } from './role.enum'

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private _rolesRepository: Repository<Role>
  ) {}

  async onModuleInit(): Promise<void> {
    const rolesFind = await this._rolesRepository.find()

    const sameFunc = async (val: UserRoles): Promise<void> => {
      const newRole = new Role()

      newRole.name = val

      await this._rolesRepository.save(newRole)
    }

    if (rolesFind && rolesFind.length === 0) {
      const roles = Object.keys(UserRoles)

      roles.forEach((role) => {
        sameFunc(UserRoles[role])
      })
    }
  }

  async getRoles(): Promise<Role[]> {
    return this._rolesRepository.find()
  }
}
