import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ChatUserListComponent } from "./chat-user-list/chat-user-list.component";
import { ChatMsgComponent } from "./chat-msg/chat-msg.component";
import { CommonModule } from '@angular/common';  // Import CommonModule để sử dụng trong component
import { RouterModule } from '@angular/router';  // Import RouterModule

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [ChatUserListComponent, ChatMsgComponent,CommonModule,RouterModule],
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
 constructor() {
   this.visibleUserList = false;
   this.chatMessage = false;
 }

 // public method
 onChatToggle(friendID: number) {
   this.friendId = friendID;
   this.chatMessage = !this.chatMessage;
 }
}