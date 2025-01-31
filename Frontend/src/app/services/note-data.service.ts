import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NoteDataService {
  private url = 'http://localhost:3100';

  constructor(private http: HttpClient) {}

  getNotes(userId: string) {
    return this.http.get(this.url + '/api/notes/' + userId)
  }

  getNoteById(noteId: string) {
    return this.http.get(this.url + '/api/note/' + noteId)
  }

  getRecipientNotes(userId: string) {
    return this.http.get(this.url + '/api/shared/recipient/' + userId)
  }

  getOwnerNotes(userId: string) {
    return this.http.get(this.url + '/api/shared/owner/' + userId)
  }

  addNote(userId: string, title: string, content: string) {
    const note = {
      "userId": userId,
      "title": title,
      "content": content
    }
    return this.http.post(this.url + '/api/note/', note)
  }

  editNote(noteId: string, title: string, content: string) {
    const editedData = {
      "title": title,
      "content": content
    }
    return this.http.put(this.url + '/api/note/' + noteId, editedData)
  }

  deleteNoteShares(noteId: string) {
    return this.http.delete(this.url + '/api/shares/' + noteId)
  }

  deleteNote(noteId: string) {
    return this.http.delete(this.url + '/api/note/' + noteId)
  }
}
