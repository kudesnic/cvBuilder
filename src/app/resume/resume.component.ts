import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CvDataService }          from '../services/cv-data.service';
import { UserHttpService }          from '../services/userHttp.service';

@Component({
  selector: 'resume',
  templateUrl: './resumeHtml.html',
    providers: [UserHttpService, CvDataService],
})
export class ResumeComponent implements OnInit{
  public myResumes:any[] = [] ;
  public allResumes:any[] = [] ;
    public currentPage:number = 1;
    public totalCount:number = 25;
    public perPage:number=25;
    @ViewChild('pagination-block') paginationBlock:any;
    constructor(private UserHttpService: UserHttpService, private CvDataService : CvDataService, private activeRoute: ActivatedRoute,
                private router:Router){
        this.getAllResumes();
    }

    public getMyResumes(page:number = null, id:any = null){
        this.UserHttpService.get('resumes/all-my-resumes', page, id).subscribe((data : any) => {
            for(var i=0; i< data.items.length; i++){
                data.items[i].data =JSON.parse(data.items[i].data);
                console.log('i', i);
            }
            this.myResumes=data;

        });
    }

    public getAllResumes(page:number = null, id:any = null) {
        this.UserHttpService.get('resumes/all-resumes', id, page).subscribe((data : any) => {
            for(var i=0; i< data.items.length; i++){
                data.items[i].data =JSON.parse(data.items[i].data);
                console.log('i', i);
            }
            this.allResumes = data;
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

    public ngOnInit(){
        this.getMyResumes();

    }
    public copyCVLink(){}
    public deleteCv(id:number){

        this.UserHttpService.delete('resumes/' + id).subscribe((data : any) => {
            if(!data){
                document.getElementById('cv-' + id).remove();
            }
        });
    }
    public viewCv(id:number){
        this.router.navigate(['resume', id], { skipLocationChange: false})
    }
}
