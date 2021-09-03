import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-relogin',
  templateUrl: './relogin.component.html',
  styleUrls: ['./relogin.component.css']
})
export class ReloginComponent implements OnInit {

  constructor( 
    private http: HttpClient,
    private configService: ConfigService, 
    private router: Router,
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
        this.router.navigate(['login']);
      },
      error => {
        console.log(error);
      },

    );
  }

}
