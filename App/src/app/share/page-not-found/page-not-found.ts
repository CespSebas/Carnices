import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.html',
  styleUrls: ['./page-not-found.css']
})
export class PageNotFound implements AfterViewInit {
  @ViewChild('btnInicio', { static: false }) btnInicio!: ElementRef<HTMLButtonElement>;
  
  constructor(private router: Router) {}

  irInicio() {
    if (!this.btnInicio) {
      this.router.navigate(['/']);
      return;
    }
    this.btnInicio.nativeElement.classList.add('glow-animation');
    setTimeout(() => {
      this.btnInicio.nativeElement.classList.remove('glow-animation');
      this.router.navigate(['/']);
    }, 500);
  }

  ngAfterViewInit() {
    this.initMatrix();
  }

  private initMatrix() {
    const canvas = document.getElementById('matrix') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajuste canvas al tamaño de la ventana
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = '01';
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = new Array(columns).fill(1);

    function draw() {
      if (!ctx) return;

      // Fondo semi-transparente para efecto trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Color amarillo #facc15
      ctx.fillStyle = '#facc15';
      ctx.font = `${fontSize}px Consolas`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
}
