import { Language } from './language';
import { LANGUAGES } from './mock-languages';
import { Injectable } from '@angular/core';

@Injectable()
export class LanguageService {
  getLanguages(): Promise<Language[]> {
    return Promise.resolve(LANGUAGES);
  }
}

