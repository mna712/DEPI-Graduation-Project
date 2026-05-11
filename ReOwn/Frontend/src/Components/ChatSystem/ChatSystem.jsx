import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


export default function ChatSystem() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();

  const [view, setView] = useState("chat"); 
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
const socketRef = useRef(null);
  //integrate with bckend to fetch product details using productId
 const [currentProduct, setCurrentProduct] =
  useState(null);

const currentUserId =
  JSON.parse(
    localStorage.getItem("user")
  )?._id;

  useEffect(() => {

  socketRef.current = io("http://localhost:3000", {

    auth: {
      token: localStorage.getItem("token"),
    },
  });

  socketRef.current.on("connect", () => {

    console.log("Socket connected");
  });

  socketRef.current.on("receiveMessage", (message) => {

    setMessages((prev) => [...prev, {
      ...message,
      isMine:
        message.sender._id === currentUserId,
    }]);
  });

  socketRef.current.on("typing", () => {

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  });

  return () => {

    socketRef.current.disconnect();
  };

}, [currentUserId]);

useEffect(() => {

  const fetchProduct = async () => {

    try {

      const response = await axios.get(
        `http://localhost:3000/api/products/${productId}`
      );

      setCurrentProduct(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  if (productId) {

    fetchProduct();
  }

}, [productId]);

useEffect(() => {

  const fetchConversations = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(

        "http://localhost:3000/api/chat/conversations",

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setConversations(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  fetchConversations();

}, []);

 useEffect(() => {

  const initializeConversation =
    async () => {

    if (!currentProduct) return;

    try {

      const token =
        localStorage.getItem("token");

      /*
      Find existing conversation
      */

      const existingConversation =
        conversations.find(

          (conv) =>

            conv.productId?._id ===
            productId
        );

      if (existingConversation) {

        openConversation(
          existingConversation
        );

        return;
      }

      /*
      Create new conversation
      */

      const response =
        await axios.post(

          "http://localhost:3000/api/chat/conversation",

          {
            receiverId:
              currentProduct.sellerId,

            productId,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const newConversation =
        response.data;

      setConversations((prev) => [

        newConversation,

        ...prev,
      ]);

      openConversation(
        newConversation
      );

    } catch (error) {

      console.log(error);
    }
  };

  if (
    conversations.length >= 0 &&
    currentProduct
  ) {

    initializeConversation();
  }

}, [
  productId,
  conversations,
  currentProduct,
]);

const getOtherMember = (
  conversation
) => {

  return conversation.members?.find(

    (member) =>

      member._id !== currentUserId
  );
};

const openConversation = async (
  conversation
) => {

  try {

    setSelectedConversation(conversation);

    setView("chat");

    socketRef.current.emit(
      "joinConversation",
      conversation._id
    );

    const token =
      localStorage.getItem("token");

    const response = await axios.get(

      `http://localhost:3000/api/chat/messages/${conversation._id}`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    const formattedMessages =
      response.data.map((msg) => ({

        ...msg,

        isMine:
          msg.sender._id === currentUserId,
      }));

    setMessages(formattedMessages);

  } catch (error) {

    console.log(error);
  }
};

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //load conversations from backend
  const Conversations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/conversations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } )
        return await response.json();
  }
  catch (error) {
      console.error("Error fetching conversations:", error);
    }
  }


  const sendMessage = () => {

  if (newMessage.trim() === "") return;

  socketRef.current.emit("sendMessage", {

    conversationId: selectedConversation._id,

    text: newMessage,
  });

  const localMessage = {

    _id: Date.now(),

    senderId: currentUserId,

    text: newMessage,

    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),

    isMine: true,
  };

  setMessages((prev) => [
    ...prev,
    localMessage,
  ]);

  setNewMessage("");
};

 const handleTyping = () => {

  if (!selectedConversation) return;

  socketRef.current.emit("typing", {

    conversationId:
      selectedConversation._id,
  });
};

const filteredConversations =
  conversations.filter((conv) =>

    getOtherMember(conv)
      ?.name
      ?.toLowerCase()
      .includes(
        searchQuery.toLowerCase()
      )
  );

if (!currentProduct) {

  return (
    <div>
      Loading...
    </div>
  );
}
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 p-4 bg-green-800">
        <button
          onClick={() => navigate("/product")}
          className="text-white transition-colors hover:text-yellow-400"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-white">Chat</h2>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations List - Sidebar */}
        <div
          className={`${
            view === "chat" ? "hidden md:block" : "block"
          } w-full md:w-80 bg-white border-r overflow-y-auto`}
        >
          {/* Search Bar */}
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-full outline-none focus:border-green-600"
            />
          </div>

          {/* Conversations */}
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="mb-2 text-6xl">💬</div>
              <p>No chats yet</p>
            </div>
          ) : (
            <div>
              {filteredConversations.map((conv) => (
                <button
                  key={conv._id}
                  onClick={() => openConversation(conv)}
                  className={`w-full p-4 border-b hover:bg-gray-50 transition-colors text-left ${
                    selectedConversation?._id === conv._id ? "bg-green-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-2xl bg-gray-200 rounded-full">
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">
                          {getOtherMember(conv)?.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {conv.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">
                          {conv.lastMessage}
                        </p>
                        {conv.unread > 0 && (
                          <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-green-600 rounded-full">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat Window */}
        <div
          className={`${
            view === "chat" ? "flex" : "hidden md:flex"
          } flex-1 flex-col bg-white`}
        >
          {!selectedConversation ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="mb-2 text-6xl">💬</div>
              <p>Select a conversation to start chatting</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setView("conversations")}
                    className="md:hidden"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                  </button>
                  <div className="flex items-center justify-center w-10 h-10 text-xl bg-gray-200 rounded-full">
                    {getOtherMember(selectedConversation)?.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {getOtherMember(selectedConversation)?.name}
                    </h3>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
              </div>

              {/* Product Info Card */}
              <div className="p-4 border-b bg-amber-50">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-lg">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">
                      {currentProduct.name}
                    </h4>
                    <p className="text-sm font-bold text-green-600">
                      {currentProduct.price}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/product/${productId}`)}
                    className="px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-full hover:bg-green-700"
                  >
                    See Ad
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <div className="mb-2 text-6xl">👋</div>
                    <p>Say hello to start the conversation!</p>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`mb-4 flex ${
                      msg.isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className={`max-w-xs md:max-w-md`}>
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          msg.isMine
                            ? "bg-green-600 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <p
                        className={`text-xs text-gray-500 mt-1 ${
                          msg.isMine ? "text-right" : "text-left"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1 px-4 py-2 bg-gray-200 rounded-bl-none rounded-2xl">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      handleTyping();
                    }}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 px-4 py-2 border rounded-full outline-none focus:border-green-600"
                  />
                  <button
                    onClick={sendMessage}
                    className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-green-600 rounded-full hover:bg-green-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>

                {/* Demo Mode */}
                <div className="p-3 mt-3 text-sm border-l-4 border-blue-400 rounded bg-blue-50">
                  <p className="font-medium text-blue-800">💡 Demo Mode</p>
                  <p className="mt-1 text-xs text-blue-700">
                    This is a demo. Connect Socket.IO backend for real-time
                    messaging.
                  </p>
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        const replyMsg = {
                          id: Date.now(),
                          senderId: currentProduct.sellerId,
                          text: `Hi! Thanks for your interest in ${currentProduct.name}. It's still available! 😊`,
                          time: new Date().toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          }),
                          isMine: false,
                        };
                        setMessages((prev) => [...prev, replyMsg]);
                      }, 1000);
                    }}
                    className="px-3 py-1 mt-2 text-xs font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
                  >
                    Simulate Seller Reply
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}