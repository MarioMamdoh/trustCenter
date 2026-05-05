import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const moderatorOrAdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const toast = inject(ToastrService);
  const role = sessionStorage.getItem('user_role');
  if (role === 'moderator' || role === 'admin') {
    return true;
  } else {
    toast.error('You are not have permission to access this page');
    return false;
  }
};
