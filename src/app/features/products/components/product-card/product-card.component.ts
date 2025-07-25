import { Component, inject, input, signal, output } from '@angular/core';
import { Products } from '../../../../shared/models/prodcuts.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe/truncate.pipe';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RoundedRatingPipe } from '../../../../shared/pipes/rounded-rating/rounded-rating.pipe';
import { HoverDirective } from '../../../../shared/directives/hover/hover.directive';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-product-card',
  imports: [
    TruncatePipe,
    CurrencyPipe,
    CommonModule,
    RoundedRatingPipe,
    HoverDirective,
    ModalComponent,
    ProductDetailsComponent,
    ButtonComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  standalone: true,
})
export class ProductCardComponent {
  product = input<Products>();
  isModalOpen = signal<boolean>(false);
  showLoginModal = signal<boolean>(false);
  addToCart = output<{ productId: string }>();
  toggleWishlist = output<{ productId: string }>();
  onRemoved = output<{ productId: string }>();
  isInWishlist = input<boolean>(false);
  private router = inject(Router);

  openProductModal() {
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
  }

  goToDetails(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.product()) {
      this.router.navigate(['/products', this.product()!.id]);
    }
  }

  goToSignIn() {
    this.router.navigate(['/sign-in-page']);
    this.showLoginModal.set(false);
  }

  onAddToCart(event?: Event) {
    event?.stopPropagation();
    if (this.product()) {
      this.addToCart.emit({ productId: this.product()!.id });
    }
  }

  onToggleWishlist(event?: Event) {
    event?.stopPropagation();
    if (this.product()) {
      this.toggleWishlist.emit({ productId: this.product()!.id });
    }
  }
}
