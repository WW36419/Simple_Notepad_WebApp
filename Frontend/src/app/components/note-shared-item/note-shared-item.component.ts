import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsernamePipe } from '../../pipes/username.pipe';
import { SummaryPipe } from '../../pipes/summary.pipe';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'note-shared-item',
  imports: [UsernamePipe, SummaryPipe, CommonModule, RouterModule],
  providers: [UserService],
  templateUrl: './note-shared-item.component.html',
  styleUrl: './note-shared-item.component.css'
})
export class NoteSharedItemComponent implements OnInit {
  @Input() noteId?: string;
  @Input() ownerId?: string;
  @Input() title?: string;
  @Input() content?: string;
  @Input() shareType?: string;

  public recipients: Array<any> = [];

  constructor(private service: UserService) {}
  ngOnInit(): void {
    if (this.shareType === 'owner') {
      this.getRecipients()
    }
  }

  getRecipients(): void {
    const getShares = async () => {
      return new Promise((resolve, reject) =>
        this.service.getShares(this.noteId!).subscribe(
          (result: any) => resolve(result)
        )
      );
    }

    getShares().then((result: any) => {
      for (let i = 0; i < result.length; i++)
        this.recipients.push(result[i].recipientId)
    })
  }
}

