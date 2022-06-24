import { BadRequestException } from '@nestjs/common'

export const jsonFileFilter = (
  reqz: any,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void
): void => {
  if (file.mimetype.toString() !== 'application/json') {
    return callback(new BadRequestException(), false)
  }
  return callback(null, true)
}
