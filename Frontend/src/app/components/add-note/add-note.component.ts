import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import { Router } from '@angular/router';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { NoteDataService } from '../../services/note-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'add-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [NoteDataService, AuthService],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {
  noteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  })

  constructor(private data: NoteDataService, private auth: AuthService, public router: Router) {}

  sendNote() {
    const note = this.noteForm.value
    const userId = this.auth.currentUser.userId
    this.data.addNote(userId, note.title!, note.content!).subscribe((result: any) => {
      console.log(JSON.stringify(result))
      if (result.msg === "OK")
        this.router.navigate(['/notes']);
      else
        alert("Nie udało się wysłać postu!")
    })
  }
}
