import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.css']
})
export class EditUserDetailsComponent implements OnInit {

  editUserDetails = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.data);
    this.fillUserDetils(this.data);
  }

  fillUserDetils(details: any) {
    this.editUserDetails.controls.firstName.setValue(details.first_name);
    this.editUserDetails.controls.lastName.setValue(details.last_name);
    this.editUserDetails.controls.email.setValue(details.email);
  }

  editUser() {
    const userDetails = {
      id: this.data.id,
      first_name: this.editUserDetails.value.firstName,
      last_name: this.editUserDetails.value.lastName,
      email: this.editUserDetails.value.email
    }
    this.http.put('http://127.0.0.1:3000/api/v1/user/edit_user', userDetails).subscribe((response: any) => {
      console.log("edit api completed");
    })
  }
}
