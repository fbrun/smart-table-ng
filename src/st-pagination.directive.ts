import {Directive, OnInit, OnDestroy} from '@angular/core';
import {SmartTable} from './smart-table.service';
import {paginationDirective as slice} from 'smart-table-core';

interface SummaryOutput {
    page: number;
    size: number;
    filteredCount: number;
}

@Directive({
    selector: '[stPagination]',
    exportAs: 'stPagination'
})
export class StPaginationDirective<T> implements OnInit, OnDestroy {
    private _directive: any;

    page = 1;
    size = 20;
    length: number;

    constructor(private table: SmartTable<T>) {
    }

    ngOnInit() {
        this._directive = slice({table: this.table});
        this._directive.onSummaryChange(({page, size, filteredCount}: SummaryOutput) => {
            let goToOne = false;
            this.page = page;
            // Il faut retourner sur la première page au besoin
            if ((this.size !== size || this.length !== filteredCount) && this.page > 1) {
                goToOne = true;
            }
            this.size = size;
            this.length = filteredCount;
            if (goToOne) {
                this.selectPage(1);
            }
        });
    }

    ngOnDestroy() {
        this._directive.off();
    }

    get lowerBoundIndex(): number {
        return (this.page - 1) * this.size;
    }

    get higherBoundIndex(): number {
        return Math.min(this.page * this.size - 1, this.length - 1);
    }

    get pageCount(): number {
        return this.size ? Math.ceil(this.length / this.size) : 1;
    }

    get pages(): number[] {
        return Array.from({ length: this.pageCount }, (v, k) => k + 1);
    }

    selectPage(p: number): void {
        return this._directive.selectPage(+(p));
    }

    selectNextPage(): void {
        return this._directive.selectNextPage();
    }

    selectPreviousPage(): void {
        return this._directive.selectPreviousPage();
    }

    changePageSize(size: number): void {
        // Force number cast;
        return this._directive.changePageSize(+(size));
    }

    isPreviousPageEnabled(): boolean {
        return this._directive.isPreviousPageEnabled();
    }

    isNextPageEnabled(): boolean {
        return this._directive.isNextPageEnabled();
    }
}
