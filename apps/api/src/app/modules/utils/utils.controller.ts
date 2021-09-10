import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, MulterModule, } from "@nestjs/platform-express";
import { Express } from 'express';


@Controller()
export class UtilsController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file : Ex) {
    console.log(file)
  }
}
