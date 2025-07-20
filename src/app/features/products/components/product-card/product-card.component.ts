import { Component, input, signal } from '@angular/core';
import { Products } from '../../../../shared/models/prodcuts.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe/truncate.pipe';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RoundedRatingPipe } from '../../../../shared/pipes/rounded-rating/rounded-rating.pipe';
import { HoverDirective } from '../../../../shared/directives/hover/hover.directive';
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { ProductDetailsComponent } from "../product-details/product-details.component";


@Component({
  selector: 'app-product-card',
  imports: [TruncatePipe, CurrencyPipe, CommonModule, RoundedRatingPipe, HoverDirective, ModalComponent, ProductDetailsComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  standalone : true,
})
export class ProductCardComponent {
  product = input<Products>();
  isModalOpen = signal<boolean>(false);

  openProductModal() {
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
  }
}
