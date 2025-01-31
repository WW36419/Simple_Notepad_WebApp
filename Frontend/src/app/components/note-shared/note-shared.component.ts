import { Component, OnInit } from '@angular/core';
import { NoteSharedItemComponent } from '../note-shared-item/note-shared-item.component';
import { NoteDataService } from '../../services/note-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'note-shared',
  standalone: true,
  imports: [NoteSharedItemComponent],
  providers: [NoteDataService, AuthService],
  templateUrl: './note-shared.component.html',
  styleUrl: './note-shared.component.css'
})
export class NoteSharedComponent implements OnInit {
  public own_notes$: any;
  public rec_notes$: any;

  constructor(private service: NoteDataService, private auth: AuthService) {}

  ngOnInit(): void {
    const userId = this.auth.currentUser.userId;
    this.getNotes(userId)
  }

  getNotes(userId: string) {
    this.service.getOwnerNotes(userId).subscribe(response => {
      this.own_notes$ = response;
    })
    this.service.getRecipientNotes(userId).subscribe(response => {
      this.rec_notes$ = response;
    })
  }
}

