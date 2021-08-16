import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Router } from '@angular/router';
import { Md5 } from "md5-typescript";
export class Login {
  constructor(
    public email: string,
    public password: string
  ) { }

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any = new Login(null, null); 
  year : any = new Date().getFullYear();
  note: any;
  constructor( 
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.configService.token()) {
      this.router.navigate(['cms']);
    }else{
      console.log("Silakan Login!");
    }
  }

  onSubmit() { 

    const body = {
      email: this.login['email'],
      password: Md5.init(this.login['password']),
      device: 'android',
    }
    console.log(body);
    this.http.post<any>(environment.api + "login/signin/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data); 
        this.note = data['data']['note'];
        if (data['data']['login'] === true) {
          this.configService.setToken(data['data']['token']);
          this.configService.setObj(data['data']);
          //this.router.navigate(['cms']);
          window.location.reload();
        }

      },
      error => {
        console.log(error);
      },

    );
  }

}
