import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSharedItemComponent } from './note-shared-item.component';

describe('NoteSharedItemComponent', () => {
  let component: NoteSharedItemComponent;
  let fixture: ComponentFixture<NoteSharedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteSharedItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteSharedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
