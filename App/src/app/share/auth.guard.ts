import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification-service';
import { firstValueFrom, map } from 'rxjs';

export const authGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot
): Promise<boolean | UrlTree> => {

  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const noti = inject(NotificationService);

  const token = authService.getToken;

  // 1. Si no hay token, no está autenticado
  if (!token) {
    noti.warning('Autorización', 'Acceso Denegado', 2000);
    return router.createUrlTree(['/usuario/login']);
  }

  // 2. Obtener usuario desde backend
  const user = await firstValueFrom(authService.getUserProfile().pipe(
    map(u => u)
  ));

  if (!user) {
    noti.warning('Autorización', 'Acceso Denegado', 2000);
    return router.createUrlTree(['/usuario/login']);
  }

  // 3. Verificar roles permitidos
  const rolesAllowed = route.data['rol'] || [];
  if (rolesAllowed.length > 0 && !rolesAllowed.includes(user.rol)) {
    noti.warning('Acceso Restringido', 'Usuario sin permisos', 2000);
    return router.createUrlTree(['/usuario/login']);
  }

  // 4. Todo correcto, permitir acceso
  return true;
};
