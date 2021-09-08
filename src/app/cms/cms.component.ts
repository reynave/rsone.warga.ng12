import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 

export class Model {
  constructor(
    public id: number,
    public name: string,
    public content: string,
    public status: number,
  ) { } 
}

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {
  getId : string = "";
  items: any = [];
  category : string = "Loading...";
  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getId = this.activatedRoute.snapshot.params.id;
    this.getHttp( this.getId );  
    
  }

  getHttp(getId) {
    this.http.get<any>(environment.api + "content/index/"+getId, {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.category  = data['category'];
        this.items =  data['items'];  
      },
      error => {
        console.log(error);
      },

    );
  }

  back(){
    window.history.back();
  }


}
