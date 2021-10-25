import { Component, OnInit } from '@angular/core';
import { FetchServiceService } from '../../service/fetch-service.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
   products;
  constructor(private fs:FetchServiceService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.fs.getProducts().subscribe(
      res => {
        if(res.success) {
          this.products = res.data;
        }
      },
      err=> {
        alert("error")
      }
    )
  }

}
