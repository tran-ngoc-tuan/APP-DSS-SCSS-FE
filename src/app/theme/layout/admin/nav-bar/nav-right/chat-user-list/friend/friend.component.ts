import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule để sử dụng trong component
import { RouterModule } from '@angular/router';  // Import RouterModule
interface friendsList {
  id: number;
  photo: string;
  name: string;
  new: number;
  status: number;
  time: string;
}
@Component({
  selector: 'app-friend',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.scss'
})
export class FriendComponent {
 // public props
 @Input() friends!: friendsList;
 @Output() ChatOn = new EventEmitter();

 // public method
 innerChatToggle(friends: friendsList) {
   this.ChatOn.emit(friends.id);
 }
}
