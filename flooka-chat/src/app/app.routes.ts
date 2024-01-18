import { Routes } from '@angular/router';
import { ChatroomComponent } from './pages/chatroom/chatroom.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { AuthGuard } from './guards/guard';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'chatroom/:id',
                component: ChatroomComponent
            }
        ]
    },
    {
        path: 'auth',
        component: LoginComponent,
        children: []
    },
    
];
