import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChatUserListComponent } from "./chat-user-list/chat-user-list.component";
import { ChatMsgComponent } from "./chat-msg/chat-msg.component";
import { CommonModule } from '@angular/common';  // Import CommonModule để sử dụng trong component
import { Router, RouterModule } from '@angular/router';
import { ConfigurationComponent } from "../../configuration/configuration.component";  // Import RouterModule

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [ChatUserListComponent, ChatMsgComponent, CommonModule, RouterModule, ConfigurationComponent],
  templateUrl: './nav-right.component.html',
  styleUrl: './nav-right.component.scss',
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export class NavRightComponent {
 // public props
 visibleUserList: boolean;
 chatMessage: boolean;
 friendId!: number;

 // constructor
 constructor(   private router: Router) {
   this.visibleUserList = false;
   this.chatMessage = false;
 }
 async goToIntroPage() {
  // Điều hướng đến AdminComponent (route '/home')
  const success = await this.router.navigate(['/intro-page']);
  if (success) {
    console.log('Chuyển hướng thành công đến IntroPage!');
    console.log('URL hiện tại:', this.router.routerState.snapshot.url);
  } else {
    console.error('Chuyển hướng không thành công!');
  }
}
 // public method
 onChatToggle(friendID: number) {
   this.friendId = friendID;
   this.chatMessage = !this.chatMessage;
 }
}