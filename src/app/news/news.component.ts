import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CvDataService }          from '../services/cv-data.service';
import { UserHttpService }          from '../services/userHttp.service';

@Component({
  selector: 'news',
  templateUrl: './newsHtml.html',
    styleUrls:['./news.component.css',],
    providers: [UserHttpService, CvDataService],
})
export class NewsComponent implements OnInit{
    public currentPage:number = 1;
    public totalCount:number = 25;
    public perPage:number=25;
    public news:any[];
    public itemId:number;
    subscription:any;
    post:any;
    @ViewChild('pagination-block') paginationBlock:any;
    constructor( private UserHttpService:UserHttpService, private activeRoute: ActivatedRoute,
                private router:Router){

        this.activeRoute.queryParams.subscribe(params => {
                if (params['page'])
                {
                    this.getAllNews(parseInt(params['page']));
                }
                else
                    this.getAllNews();
            }
        );

        this.subscription = activeRoute.paramMap.subscribe(ParamsAsMap =>{
            this.itemId = parseInt(ParamsAsMap.get('id'));
            console.log(this.itemId);

            if(this.itemId)
                this.getOnePost();
        });
    }



    public ngOnInit() {
    }
    public getAllNews(page:number = null, id:any = null){
        if(page)
            this.router.navigate(['/news'], { queryParams: { page:page } });
        this.UserHttpService.get('news', id, page).subscribe((data : any) => {
            this.news = data;
            this.totalCount = data._meta.totalCount;
            this.perPage = data._meta.perPage;
            if(page)
                this.currentPage  =  page;
        });

    }

    public getOnePost(){
        this.router.navigate(['news', this.itemId]);
        this.UserHttpService.get('news/' +  this.itemId ).subscribe((data : any) => {
            console.log(data);
            this.post = data;
        });
    }

    public viewPost(id:number){
        this.router.navigate(['news', id], { skipLocationChange: false})
    }
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }


    public rhtmlspecialchars(str:any) {
    if (typeof(str) == "string") {
        str = str.replace(/&gt;/ig, ">");
        str = str.replace(/&lt;/ig, "<");
        str = str.replace(/&#039;/g, "'");
        str = str.replace(/&quot;/ig, '"');
        str = str.replace(/&amp;/ig, '&'); /* must do &amp; last */
    }
    return str;
}
}
