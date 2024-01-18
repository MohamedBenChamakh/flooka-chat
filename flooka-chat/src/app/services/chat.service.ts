import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Room } from "../models/Room";
import { Preferences } from "../models/Preferences";
import { Message } from "../models/Message";
import { io } from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class ChatService {

  constructor(private http: HttpClient) { 
  }

  getRoomsByUserId(): Observable<Room[]> {
    return this.http
      .get<Room[]>("/chatrooms");
  }

  getRoomById(roomId: string): Observable<Room> {
    return this.http
      .get<Room>(`/chatrooms/${roomId}`);
  }

  getMessagesByRoomId(roomId: string): Observable<Message[]> {
    return this.http
      .get<Message[]>(`/chatrooms/${roomId}/message`);
  }

  createRoom(preferences: Preferences): Observable<Room> {
    return this.http
      .post<Room>("/chatrooms", preferences);
  }

  matching(preferences: Preferences): Observable<number> {
    return this.http
      .post<number>("/chatrooms/find", preferences);
  }

  sendMessage(message: Message): Observable<Message> {
    return this.http
      .post<Message>(`/chatrooms/message`, message);
  }




}