import App from './app';
import NoteController from "./controllers/note.controller";
import UserController from './controllers/user.controller';
import SharedNoteController from './controllers/shared-note.controller';

const app: App = new App([
    new NoteController(),
    new SharedNoteController(),
    new UserController()
]);

app.listen();