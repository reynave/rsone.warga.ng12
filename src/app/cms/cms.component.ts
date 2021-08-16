import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $ : any;

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

  items: any = [];

  constructor(

    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHttp(); 
  }

  getHttp() {
    this.http.get<any>(environment.api + "content/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.items =  data['items']; 
        $(document).ready(function() {
          $('#example').DataTable();
        });
      },
      error => {
        console.log(error);
      },

    );
  }


}
