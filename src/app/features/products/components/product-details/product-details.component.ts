import { Component, input,  output } from '@angular/core';
import { Products } from '../../../../shared/models/prodcuts.model';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe/truncate.pipe';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RoundedRatingPipe } from '../../../../shared/pipes/rounded-rating/rounded-rating.pipe';
import { ModalComponent } from "../../../../shared/components/modal/modal.component";

@Component({
  selector: 'app-product-details',
  imports: [TruncatePipe, CurrencyPipe, CommonModule, RoundedRatingPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product = input<Products>();
  closeModal = output<void>();
}
