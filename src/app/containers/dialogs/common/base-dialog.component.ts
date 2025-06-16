import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
    standalone: true,
    selector: '',
    template: '',
    imports: [CommonModule, MatDialogModule],
})
export class PCOBaseDialogComponent implements OnDestroy {
    @Output() keyCodePressed: EventEmitter<number> = new EventEmitter();

    public destroy$ = new Subject<void>();

    constructor() {}

    @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
        this.keyCodePressed.emit(event.keyCode);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
