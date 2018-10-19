import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { SmartTable } from './smart-table.service';
import { SortDirection } from 'smart-table-core';
export declare class StSortDirective<T> implements OnInit, OnDestroy {
    private table;
    private _el;
    private _directive;
    currentSortDirection: SortDirection;
    constructor(table: SmartTable<T>, _el: ElementRef);
    delay: number;
    pointer: string;
    cycle: boolean | string;
    readonly isAsc: boolean;
    readonly isDesc: boolean;
    toggle(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
