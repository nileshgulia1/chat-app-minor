import React from 'react';

import ChatroomPreview from './ChatroomPreview'

export default ({
  chatrooms,
  onEnterChatroom
}) => (
  <div>
      <h2><pre> Choose your chat room!</pre></h2>   
    { 
      chatrooms.map(chatroom => (
        <ChatroomPreview
          key={chatroom.name}
          chatroom={chatroom}
          onEnter={() => onEnterChatroom(chatroom.name)}
        />
      ))
    }
  </div>
)
