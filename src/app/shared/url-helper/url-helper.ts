/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { APP_BASE_HREF } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';

import { ConfigService } from '@dagonmetric/ng-config';

import { AppConfig } from '../app-config';

/**
 * App url helper service.
 */
@Injectable({
    providedIn: 'root'
})
export class UrlHelper {
    private readonly _appConfig: AppConfig;

    constructor(
        configService: ConfigService,
        @Optional() @Inject(APP_BASE_HREF) private readonly _baseHref?: string) {
        this._appConfig = configService.getValue<AppConfig>('app');
    }

    toAbsoluteUrl(url: string): string {
        let formattedUrl = (url || '').trim();

        if (this.isAbsoluteUrl(formattedUrl)) {
            return formattedUrl;
        }

        let originalUrl = this._appConfig.baseUrl;

        if (originalUrl.endsWith('/')) {
            originalUrl = originalUrl.substr(0, originalUrl.length - 1);
        }

        if (formattedUrl.startsWith('/') && !/^\/\//i.test(formattedUrl)) {
            formattedUrl = formattedUrl.substr(1);
        }

        formattedUrl = originalUrl + (this._baseHref || '/') + formattedUrl;

        return formattedUrl;
    }

    private isAbsoluteUrl(url: string): boolean {
        return /^https?\:\/\//i.test(url);
    }
}
