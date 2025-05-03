import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  router = inject(Router);  // Use Angular's dependency injection

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }

    this.router.navigate(['/login']);  // Redirect to login if no token
    return false;
  }
}