import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAuthComponent } from './sales-auth.component';

describe('SalesAuthComponent', () => {
  let component: SalesAuthComponent;
  let fixture: ComponentFixture<SalesAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
