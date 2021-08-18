import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Md5 } from "md5-typescript";
export class Login {
  constructor(
    public password: string
  ) { }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  login: any = new Login(null);
  note: string;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.activatedRoute.snapshot.queryParams['t']) {
      this.note = "ERROR!"; 
      
    } else { 
      
      var uname = new String(this.login['password']);
      const body = {
        password: Md5.init(this.login['password']),
        device: 'PC',
        requestKey: this.activatedRoute.snapshot.queryParams['t'],
      }
      this.note = "";

      if (uname.length >= 6) {
        this.http.post<any>(environment.api + "login/renewpassword/", body, {
          headers: this.configService.headers()
        }).subscribe(
          data => {
            console.log(data);
            this.note = data['note'];
            setTimeout(() => {                           // <<<---using ()=> syntax
              window.location.href = "#login";
            }, 2000);
          },
          error => {
            console.log(error);
          },

        );
      } else {
        this.note = "Password length must be 6 character!";
      }
    }
  }

}
