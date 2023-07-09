import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAddProductComponent } from './sales-add-product.component';

describe('SalesAddProductComponent', () => {
  let component: SalesAddProductComponent;
  let fixture: ComponentFixture<SalesAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesAddProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
