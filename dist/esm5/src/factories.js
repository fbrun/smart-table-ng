/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { TableState } from './table-state';
import { smartTable as stTable } from 'smart-table-core';
import { of as observableOf, from as observableFrom } from 'rxjs/index';
export var /** @type {?} */ from = function (data, tableState) {
    if (tableState === void 0) { tableState = new TableState(); }
    var extensions = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        extensions[_i - 2] = arguments[_i];
    }
    var /** @type {?} */ dataArray = [];
    var /** @type {?} */ table = stTable.apply(void 0, [{ data: dataArray, tableState: tableState }].concat(extensions));
    var /** @type {?} */ source = observableFrom(data);
    var /** @type {?} */ subscription;
    return /** @type {?} */ (Object.assign(table, {
        init: /**
         * @return {?}
         */
        function () {
            if (subscription) {
                subscription.unsubscribe();
            }
            table.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            subscription = source
                .subscribe(function (items) {
                dataArray.splice.apply(dataArray, [0, dataArray.length].concat(items));
                table.exec();
            });
        },
        use: /**
         * @param {?} newData
         * @param {?=} newTableState
         * @return {?}
         */
        function (newData, newTableState) {
            subscription.unsubscribe();
            if (newTableState) {
                Object.assign(tableState, newTableState);
            }
            source = observableOf(newData);
            table.dispatch("EXEC_CHANGED" /* EXEC_CHANGED */, { working: true });
            subscription = source
                .subscribe(function (values) {
                dataArray.splice.apply(dataArray, [0, dataArray.length].concat(values));
                table.exec();
            });
        },
        ngOnDestroy: /**
         * @return {?}
         */
        function () {
            subscription.unsubscribe();
        }
    }));
};
export var /** @type {?} */ of = function (data, tableState) {
    if (tableState === void 0) { tableState = new TableState(); }
    var extensions = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        extensions[_i - 2] = arguments[_i];
    }
    return from.apply(void 0, [observableOf(data), tableState].concat(extensions));
};
//# sourceMappingURL=factories.js.map