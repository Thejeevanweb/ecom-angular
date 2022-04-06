import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  show(message:string, color:string) {
    let x  = document.getElementById("snackbar");
    if(x != null){
    x.innerText = message;
    x.style.backgroundColor = color;
    x.className = "show";
    setTimeout(function(){ 
      let x = document.getElementById("snackbar");
      if(x != null)
        x.className = x.className.replace("show", ""); }, 3000);
    }
  }
}
