import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-cms-detail',
  templateUrl: './cms-detail.component.html',
  styleUrls: ['./cms-detail.component.css']
})
export class CmsDetailComponent implements OnInit {

  items: any = [];
  obj: any = [];
  getId: string = "";
category : string = "Loading...";
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getId = this.activatedRoute.snapshot.params.id;
    console.info(this.getId);
    this.getHttp();
  }

  getHttp() {
    let getId = localStorage.getItem('getId');
    if(getId != ''){
    this.http.get<any>(environment.api + "content/detail/"+this.getId, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.category = data['category'];
        this.items = data['item'];
      },
      error => {
        console.log(error);
      },

    );
    }
  }

  back(){
    window.history.back();
  }

}
