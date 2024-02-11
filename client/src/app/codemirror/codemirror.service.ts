import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeEditorService {
  private editorContentSource = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  updateEditorContent(content: string) {
    this.editorContentSource.next(content);
  }

  getEditorContent() {
    return this.editorContentSource.asObservable();
  }
}
