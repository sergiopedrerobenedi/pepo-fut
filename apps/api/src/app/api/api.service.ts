import { Injectable } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as ApiConstants from './api.constants';

@Injectable()
export class ApiService {

  static buildDocument(): Pick<OpenAPIObject,'openapi' | 'components' | 'externalDocs' | 'info' | 'servers' | 'tags'> {
    return new DocumentBuilder()
      .setTitle(ApiConstants.API_TITLE)
      .setDescription(ApiConstants.API_DESCRIPTION)
      .setVersion(ApiConstants.CURRENT_VERSION)
      .addTag(ApiConstants.API_GENERAL_TAG)
      .setContact('Sergio Pedrero', '', ApiConstants.CONTACT_EMAIL)
      .setLicense(ApiConstants.LICENSE_NAME, ApiConstants.LICENSE_URL)
      .addBearerAuth()
      .build();
  }

  static getGlobalPrefix(): string {
    return ApiConstants.API_GLOBAL_PREFIX;
  }

  static getDocsEndpoint(): string {
    return ApiConstants.DOCS_ENDPOINT;
  }
}
