import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  register: any;



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.warn(this.userForm.value);
    this.http.post('http://localhost:3000/api/v1/user/create_user', this.userForm.value).subscribe((response: any) => {
      console.log("User created");
      location.reload();
    }, error => {
      console.error(error);
    })
  }


}
