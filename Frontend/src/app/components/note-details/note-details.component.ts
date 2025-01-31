import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NoteDataService } from '../../services/note-data.service';

@Component({
  selector: 'note-details',
  standalone: true,
  imports: [HttpClientModule],
  providers: [NoteDataService],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent implements OnInit {
  public title: string = '';
  public content: string = '';

  constructor(private service: NoteDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id: string = '';
    this.route.paramMap.subscribe((params: any) => {
      id = params.get('id');
    });

    const getPost = async (noteId: string) => {
      return new Promise((resolve, reject) =>
        this.service.getNoteById(noteId).subscribe(
          (result: any) => resolve(result)
        )
      );
    }

    getPost(id).then((result: any) => {
      if (result.title) {
        this.title = result.title;
        this.content = result.content;
      }
    })
  }

  
}
