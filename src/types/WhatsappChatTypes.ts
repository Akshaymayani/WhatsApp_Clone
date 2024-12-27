interface MessageSubtitle {
  message: string;
  tickmark?: boolean;
  markcount?: number;
  seen?: boolean;
}

export interface ChatItemTypes {
  id: number;
  disappear: boolean;
  group: boolean;
  date: string;
  name: string;
  Subtitle: MessageSubtitle;
  image: string;
}

export interface SubscribedChannelsType {
  id: number;
  name: string;
  description: string;
  imagePath: any;
  userImagePath: any;
  unreadCount: number;
  lastMessageTime: string;
}
