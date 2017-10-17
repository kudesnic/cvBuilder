import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CvDataService }          from '../services/cv-data.service';
import { UserHttpService }          from '../services/userHttp.service';

@Component({
  selector: 'news',
  templateUrl: './newsHtml.html',
    providers: [UserHttpService, CvDataService],
})
export class NewsComponent implements OnInit{
    public currentPage:number = 1;
    public totalCount:number = 25;
    public perPage:number=25;
    @ViewChild('pagination-block') paginationBlock:any;
    constructor( private UserHttpService:UserHttpService, private activeRoute: ActivatedRoute,
                private router:Router){
    }
    public ngOnInit(page:number = null, id:any = null) {
        this.UserHttpService.get('news', id, page).subscribe((data : any) => {
            for(var i=0; i< data.items.length; i++){
                data.items[i].data =JSON.parse(data.items[i].data);
            }
          //  this.allResumes = data;
            this.totalCount = data._meta.totalCount;
            this.perPage = data._meta.perPage;
        });
        if(page == null)
            this.activeRoute.queryParams.subscribe(
                (queryParam: any) => {
                    if(queryParam['page'])
                    this.currentPage = queryParam['page'];
                }
            );
        else
            this.currentPage = page;
    }



    public viewPost(id:number){
        this.router.navigate(['news', id], { skipLocationChange: false})
    }
}
