"use client";
import { useEffect, useState, useRef } from "react";
import { useUser, withSession } from "@clerk/nextjs";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { useGlobalState } from "../context/GlobalContextProvider";

const ChatContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  border: 3px solid ${(props) => props.theme.colorBg2};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: ${(props) => props.theme.colorBg};
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colorGrey4};
  border: 2px solid ${(props) => props.theme.colorGrey3};
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: ${(props) => props.theme.colorBg};
  border-top: 2px solid ${(props) => props.theme.colorGrey3};
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colorPurple};
  border-radius: 4px;
  margin-right: 10px;
  background-color: ${(props) => props.theme.colorBg};
  color: ${(props) => props.theme.colorWhite};
`;

const ChatSendButton = styled.button`
  background-color: ${(props) => props.theme.colorPurple};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.calendarBg2};
  }
`;

interface ChatMessage {
  // Create a type for chat messages
  sender: string;
  message: string;
}

const ChatPage = () => {
  // Create the ChatPage component
  const { user } = useUser(); // Get the logged in user from the Clerk session
  const [messages, setMessages] = useState<ChatMessage[]>([]); // Create state for the chat history
  const [input, setInput] = useState(""); // Create state for the input field
  const ws = useRef<WebSocket | null>(null); // Create a reference to the WebSocket connection
  const messagesEndRef = useRef<HTMLDivElement>(null); // Create a reference to the messages container element

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll to bottom whenever messages update

  // Function to initialize WebSocket connection
  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:3030"); // Create WebSocket connection

    ws.current.onopen = () => {
      // Function to handle WebSocket open event
      console.log("Connected to WebSocket server");
      if (ws.current) {
        ws.current.send(JSON.stringify({ type: "history" })); // Request chat history from the WebSocket server
      }
    };

    ws.current.onclose = () => {
      // Function to handle WebSocket close event
      console.log("WebSocket closed. Attempting to reconnect...");
      setTimeout(connectWebSocket, 3000); // Try to reconnect after 3 seconds
    };

    ws.current.onmessage = (e) => {
      // Function to handle WebSocket messages
      const processMessage = (messageData: string) => {
        // Function to process the message data
        try {
          const parsedMessage = JSON.parse(messageData); //  Parse the message data as JSON
          console.log("Received message:", parsedMessage);

          if (parsedMessage.type === "history") {
            console.log("History data:", parsedMessage.data);

            // Reverse the history data so that the most recent messages are at the end of the array
            const reversedHistory = parsedMessage.data.reverse();
            setMessages(reversedHistory);
          } else {
            // Get the sender name and message text from the parsed message
            const senderName = parsedMessage.name || "Unknown";
            const messageText = parsedMessage.text || "No message content";
            const newMessage: ChatMessage = {
              sender: senderName,
              message: messageText,
            }; // Create the message object
            setMessages((prevMessages) => [...prevMessages, newMessage]); // Add the new message to the chat history
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      if (e.data instanceof Blob) {
        // Check if the message is a Blob
        const reader = new FileReader(); // Create a FileReader
        reader.onload = function () {
          if (typeof reader.result === "string") {
            // Check if the result is a string
            processMessage(reader.result); // Process the message
          }
        };
        reader.readAsText(e.data); // Read the Blob as text
      } else {
        processMessage(e.data); // Process the message
      }
    };
  };

  useEffect(() => {
    if (user && (!ws.current || ws.current.readyState === WebSocket.CLOSED)) {
      // Check if the user is logged in and the WebSocket connection is closed
      connectWebSocket(); // Initialize WebSocket connection
    }
    return () => {
      if (ws.current) {
        // Check if the WebSocket connection exists
        ws.current.close(); // Close the WebSocket connection
      }
    };
  }, [user]);

  const sendMessage = () => {
    // Function to send a message to the WebSocket server
    if (
      input.trim() !== "" &&
      ws.current &&
      ws.current.readyState === WebSocket.OPEN
    ) {
      // Check if the input is not empty and the WebSocket connection is open
      const messageToSend = {
        name: user?.fullName || "Anonymous",
        text: input,
      }; // Create the message object
      ws.current.send(JSON.stringify(messageToSend)); // Send the message to the WebSocket server

      // Add the message to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: messageToSend.name, message: messageToSend.text },
      ]);

      // Clear the input field
      setInput("");
    }
  };

  const { theme } = useGlobalState();
  return (
    <ThemeProvider theme={theme}>
      <ChatContainer>
        <ChatMessages>
          {messages.map((msg, index) => (
            <Message key={index}>
              {msg.sender}: {msg.message}
            </Message>
          ))}
          <div ref={messagesEndRef} />
        </ChatMessages>
        <ChatInputContainer>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <ChatSendButton onClick={sendMessage}>Send</ChatSendButton>
        </ChatInputContainer>
      </ChatContainer>
    </ThemeProvider>
  );
};

export default withSession(ChatPage);
