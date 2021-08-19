import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../service/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any = [];
  support: any = [];
  cms: any = [];
  
  constructor( 
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit(): void {
    this.httpGet();
    this.user =  this.configService.getObj() || {name: 'User', house:'-'};
  }
  httpGet(){
    this.http.get<any>(environment.api + "home/dashboard", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.support = data['support'];
        this.cms = data['cms'];
        console.log(data);
      },
      error => {
        console.log(error);
      },
    ); 
  }

  onPanic(){
    if(confirm("Panic button ?")){
      const body = {
         token: this.configService.token(),
      }
      this.http.post<any>(environment.api + "panicbutton/index", body, {
         headers: this.configService.headers()
      }).subscribe(
        data => { 
        console.info(data);
      },
      error => {
        console.log(error);
      },
     ); 
    }
  }

}
