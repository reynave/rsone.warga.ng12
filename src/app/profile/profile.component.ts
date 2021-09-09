import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Md5 } from "md5-typescript";

declare var $: any;

export class Model {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public ktp: string,
    public phone_1: string,
    public password: string,
    public access_right: string,
    public confirmPassword: string,
  ) { }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  asUpdate: boolean = false;
  asPasswordUpdate: boolean = false;
  items: any = [];
  model: any = new Model(0, "", "", "", "", "", "", "");
  success: boolean = false;
  rtRw: any = [];
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  getHttp() {
    this.http.get<any>(environment.api + "profile/index/", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.items = data['items'];
        this.rtRw = data['rtRw'];
      },
      error => {
        console.log(error);
      },

    );
  }

  onUpdateSubmit() {
    this.success = false; 
    const body = {
      data: this.model,
    }

    console.log(body);

    this.http.post<any>(environment.api + "profile/onProfileUpdate", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.info(data);
        //window.location.reload();
        this.success = true;
        this.model.password = '';
      },
      error => {
        console.log(error);
      },

    );
  }

  onUpdatePassword() {
    this.success = false;

    const body = {
      pass1: Md5.init(this.model.password),
      pass2: Md5.init(this.model.confirmPassword),
    } 
    console.log(body);
    if (body.pass1 == body.pass2) {
 
      this.http.post<any>(environment.api + "profile/onChangePassword", body, {
        headers: this.configService.headers()
      }).subscribe(
        data => {
          console.info(data);
          this.success = true;
          this.asPasswordUpdate = false;
          this.model.password = "";
          this.model.confirmPassword = "";
          alert("Password berhasil diubah.");
        },
        error => {
          console.log(error);
        }, 
      );
    
    }else{
      alert("Password tidak sama!");
    }
  }
  back() {
    window.history.back();


  }

  logout() {
    this.http.get<any>(environment.api + "profile/logout", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.configService.removeToken();
        this.router.navigate(['login']);
      },
      error => {
        console.log(error);
      },

    );
  }
}
