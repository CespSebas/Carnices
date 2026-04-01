import { Component, inject, Signal, computed, OnInit } from '@angular/core'; // ✅ Agregamos computed
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../share/cart.service';
import { AuthenticationService } from '../../share/authentication.service';
import { UsuarioModel } from '../../share/models/UsuarioModel';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  private cartService = inject(CartService);
  private authService = inject(AuthenticationService);

  isAuthenticated: Signal<boolean> = this.authService.isAuthenticatedSignal;
  currentUser: Signal<UsuarioModel | null> = this.authService.currentUserSignal;
 qtyItems: Signal<number> = this.cartService.qtyItems;


   

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.use(savedLang);
    console.log('Idioma cargado desde localStorage:', savedLang);
  }

  ngOnInit(): void {}

  login() {
    this.router.navigate(['usuario/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['inicio']);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    console.log('Idioma cambiado a:', lang);
  }

  isAdmin = computed(() => {
  const user = this.currentUser();
  console.log('Rol detectado:', user?.rol); 
  return !!user && user.rol === 'Administrador';
});


}