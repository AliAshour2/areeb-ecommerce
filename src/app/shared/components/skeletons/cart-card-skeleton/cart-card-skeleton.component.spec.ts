import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCardSkeletonComponent } from './cart-card-skeleton.component';

describe('CartCardSkeletonComponent', () => {
  let component: CartCardSkeletonComponent;
  let fixture: ComponentFixture<CartCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
