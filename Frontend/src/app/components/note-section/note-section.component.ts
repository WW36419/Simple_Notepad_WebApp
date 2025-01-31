import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NoteItemComponent } from '../note-item/note-item.component';
import { NoteDataService } from '../../services/note-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'note-section',
  standalone: true,
  imports: [NoteItemComponent, RouterModule],
  providers: [NoteDataService, AuthService],
  templateUrl: './note-section.component.html',
  styleUrl: './note-section.component.css'
})
export class NoteSectionComponent implements OnInit {
  public notes$: any;

  constructor(private service: NoteDataService, private auth: AuthService) {}

  ngOnInit(): void {
    this.getNotes()
  }

  getNotes() {
    const userId = this.auth.currentUser.userId;
    this.service.getNotes(userId).subscribe(response => {
      this.notes$ = response;
    })
  }
}
