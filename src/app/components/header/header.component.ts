import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartproductcount: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.refreshCount();
  }

  public refreshCount() {
    if (localStorage.getItem("products") != null) {
      let cartproducts = JSON.parse(localStorage.getItem("products") || '{}');
      this.cartproductcount = cartproducts.length;
    }
  }
}
