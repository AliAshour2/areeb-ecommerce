import { Component, signal } from '@angular/core';
import { ProductDetailsComponent } from "../../components/product-details/product-details.component";
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../../../shared/models/prodcuts.model';

@Component({
  selector: 'app-product-details-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css'
})
export class ProductDetailsPageComponent {
  product = signal<Products | undefined>(undefined);
  constructor(private route: ActivatedRoute) {
    this.product.set(this.route.snapshot.data['product']);
  }
}
