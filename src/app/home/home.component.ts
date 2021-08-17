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

  constructor( 
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit(): void {
    this.httpGet();
  }
  httpGet(){
    this.http.get<any>(environment.api + "home/", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data);
      },
      error => {
        console.log(error);
      },
    ); 
  }

  onPanic(){
    if(confirm("Panic Buttom ?")){
      console.log("Panic Botton");
    }
  }

}
