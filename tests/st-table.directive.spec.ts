import {SmartTable} from '../src/smart-table.service';
import {StTableDirective} from '../src/st-table.directive';
import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {SortDirection, StEvents} from '../src/common-types';
import {of} from '../src/factories';
import set = Reflect.set;

@Component({})
class StTableHostComponent {

    args: any;

    constructor() {

    }

    handleEvent($event: any) {
        this.args = $event;
    }
}

interface User {
    name: string;
    age: number;
    email: string;
}

const fixtureData: User[] = [
    {name: 'Bob', age: 30, email: 'foo@bar.com'},
    {name: 'Albert', age: 40, email: 'woo@example.com'},
    {name: 'Raymond', age: 35, email: 'nooo@bexample.com'}
];

const newData: User[] = [
    {name: 'Alice', age: 33, email: 'foo@bar.com'},
    {name: 'Desiree', age: 44, email: 'woo@example.com'}
];


describe('StTable directive', () => {
    let stInstance: SmartTable<User>;
    const createComponent = (template = `<div stTable #list="stTable">
<span>{{list.busy}}</span>
<ul>
  <li *ngFor="let item of list.items">{{ item.value.name }}</li>
</ul>
</div>`) => {
        const module = TestBed.configureTestingModule({
            declarations: [StTableHostComponent, StTableDirective],
            providers: [{
                provide: SmartTable, useValue: stInstance
            }]
        });
        TestBed.overrideComponent(StTableHostComponent, {
            set: {
                template
            }
        });
        const fixture = module.createComponent(StTableHostComponent);
        fixture.detectChanges();
        return fixture;
    };

    beforeEach(() => {
        stInstance = of(fixtureData);
    });

    it('should have rendered the items', done => {
        const fixture = createComponent();
        setTimeout(() => {
            fixture.detectChanges();
            const el: HTMLElement = fixture.nativeElement;
            const items = Array.from(el.querySelectorAll('li'));
            expect(items.length).toBe(3);
            expect(items.map(i => i.textContent.trim()))
                .toEqual([
                    'Bob',
                    'Albert',
                    'Raymond'
                ]);
            done();
        }, 25);
    });

   it('should have rendered the new items', done => {
        const fixture = createComponent();
        stInstance.use(newData);
        setTimeout(() => {
            fixture.detectChanges();
            const el: HTMLElement = fixture.nativeElement;
            const items = Array.from(el.querySelectorAll('li'));
            expect(items.length).toBe(2);
            expect(items.map(i => i.textContent.trim()))
                .toEqual([
                    'Alice',
                    'Desiree'
                ]);
            done();
        }, 25);
    });

    it('should re render the items when service emit display change event', done => {
        const fixture = createComponent();
        stInstance.sort({pointer: 'name'});

        setTimeout(() => {
            fixture.detectChanges();
            const el: HTMLElement = fixture.nativeElement;
            const items = Array.from(el.querySelectorAll('li'));
            expect(items.length).toBe(3);
            expect(items.map(i => i.textContent.trim()))
                .toEqual([
                    'Albert',
                    'Bob',
                    'Raymond'
                ]);
            done();
        }, 45);
    });

    it('should change busy state when service emit exec event', done => {
        const fixture = createComponent();
        setTimeout(() => {
            fixture.detectChanges();
            const busyIndicator: HTMLElement = fixture.nativeElement.querySelector('span');
            expect(busyIndicator.textContent).toEqual('false');
            stInstance.dispatch(StEvents.EXEC_CHANGED, {working: true});
            fixture.detectChanges();
            expect(busyIndicator.textContent).toEqual('true');
            stInstance.dispatch(StEvents.EXEC_CHANGED, {working: false});
            fixture.detectChanges();
            expect(busyIndicator.textContent).toEqual('false');
            done();
        }, 30);
    });

    it('should emit display event', done => {
        const fixture = createComponent(`<ul stTable (display)="handleEvent($event)"></ul>`);
        stInstance.sort({pointer: 'name'});
        setTimeout(() => {
            fixture.detectChanges();
            const component = fixture.componentInstance;
            expect(component.args).toEqual([
                {index: 1, value: {name: 'Albert', age: 40, email: 'woo@example.com'}},
                {index: 0, value: {name: 'Bob', age: 30, email: 'foo@bar.com'}},
                {index: 2, value: {name: 'Raymond', age: 35, email: 'nooo@bexample.com'}}
            ]);

            done();
        }, 45);
    });

    it('should emit sort event', done => {
        const fixture = createComponent(`<ul stTable (sort)="handleEvent($event)"></ul>`);
        stInstance.sort({pointer: 'name', direction: SortDirection.ASC});
        setTimeout(() => {
            fixture.detectChanges();
            const component = fixture.componentInstance;
            expect(component.args).toEqual({
                pointer: 'name',
                direction: SortDirection.ASC
            });
            done();
        }, 45);
    });

    it('should emit filter event', done => {
        const fixture = createComponent(`<ul stTable (filter)="handleEvent($event)"></ul>`);
        stInstance.filter({
            foo: [{operator: 'lt', value: 'bar'}]
        });
        setTimeout(() => {
            fixture.detectChanges();
            const component = fixture.componentInstance;
            expect(component.args).toEqual({
                foo: [{operator: 'lt', value: 'bar'}]
            });
            done();
        }, 45);
    });

    it('should emit the slice event', done => {
        const fixture = createComponent(`<ul stTable (slice)="handleEvent($event)"></ul>`);
        stInstance.slice({page: 1, size: 25});
        setTimeout(() => {
            fixture.detectChanges();
            const component = fixture.componentInstance;
            expect(component.args).toEqual({page: 1, size: 25});
            done();
        }, 45);
    });

    it('should emit the exec event', done => {
        const fixture = createComponent(`<ul stTable (exec)="handleEvent($event)"></ul>`);
        const component = fixture.componentInstance;
        stInstance.slice({page: 1, size: 25});
        setTimeout(() => {
            fixture.detectChanges();
            expect(component.args).toEqual({working: true});
        }, 10);

        setTimeout(() => {
            fixture.detectChanges();
            expect(component.args).toEqual({working: false});
            done();
        }, 45);
    });
});
