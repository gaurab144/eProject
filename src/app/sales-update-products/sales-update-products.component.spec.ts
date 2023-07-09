import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesUpdateProductsComponent } from './sales-update-products.component';

describe('SalesUpdateProductsComponent', () => {
  let component: SalesUpdateProductsComponent;
  let fixture: ComponentFixture<SalesUpdateProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesUpdateProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesUpdateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
