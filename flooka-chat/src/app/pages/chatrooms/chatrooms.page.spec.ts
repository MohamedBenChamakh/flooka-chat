import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatroomsPage } from './chatrooms.page';

describe('ChatroomsPage', () => {
  let component: ChatroomsPage;
  let fixture: ComponentFixture<ChatroomsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatroomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
