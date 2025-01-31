import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoteDataService } from '../../services/note-data.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'share-note',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  providers: [NoteDataService, UserService],
  templateUrl: './share-note.component.html',
  styleUrl: './share-note.component.css'
})
export class ShareNoteComponent implements OnInit {
  private noteId: string = '';
  private ownerId: string = '';
  public title: string = '';
  public content: string = '';
  public users: any;
  shareForm = new FormGroup({
    recipientIds: new FormControl(''),
  })

  constructor(private service: NoteDataService, private userService: UserService, private authService: AuthService, private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    this.ownerId = this.authService.currentUser.userId;
    this.route.paramMap.subscribe((params: any) => {
      this.noteId = params.get('id');
    });

    this.initPost();
    this.initUsers();
  }

  initPost() {
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

  initUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })
  }

  sendShare() {
    const recIds = this.shareForm.value.recipientIds;
    for (const recId of recIds!) {
      console.log(recId)
      this.userService.addShare(this.ownerId, recId, this.noteId).subscribe((result: any) => {
        if (result.msg === "OK")
          this.router.navigate(['/shared']);
        else
          alert("Nie udało przesłać notatki do jednego z użytkowników!")
      })
    }
    
  }
}
