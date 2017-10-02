import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CvDataService }          from '../services/cv-data.service';
import { UserHttpService }          from '../services/userHttp.service';

@Component({
  selector: 'resume',
  templateUrl: './resumeHtml.html',
    providers: [UserHttpService, CvDataService],
})
export class ResumeComponent implements OnInit{
  public myResumes:any[] ;
  public allResumes:any[] ;
    public currentPage:number = 1;
    public totalCount:number = 25;
    public perPage:number=25;
    @ViewChild('pagination-block') paginationBlock:any;
    constructor(private UserHttpService: UserHttpService, private CvDataService : CvDataService, private route: ActivatedRoute){
        this.getAllResumes();
    }

    public getMyResumes(page:number = null, id:any = null){
        this.UserHttpService.get('resumes/all-my-resumes', page, id).subscribe((data : any) => {this.myResumes=data;console.log(data) });
    }

    public getAllResumes(page:number = null, id:any = null) {
        console.log(page + ' page');
        this.UserHttpService.get('resumes/all-resumes', page, id).subscribe((data : any) => {
            console.log(data);
            this.allResumes = data;
            this.totalCount = data._meta.totalCount;
            this.perPage = data._meta.perPage;
        });
        if(page == null)
            this.route.queryParams.subscribe(
                (queryParam: any) => {
                    if(queryParam['page'])
                    this.currentPage = queryParam['page'];
                }
            );
        else
            this.currentPage = page;
    }

    public ngOnInit(){
        this.getMyResumes();

    }
    public copyCVLink(){}
    public deleteCv(){}
    public editCV(){}
}
