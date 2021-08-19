import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { Md5 } from "md5-typescript";

declare var $ : any;

export class Model {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public access_right: string,
  ) { } 
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  items : any = [];
  model: any = new Model(0,"","","","");
  success : boolean = false;

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
        this.items =  data['items']; 
      },
      error => {
        console.log(error);
      },

    );
  }

  onUpdateSubmit(){
    this.model.password = Md5.init(this.model.password);
    const body = {
      data : this.model,
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

  back(){
     window.history.back();
  }

  logout(){
    this.http.get<any>(environment.api + "profile/logout", {
      headers: this.configService.headers()
    }).subscribe(
      data => {  
          this.configService.removeToken();
          this.router.navigate(['relogin']);
      },
      error => {
        console.log(error); 
      },

    );
  }
}
