import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { NoteDataService } from '../../services/note-data.service';

@Component({
  selector: 'edit-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [NoteDataService],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css'
})
export class EditNoteComponent implements OnInit {
  private noteId: string = '';
  public title: string = '';
  public content: string = '';
  editForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  })

  constructor(private service: NoteDataService, public router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.noteId = params.get('id');
    });

    const getPost = async (noteId: string) => {
      return new Promise((resolve, reject) =>
        this.service.getNoteById(noteId).subscribe(
          (result: any) => resolve(result)
        )
      );
    }

    getPost(this.noteId).then((result: any) => {
      if (result.title) {
        this.title = result.title;
        this.content = result.content;
      }
    })
  }

  sendEditedNote() {
    const note = this.editForm.value
    this.service.editNote(this.noteId, note.title!, note.content!).subscribe((result: any) => {
      if (result.msg === "OK")
        this.router.navigate(['/notes']);
      else
        alert("Nie udało się edytować notatki!")
    })
  }
}
