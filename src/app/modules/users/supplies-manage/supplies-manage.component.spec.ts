import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesManageComponent } from './supplies-manage.component';

describe('SuppliesManageComponent', () => {
  let component: SuppliesManageComponent;
  let fixture: ComponentFixture<SuppliesManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
