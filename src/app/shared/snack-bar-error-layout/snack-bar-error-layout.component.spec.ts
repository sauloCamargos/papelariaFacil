import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarErrorLayoutComponent } from './snack-bar-error-layout.component';

describe('SnackBarErrorLayoutComponent', () => {
  let component: SnackBarErrorLayoutComponent;
  let fixture: ComponentFixture<SnackBarErrorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarErrorLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarErrorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
