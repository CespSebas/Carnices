import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ResennaService } from '../../share/services/resenna.service';

@Component({
    selector: 'app-resenna-detail',
    standalone: false,
    templateUrl: './resenna-detail.html',
    styleUrl: './resenna-detail.css'
})
export class ResennaDetail {
    datos: any;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private rsService: ResennaService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        let id = this.activeRoute.snapshot.paramMap.get('id')
        if (!isNaN(Number(id))) this.obtenerResenna(Number(id))

    }
    generateStars(rating: number): { icon: string, class: string }[] {
        return Array(5).fill(0).map((_, i) => {
            if (i + 1 <= rating) return { icon: 'star', class: 'full-star' };
            if (i < rating) return { icon: 'star_half', class: 'half-star' };
            return { icon: 'star_border', class: 'empty-star' };
        });
    }
    obtenerResenna(id: any) {
        this.rsService
            .getById(id)
            .pipe(takeUntil(this.destroy$)) // Operador de RxJS para desuscribirse automáticamente
            .subscribe((data: any) => {
                console.log(data);
                this.datos = data;
            });
    }
    goBack(): void {
        this.router.navigate(['/resenna/']);
    }
    //Hook del ciclo de vida de Angular: se ejecuta cuando el componente va a ser destruido
    ngOnDestroy() {
        this.destroy$.next(true); // Emite un valor para notificar a 'takeUntil'
        this.destroy$.unsubscribe(); // Completa el Subject 'destroy$' para liberar recursos
    }


} 