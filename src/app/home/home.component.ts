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
  url : string;
  constructor( 
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit(): void {
  
    this.httpGet();
    this.user =  this.configService.getObj() || {name: 'User', house:'-'};
  }
  httpGet(){
    this.loading = true;
    this.http.get<any>(environment.api + "home/dashboard", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        this.loading = false;
        this.support = data['support'];
        this.url = data['url'];
        this.cms = data['cms'];
        console.log(data);
      },
      error => {
        console.log(error);
      },
    ); 
  }
  alert : boolean = false;
  loading : boolean = false;
  panic : any = [];
  onPanic(){
    if(confirm("Panic button ?")){
      this.loading = true;
      this.panic = "Calling...";
      this.http.get<any>(this.url).subscribe(
        data => { 
          console.log(data);
          this.loading = false;
          this.alert = true;
          this.panic = "Sudah diproses";
        console.info(data);
      },
      error => {
        console.log(error);
      },
     ); 
    }
  }

}
