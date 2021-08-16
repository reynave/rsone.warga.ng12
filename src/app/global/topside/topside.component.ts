import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/service/config.service'; 
 

@Component({
  selector: 'app-topside',
  templateUrl: './topside.component.html',
  styleUrls: ['./topside.component.css']
})
export class TopsideComponent implements OnInit {
  active : string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,  
  ) { 
   }

  ngOnInit(): void {
    this.active = this.activatedRoute.snapshot.data.active; 
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
