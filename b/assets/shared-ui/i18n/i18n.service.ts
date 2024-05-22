import { Injectable } from '@angular/core';
import * as fr from './fr.json';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  public getLocale(lang: string) {
    switch (lang) {
      case 'fr':
        return fr;
      default:
        return fr;
    }
  }
}
