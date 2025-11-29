import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// Mock conversations data
const mockConversations = [
  {
    id: 1,
    userName: "Somaya",
    lastMessage: "Is it still available?",
    time: "2:35 pm",
    avatar: "👸",
    productId: 1,
    unread: 2,
  },
  {
    id: 2,
    userName: "Ahmed",
    lastMessage: "What's the condition?",
    time: "1:20 pm",
    avatar: "👤",
    productId: 1,
    unread: 0,
  },
  {
    id: 3,
    userName: "Mona",
    lastMessage: "Can we meet today?",
    time: "Yesterday",
    avatar: "👩",
    productId: 2,
    unread: 1,
  },
  {
    id: 4,
    userName: "Omar",
    lastMessage: "I'll take it!",
    time: "Yesterday",
    avatar: "👷‍♂️",
    productId: 1,
    unread: 0,
  },
];

const mockMessages = [
  {
    id: 1,
    senderId: 2,
    text: "Hello, is this available?",
    time: "2:30 pm",
    isMine: false,
  },
  {
    id: 2,
    senderId: 1,
    text: "Yes, still available!",
    time: "2:31 pm",
    isMine: true,
  },
  {
    id: 3,
    senderId: 2,
    text: "Is it still available?",
    time: "2:35 pm",
    isMine: false,
  },
];

export default function ChatSystem() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();

  const [view, setView] = useState("chat"); 
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  
  const productData = location.state || {};
  const currentProduct = {
    id: productId,
    name: productData.productName || "iPhone 13 Pro Max",
    price: productData.productPrice || "30,500 EGP",
    image:
      productData.productImage ||
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400",
    sellerId: productData.sellerId || 2,
    sellerName: productData.sellerName || "Seller",
  };

  const currentUserId = 1; 


  useEffect(() => {
    console.log("Product ID from URL:", productId);
    console.log("Product Data:", productData);

    
    const existingConversation = conversations.find(
      (conv) => conv.productId === parseInt(productId)
    );

    if (existingConversation) {
     // open the exist chat 
      openConversation(existingConversation);
    } else {
      //create new chat
      const newConversation = {
        id: Date.now(),
        userName: currentProduct.sellerName,
        lastMessage: "Start chatting...",
        time: "Now",
        avatar: "👤",
        productId: parseInt(productId),
        unread: 0,
      };
      setConversations((prev) => [newConversation, ...prev]);
      openConversation(newConversation);
    }
  }, [productId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const openConversation = (conversation) => {
    setSelectedConversation(conversation);
    setMessages(mockMessages);
    setView("chat");
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: Date.now(),
      senderId: currentUserId,
      text: newMessage,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMine: true,
      conversationId: selectedConversation?.id,
    };

    setMessages([...messages, message]);
    setNewMessage("");

    /* Socket.IO Integration:
    socket.emit('sendMessage', {
      conversationId: selectedConversation.id,
      message
    });
  */
  };

  const handleTyping = () => {
    // socket.emit('typing', {...});
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  key={conv.id}
                  onClick={() => openConversation(conv)}
                  className={`w-full p-4 border-b hover:bg-gray-50 transition-colors text-left ${
                    selectedConversation?.id === conv.id ? "bg-green-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-2xl bg-gray-200 rounded-full">
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">
                          {conv.userName}
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
                    {selectedConversation.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {selectedConversation.userName}
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
                    key={msg.id}
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
