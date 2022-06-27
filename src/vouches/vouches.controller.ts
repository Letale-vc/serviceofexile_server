import {
  Body,
  Controller,
  Post,
  HttpCode,
  ForbiddenException
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtReturnUserDto } from '../auth/dto/auth.dto'
import { VouchesService } from './vouches.service'
import { VouchesGiveDTO } from './dto/vouches.dto'
import { UserReq } from '../users/decorators/user.decorator'

@ApiBearerAuth()
@ApiTags('vouches')
@Controller('/api/vouches/')
export class VouchesController {
  constructor(private readonly _vouchesService: VouchesService) {}

  @Post()
  @HttpCode(204)
  async giveVouch(
    @UserReq() user: JwtReturnUserDto,
    @Body() { userUuid }: VouchesGiveDTO
  ): Promise<void> {
    const checkVouch = await this._vouchesService.checkVouch(
      userUuid,
      user.uuid
    )

    if (checkVouch) {
      await this._vouchesService.saveVouch(userUuid, user.uuid)
    } else {
      throw new ForbiddenException()
    }
  }
}
