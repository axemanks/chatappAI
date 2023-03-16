import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Ai from "@/components/customMessageForms/Ai";
import Header from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
import AiCode from "@/components/customMessageForms/AiCode";
import AiAssist from "@/components/customMessageForms/AiAssist";


const Chat = ({user, secret}) => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,  // import VITE_PROJECT_ID from .env
    user,
    secret,
  );

  return (
    <div style={{ flexBasis: "100%"}}>  
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
      style={{ height: "100vh" }} // use whole screen
      renderChatHeader={(chat) => <Header chat={chat} />}
      renderMessageForm={(props) => {
        if (chatProps.chat?.title.startsWith("AIChat_")) {
          return <Ai props={props} activeChat={chatProps.chat} /> // checks name of chat and if it starts with "AIChat"
        }
        if (chatProps.chat?.title.startsWith("AICode_")) {
          return <AiCode props={props} activeChat={chatProps.chat} /> // checks name of chat and if it starts with "AICode"
        }
        if (chatProps.chat?.title.startsWith("AIAssist_")) {
          return <AiAssist props={props} activeChat={chatProps.chat} /> // checks name of chat and if it starts with "AIChat"
        }

        return (
          <StandardMessageForm props={props} activeChat={chatProps.chat} />
        );
      }}
      />
  </div>
  );
};

export default Chat;
