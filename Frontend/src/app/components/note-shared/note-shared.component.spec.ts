import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSharedComponent } from './note-shared.component';

describe('NoteSharedComponent', () => {
  let component: NoteSharedComponent;
  let fixture: ComponentFixture<NoteSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteSharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
