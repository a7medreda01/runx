import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const langSvc = inject(LanguageService);
  const currentLang = langSvc.currentLang();

  // Attach Accept-Language, X-Language headers and lang query param to every HTTP request
  const clonedReq = req.clone({
    setHeaders: {
      'Accept-Language': currentLang,
      'X-Language': currentLang
    },
    setParams: {
      lang: currentLang
    }
  });

  return next(clonedReq);
};
