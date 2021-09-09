import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../service/config.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    private router: Router,
    private configService: ConfigService, 
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.modalService.dismissAll();
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

  seeDetail(type: number){
    this.router.navigate(['/support/'],{ queryParams : { setSupportStatus : type }});
    // https://www.digitalocean.com/community/tutorials/angular-query-parameters-id
  }

  alert : boolean = false;
  loading : boolean = false;
  panic : any = [];
  onPanic(){
    if(confirm("Pangilan darurat ?")){
      this.loading = true;
      this.panic = "Sedang dikirim...";
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
