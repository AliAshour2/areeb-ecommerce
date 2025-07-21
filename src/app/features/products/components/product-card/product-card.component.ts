import { Component, inject, input, signal } from '@angular/core';
import { Products } from '../../../../shared/models/prodcuts.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe/truncate.pipe';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RoundedRatingPipe } from '../../../../shared/pipes/rounded-rating/rounded-rating.pipe';
import { HoverDirective } from '../../../../shared/directives/hover/hover.directive';
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { Router } from '@angular/router';
import { CartService } from '../../../cart/service/cart.service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { ButtonComponent } from "../../../../shared/components/button/button.component";


@Component({
  selector: 'app-product-card',
  imports: [TruncatePipe, CurrencyPipe, CommonModule, RoundedRatingPipe, HoverDirective, ModalComponent, ProductDetailsComponent, ButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  standalone: true,
})
export class ProductCardComponent {
  product = input<Products>();
  isModalOpen = signal<boolean>(false);

  cartServices = inject(CartService);
  toast = inject(ToastService);


  router = inject(Router);

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


  addToCart(event?: Event) {
    event?.stopPropagation();
    this.toast.showLoading("Adding Product To Cart");
    if (this.product()) {
      this.cartServices.addProductToCart(this.product()!._id).subscribe({
        next: (reponse) => {
          this.toast.showSuccess("Product added to cart");
        },
        error: (error) => {
          this.toast.showError("Try adding the product to cart agaim")
        }
      })
    }
  }
}
