import { Component, OnInit } from '@angular/core';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { ApiService } from '../services/api.service';

@Component({
  providers:[SnackbarComponent],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  mycartproducts: any;
  baseurl = this.api.baseurl;
  subtotal = 0;

  constructor(private api: ApiService, private snackbar: SnackbarComponent) {

  }
  ngOnInit(): void {
    this.refresh();
  }

  refresh()
  {
    this.subtotal = 0;
    this.mycartproducts = new Array();
    if (localStorage.getItem("products") != null) {
      this.api.post("product/list", {}).subscribe((reply: any) => {
        let products = reply.data;
        for (let i = 0; i < products.length; i++) {
          let pid = products[i]._id;
          let cartproducts = JSON.parse(localStorage.getItem("products") || '{}');
          let exists = false;
          let quantity = 0;
          for (let j = 0; j < cartproducts.length; j++) {
            if (cartproducts[j].id == pid) {
              exists = true;
              quantity = cartproducts[j].quantity;
              break;
            }
          }
          if (exists) {
            products[i]["quantity"] = quantity;
            products[i]["total"] = products[i].price * quantity;
            this.subtotal += products[i]["total"];
            this.mycartproducts.push(products[i]);
          }
        }
        document.getElementById("spnCount")!.innerHTML = this.mycartproducts.length.toString();
      });
    }
    
  }

  changetotal(event:Event, pid:string)
  {
    this.subtotal = 0;
    let quantity = parseInt("0" + (<HTMLInputElement>event.target).value);
    for(let i = 0; i < this.mycartproducts.length; i++)
    {
      if(this.mycartproducts[i]._id == pid)
      {
        this.mycartproducts[i].quantity = quantity;
        this.mycartproducts[i].total = quantity * this.mycartproducts[i].price;
        this.subtotal += this.mycartproducts[i].total;
      }
    }
  }

  removeproduct(pid:string)
  {
    let newcartproducts = new Array();
    let cartproducts = JSON.parse(localStorage.getItem("products") || '{}');    
    for (let j = 0; j < cartproducts.length; j++) {
      if (cartproducts[j].id != pid) {
        newcartproducts.push(cartproducts[j]);
      }
    }    
    localStorage.setItem("products", JSON.stringify(newcartproducts));
    this.snackbar.show("Product removed from cart.", "green");
    this.refresh();
  }
}
