import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CookieService } from 'src/app/services/cookie.service';
import { HeaderComponent } from '../header/header.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  providers:[HomeComponent, SnackbarComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any;
  baseurl:string = this.api.baseurl;

  constructor(private api:ApiService, private cookie:CookieService, private header: HeaderComponent, private snackbar: SnackbarComponent) { }

  ngOnInit(): void {
    this.api.post("product/list", {}).subscribe((reply:any)=>{
      this.products = reply.data;
    });
  }

  addtocart(pid:string)
  {
    let product = { id:pid, quantity:1 };
    let cartproducts = Array();
    if(localStorage.getItem("products") != null)
      cartproducts = JSON.parse(localStorage.getItem("products") || '{}');    
    let exists = false;
    cartproducts.forEach(cartproduct => {
      if(cartproduct.id == pid)
          exists = true;
    });
    if(!exists)
      cartproducts.push(product);    
    localStorage.setItem("products", JSON.stringify(cartproducts));
    if(exists)
    {
      this.snackbar.show("product already added to cart", "red");
    }
    else
    {
      this.snackbar.show("product added to cart", "green");
    }      
    document.getElementById("spnCount")!.innerHTML = cartproducts.length.toString();
    //this.header.refreshCount();
  }

}
