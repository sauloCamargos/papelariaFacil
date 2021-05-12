import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeQuoteComponent } from './make-quote.component';

describe('MakeQuoteComponent', () => {
  let component: MakeQuoteComponent;
  let fixture: ComponentFixture<MakeQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
