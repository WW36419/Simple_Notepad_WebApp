import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3100/api';

  constructor(private http: HttpClient) {}


  getUsers() {
    return this.http.get(this.url + '/users')
  }

  getUsername(userId: string) {
    return this.http.get(this.url + '/username/' + userId)
  }

  getShares(noteId: string) {
    return this.http.get(this.url + '/share/recipients/' + noteId)
  }

  addShare(ownerId: string, recipientId: string, noteId: string) {
    const share = {
      "ownerId": ownerId,
      "recipientId": recipientId,
      "noteId": noteId
    };
    return this.http.post(this.url + '/share', share)
  }
}
