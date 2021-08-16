import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 

@Component({
  selector: 'app-relogin',
  templateUrl: './relogin.component.html',
  styleUrls: ['./relogin.component.css']
})
export class ReloginComponent implements OnInit {

  constructor( 
    private http: HttpClient,
    private configService: ConfigService, 
  ) { }

  ngOnInit(): void {
  }

  logout() {
    const body = {
      token: this.configService.token(),
    }
    console.log(body);
    this.http.post<any>(environment.api + "login/signout/", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        console.log(data);
        this.configService.removeToken();
        window.location.href = '/'; 
      },
      error => {
        console.log(error);
      },

    );
  }

}
