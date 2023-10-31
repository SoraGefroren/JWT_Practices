import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {
  
  private dictionary: any | null;

  set(dictionary: any | null): void {
    this.dictionary = dictionary;
  }

  get(labelKey: string, pmLanguage: string | null = null): string {
    const curtLanguage: string | null = pmLanguage || localStorage.getItem('userLanguage') || `${environment.language}` || null;
    if (curtLanguage && this.dictionary && this.dictionary[labelKey] && this.dictionary[labelKey][curtLanguage]) {
        return (this.dictionary[labelKey][curtLanguage] || '');
    } else {
        return (labelKey || '');
    }
  }

  lang (): string {    
    return localStorage.getItem('userLanguage') || `${environment.language}` || '';
  }

}
