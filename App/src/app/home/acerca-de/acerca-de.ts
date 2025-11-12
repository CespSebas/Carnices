import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acerca-de',
  standalone: false,
  templateUrl: './acerca-de.html',
  styleUrl: './acerca-de.css'
})
export class AcercaDe {
  constructor(private router: Router) {}

  irInicio() {
    this.router.navigate(['/']);
  }

  contacto() {
    this.router.navigate(['/contacto']);
  }
}
