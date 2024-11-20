import { Component, EventEmitter, Output } from '@angular/core';
import { FriendsList } from '../../../../../../fack-db/friends-list';
import { FriendComponent } from "./friend/friend.component";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Thêm FormsModule

@Component({
  selector: 'app-chat-user-list',
  standalone: true,
  imports: [FriendComponent, NgScrollbarModule,CommonModule,FormsModule],
  templateUrl: './chat-user-list.component.html',
  styleUrl: './chat-user-list.component.scss'
})
export class ChatUserListComponent {
 // public props
 @Output() ChatCollapse = new EventEmitter();
 @Output() ChatToggle = new EventEmitter();
 searchFriends!: string;
 // eslint-disable-next-line
 friendsList: any = FriendsList.friends;

 // public method
 ChatOn() {
   this.ChatToggle.emit();
 }
}

