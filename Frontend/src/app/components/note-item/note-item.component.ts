import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SummaryPipe } from '../../pipes/summary.pipe';
import { NoteDataService } from '../../services/note-data.service';

@Component({
  selector: 'note-item',
  imports: [CommonModule, SummaryPipe, RouterModule],
  providers: [NoteDataService],
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.css'
})
export class NoteItemComponent {
  @Input() noteId?: string;
  @Input() title?: string;
  @Input() content?: string;

  constructor(private service: NoteDataService) {}

  deleteNote() {
    this.service.deleteNoteShares(this.noteId!).subscribe((result: any) => {
      if (result.msg === 'OK') {
        this.service.deleteNote(this.noteId!).subscribe((result: any) => {
          if (result.msg === 'OK')
            location.reload();
          else
            alert("Błąd związany z usunięciem postu")
        })
      } else {
        alert("Błąd związany z usunięciem udostępnienia")
      }
    }
  )}
}
