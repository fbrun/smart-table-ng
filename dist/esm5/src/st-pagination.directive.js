/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive } from '@angular/core';
import { SmartTable } from './smart-table.service';
import { paginationDirective as slice } from 'smart-table-core';
/**
 * @record
 */
function SummaryOutput() { }
function SummaryOutput_tsickle_Closure_declarations() {
    /** @type {?} */
    SummaryOutput.prototype.page;
    /** @type {?} */
    SummaryOutput.prototype.size;
    /** @type {?} */
    SummaryOutput.prototype.filteredCount;
}
/**
 * @template T
 */
var StPaginationDirective = /** @class */ (function () {
    function StPaginationDirective(table) {
        this.table = table;
        this.page = 1;
        this.size = 20;
    }
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._directive = slice({ table: this.table });
        this._directive.onSummaryChange(function (_a) {
            var page = _a.page, size = _a.size, filteredCount = _a.filteredCount;
            console.log('StPaginationDirective onSummaryChange : ', { page: page, size: size, filteredCount: filteredCount });
            var /** @type {?} */ goToOne = false;
            _this.page = page;
            // Il faut retourner sur la première page au besoin
            if ((_this.size !== size || _this.length !== filteredCount) && _this.page > 1) {
                goToOne = true;
            }
            _this.size = size;
            _this.length = filteredCount;
            if (goToOne) {
                _this.selectPage(1);
            }
        });
    };
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._directive.off();
    };
    Object.defineProperty(StPaginationDirective.prototype, "lowerBoundIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.page - 1) * this.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StPaginationDirective.prototype, "higherBoundIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.min(this.page * this.size - 1, this.length - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StPaginationDirective.prototype, "pageCount", {
        get: /**
         * @return {?}
         */
        function () {
            return this.size ? Math.ceil(this.length / this.size) : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StPaginationDirective.prototype, "pages", {
        get: /**
         * @return {?}
         */
        function () {
            return Array.from({ length: this.pageCount }, function (v, k) { return k + 1; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} p
     * @return {?}
     */
    StPaginationDirective.prototype.selectPage = /**
     * @param {?} p
     * @return {?}
     */
    function (p) {
        return this._directive.selectPage(+(p));
    };
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.selectNextPage = /**
     * @return {?}
     */
    function () {
        return this._directive.selectNextPage();
    };
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.selectPreviousPage = /**
     * @return {?}
     */
    function () {
        return this._directive.selectPreviousPage();
    };
    /**
     * @param {?} size
     * @return {?}
     */
    StPaginationDirective.prototype.changePageSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        // Force number cast;
        return this._directive.changePageSize(+(size));
    };
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.isPreviousPageEnabled = /**
     * @return {?}
     */
    function () {
        return this._directive.isPreviousPageEnabled();
    };
    /**
     * @return {?}
     */
    StPaginationDirective.prototype.isNextPageEnabled = /**
     * @return {?}
     */
    function () {
        return this._directive.isNextPageEnabled();
    };
    StPaginationDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[stPagination]',
                    exportAs: 'stPagination'
                },] }
    ];
    /** @nocollapse */
    StPaginationDirective.ctorParameters = function () { return [
        { type: SmartTable, },
    ]; };
    return StPaginationDirective;
}());
export { StPaginationDirective };
function StPaginationDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StPaginationDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StPaginationDirective.ctorParameters;
    /** @type {?} */
    StPaginationDirective.prototype._directive;
    /** @type {?} */
    StPaginationDirective.prototype.page;
    /** @type {?} */
    StPaginationDirective.prototype.size;
    /** @type {?} */
    StPaginationDirective.prototype.length;
    /** @type {?} */
    StPaginationDirective.prototype.table;
}
//# sourceMappingURL=st-pagination.directive.js.map