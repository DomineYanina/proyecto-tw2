import { Component, inject, OnDestroy, OnInit, ElementRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// 🛑 Importaciones clave para la solución: forkJoin, catchError, take
import { switchMap, tap, filter, forkJoin, catchError, take } from 'rxjs';
import { of } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { Desarrollador, RequisitosPC, Videojuego } from '../../interfaces/videojuego.interface';
import { VideojuegoService } from '../../../../api/services/videojuego/videojuego.service';
import { ImageModule } from 'primeng/image';
import { DatePipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/auth.service';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
    selector: 'app-detalle-videojuego',
    standalone: true,
    imports: [DividerModule, ImageModule, DatePipe, CommonModule, CurrencyPipe, ButtonModule,ProgressSpinnerModule],
    templateUrl: './detalle-videojuego.html',
    styleUrl: './detalle-videojuego.css'
})
export class DetalleVideojuego implements OnInit, OnDestroy {

    spinner: boolean = true;
    videojuegoId: number = 0;
    desarrolladorId: number = 0;
    desarrollador: Desarrollador | null = null;
    videojuego: Videojuego | null = null;
    requisitos: RequisitosPC | null = null;

    videojuegoService = inject(VideojuegoService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private authService = inject(AuthService);
    carritoService = inject(CarritoService);
    private messageService = inject(MessageService);
    // 🛑 INYECCIÓN DE ChangeDetectorRef
    private cdr = inject(ChangeDetectorRef);


    @ViewChild('audioFx') audioPlayerRef!: ElementRef<HTMLAudioElement>;
    tarjetaMediosActiva: boolean = false;
    tarjetaInfoActiva: boolean = false;
    otraTarjetaInactiva: boolean = false;

    toggleTarjeta(tipo: 'medios' | 'info') {
        if (!this.tarjetaMediosActiva && !this.tarjetaInfoActiva) {
            this.playFuturisticSound();
        }

        if (tipo === 'medios') {
            this.tarjetaMediosActiva = !this.tarjetaMediosActiva;
            this.tarjetaInfoActiva = false;
        } else {
            this.tarjetaInfoActiva = !this.tarjetaInfoActiva;
            this.tarjetaMediosActiva = false;
        }

        this.otraTarjetaInactiva = this.tarjetaMediosActiva || this.tarjetaInfoActiva;
    }

    playFuturisticSound() {
        if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
            const audio = this.audioPlayerRef.nativeElement;
            audio.currentTime = 0;
            audio.play().catch(error => {
                console.warn('Error al reproducir el audio:', error);
            });
        }
    }

    ngOnInit(): void {
        this.cargarTodosLosDatos();
    }

    ngOnDestroy(): void {}

    cargarTodosLosDatos(): void {
        this.route.params.pipe(
            take(1),
            switchMap(params => {
                const id = +params['id'];
                if (!id || isNaN(id)) {
                    this.spinner = false;
                    return of(null);
                }
                this.videojuegoId = id;

                const data$ = forkJoin({
                    videojuego: this.videojuegoService.getVideojuegoById(id).pipe(
                        catchError(err => {
                            console.error('Error al obtener videojuego:', err);
                            return of(null);
                        })
                    ),
                    requisitos: this.videojuegoService.getRequisitosPCByVideojuegoId(id).pipe(
                        catchError(err => {
                            console.error('Error al obtener requisitos:', err);
                            return of(null);
                        })
                    )
                });
                return data$;
            }),
            filter((results): results is { videojuego: Videojuego | null, requisitos: RequisitosPC | null } => !!results),
            tap(results => {
                this.videojuego = results.videojuego;
                this.requisitos = results.requisitos;
                this.desarrolladorId = results.videojuego?.id_desarrollador || 0;
            }),
            switchMap(results => {
                if (this.videojuego?.id_desarrollador) {
                    return this.videojuegoService.getDesarrolladorByVideojuegoId(this.videojuego.id_desarrollador).pipe(
                        catchError(err => {
                            console.error('Error al obtener desarrollador:', err);
                            return of(null);
                        })
                    );
                }
                return of(null);
            })
        ).subscribe({
            next: (desarrollador) => {
                this.desarrollador = desarrollador;
            },
            error: (error) => {
                console.error('Error inusual en la suscripción principal:', error);
                this.spinner = false;
                this.cdr.detectChanges(); // 🛑 FORZAR detección de cambios en caso de error
            },
            complete: () => {
                this.spinner = false;
                this.cdr.detectChanges(); // 🛑 FORZAR detección de cambios para ocultar el spinner
            }
        });
    }

    agregarACarrito(videojuego_id: number | undefined): void {
        const userIdStr = this.authService.getUserId();
        const videojuegoId = videojuego_id;

        if (!userIdStr) {
            this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'Debe iniciar sesión para agregar ítems al carrito.'});
            return;
        }

        if (!videojuegoId) {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo identificar el videojuego.'});
            return;
        }

        const userId = parseInt(userIdStr, 10);

        this.carritoService.agregarItem(userId, videojuegoId, 1)
            .subscribe({
                next: () => {
                    this.messageService.add({severity:'success', summary: 'Éxito', detail: `${this.videojuego?.nombre} añadido al carrito.`});
                },
                error: (err) => {
                    console.error('Error al añadir al carrito:', err);
                    this.messageService.add({severity:'error', summary: 'Error', detail: 'Hubo un error al procesar tu solicitud.'});
                }
            });
    }


    volverALaLista(): void {
        this.router.navigate(['/videojuego/lista-videojuegos']);
    }
}
