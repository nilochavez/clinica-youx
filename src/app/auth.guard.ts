import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service'; // Ajuste o caminho conforme necessário
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    switchMap(isAuth => {
      if (isAuth) {
        // Verifique o cargo do usuário
        return authService.getUserRole().pipe(
          map(role => {
            const expectedRole = route.data['role'] as string; // Obtenha o cargo esperado da rota

            if (role === expectedRole) {
              return true; // Permite o acesso à rota
            } else if(expectedRole == 'ALL'){
              return true
            }else {
              router.navigate(['/access-denied']); // Redireciona para a página de acesso negado
              return false; // Bloqueia o acesso à rota
            }
          })
        );
      } else {
        router.navigate(['/login']); // Redireciona para a página de login
        return of(false); // Bloqueia o acesso à rota
      }
    })
  );
};