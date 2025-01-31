import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path:"",
        loadComponent: () => import('./components/homepage/homepage.component')
            .then(m => m.HomepageComponent)
    },
    {
        path:"login",
        loadComponent: () => import('./components/login/login.component')
            .then(m => m.LoginComponent)
    },
    {
        path:"signup",
        loadComponent: () => import('./components/signup/signup.component')
            .then(m => m.SignupComponent)
    },
    {
        path:"notes",
        loadComponent: () => import('./components/note-section/note-section.component')
            .then(m => m.NoteSectionComponent),
        canActivate: [authGuard]
    },
    {
        path:"shared",
        loadComponent: () => import('./components/note-shared/note-shared.component')
            .then(m => m.NoteSharedComponent),
        canActivate: [authGuard]
    },
    {
        path:"notes/add-note",
        loadComponent: () => import('./components/add-note/add-note.component')
            .then(m => m.AddNoteComponent),
        canActivate: [authGuard]
    },
    {
        path:"note/:id",
        loadComponent: () => import('./components/note-details/note-details.component')
            .then(m => m.NoteDetailsComponent),
        canActivate: [authGuard]
    },
    {
        path:"note/edit/:id",
        loadComponent: () => import('./components/edit-note/edit-note.component')
            .then(m => m.EditNoteComponent),
        canActivate: [authGuard]
    },
    {
        path:"note/share/:id",
        loadComponent: () => import('./components/share-note/share-note.component')
            .then(m => m.ShareNoteComponent),
        canActivate: [authGuard]
    },
];
