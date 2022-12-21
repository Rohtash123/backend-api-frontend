import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDetailsComponent} from "./edit-user-details/edit-user-details.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'backend-api-frontend';
  apiUrl = 'http://127.0.0.1:3000/api/v1/user/index'
  apiData:any;


  constructor(private http: HttpClient, private dialog: MatDialog)
  {
  }
  ngOnInit(){
    this.fetchUserDetails();
  }


  fetchUserDetails() {
    this.http.get(this.apiUrl).subscribe((data:any)=>{
      console.warn(data)
      this.apiData=data.data;
    })
  }

  deleteUser(item: any) {
    console.log(item);
    alert("Hey Rohtas, are you really want to delete this item ?")
    this.http.delete('http://127.0.0.1:3000/api/v1/user/delete_user', {body: item}).subscribe((response: any) => {
      console.log("Item deleted");
      location.reload();
    })
  }



  editUser(item: any){
    const dialogRef = this.dialog.open(EditUserDetailsComponent, {
      data: item
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchUserDetails();
    })
  }


}
