import styles from "../styles/chat.module.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Chat, Message } from "@/types";
import { Sidebar, Topbar } from "@/components";
import socket from "@/socket";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

const Dashboard = () => {
  const [usersChats, setUsersChats] = useState<Chat[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat>();

  useEffect(() => {
    const fetchChats = async () => {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_URL + "/chats"
      );
      console.log(response.data);

      console.log(response.data[0].chatId);

      setUsersChats(response.data as Chat[]);
      console.log(usersChats);

      setSelectedChat(response.data[0]);
      const messages = await axios.get(
        process.env.NEXT_PUBLIC_SERVER_URL + "/chats/" + response.data[0].chatId
      );
      console.log(messages.data.messages);

      setChatMessages(messages.data.messages as Message[]);
    };
    fetchChats();
  }, []);

  useEffect(() => {
    console.log("Chat Messages:", chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    //If user creates a new chat
    socket.on("chatCreated", (chat: Chat) => {
      setUsersChats((prevChats) => [...prevChats, chat]);
    });

    return () => {
      socket.off("chatCreated");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const fd = new FormData();
      fd.append("chatId", selectedChat.chatId.toString());
      socket.emit("join", fd);

      // If user sends a new message
      socket.on("newMessage", (message: Message) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("newMessage");
        const fd = new FormData();
        fd.append("chatId", selectedChat.chatId.toString());
        socket.emit("leave", fd);
      };
    }
  }, [selectedChat]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 10 * 31);
      textareaRef.current.style.height = `${newHeight}px`;
      const container = textareaRef.current.parentElement;
      if (container) {
        container.parentElement!.style.height = "auto";
        container.parentElement!.style.height = `${
          container.parentElement!.scrollHeight
        }px`;
        container.parentElement!.style.marginTop = `-${newHeight - 24}px`;
      }
    }
  }, [message]);

  const handleChangeChat = async (chat: Chat) => {
    const messages = await axios.get(
      process.env.NEXT_PUBLIC_SERVER_URL + "/chats/" + chat.chatId
    );
    setChatMessages(messages.data);
    setSelectedChat(chat);
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    const lines = input.split("\n");
    if (lines.length <= 10) {
      setMessage(input);
    } else {
      setMessage(lines.slice(0, 10).join("\n"));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      const lines = message.split("\n");
      if (lines.length >= 10) {
        e.preventDefault();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  async function handleSend() {
    if (message.trim() === "") {
      return;
    }
    const newMessage: Message = {
      content: message,
      isNote: false,
      isSupportSender: true,
      chatId: selectedChat!.chatId,
      timeStamp: new Date(),
      messageId: 0,
    };
    if (selectedChat) {
      const fd = new FormData();
      fd.append("chatId", selectedChat.chatId.toString());
      fd.append("content", message);
      fd.append("isNote", "false");
      fd.append("isSupportSender", "true");
      fd.append("timeStamp", newMessage.timeStamp.toISOString());
      setChatMessages([...chatMessages, newMessage]);
      socket.emit("message", fd);
      setMessage("");
    }
  }

  return (
    <div id="wrapper" className="d-flex">
      <Sidebar />
      <div
        id="content-wrapper"
        className="d-flex flex-column"
        style={{
          width: "100%",
          backgroundColor: "#f8f9fc",
          overflow: "hidden",
        }}
      >
        <div id="content" style={{ flex: "1 0 auto" }}>
          <Topbar />

          <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
              <h3 className="text-dark mb-0">Dashboard</h3>
            </div>
          </div>

          <div
            className={`card ${styles["chat-app"]}`}
            style={{
              textAlign: "left",
              border: "1px solid rgba(0, 0, 0, .125)",
            }}
          >
            <div id="plist" className={styles["people-list"]}>
              <ul className={`list-unstyled ${styles["chat-list"]} mt-2 mb-0`}>
                {usersChats &&
                  usersChats.map((chat, index) => {
                    return (
                      <li
                        key={index}
                        className={`${styles["clearfix"]} `}
                        onClick={() => handleChangeChat(chat)}
                      >
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt="avatar"
                        />
                        <div className={styles.about}>
                          <div className={styles.name}>
                            <span>userName</span>
                          </div>
                          <div className={styles.status}>
                            <i
                              className={`fa fa-circle ${
                                chat.isOpen
                                  ? styles["online"]
                                  : styles["offline"]
                              }`}
                            ></i>
                            <span>
                              {chat.isOpen ? "online" : "left 7 mins ago"}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                {/* <li className={`${styles["clearfix"]} `}>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt="avatar"
                  />
                  <div className={styles.about}>
                    <div className={styles.name}>
                      <span>Vincent Porter</span>
                    </div>
                    <div className={styles.status}>
                      <i className={`fa fa-circle ${styles["offline"]}`}></i>
                      <span> left 7 mins ago </span>
                    </div>
                  </div>
                </li>
                <li
                  className={`${styles["clearfix"]} ${styles["ul-li-active"]}`}
                >
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                    alt="avatar"
                  />
                  <div className={styles.about}>
                    <div className={styles.name}>
                      <span>Aiden Chavez</span>
                    </div>
                    <div className={styles.status}>
                      <i className={`fa fa-circle ${styles["online"]}`}></i>
                      <span> online </span>
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
            <div className={styles.chat}>
              <div className={`${styles["chat-header"]} ${styles.clearfix}`}>
                {selectedChat ? (
                  <div className="row">
                    <div className="col-6  " style={{ height: "100%" }}>
                      <a data-toggle="modal" data-target="#view_info">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar2.png"
                          alt="avatar"
                        />
                      </a>
                      <div className={`${styles["chat-about"]}`}>
                        <h6 className="m-b-0">selectedChat?.userName</h6>
                        <small>Last seen: 2 hours ago</small>
                      </div>
                    </div>
                    <div
                      className="col-6"
                      id="col-btns"
                      style={{
                        justifyContent: "end",
                        alignItems: "center",
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <a
                        className="btn d-none d-sm-inline-block btn-primary"
                        role="button"
                        id="btn-generate-guide"
                        href="#"
                        style={{
                          textAlign: "justify",
                          height: "2.2em",
                          borderStyle: "inherit",
                          borderRadius: "5px",
                        }}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                        &nbsp;Generate Guide
                      </a>
                      <a
                        className="btn d-none d-sm-inline-block btn-light"
                        role="button"
                        id="btn-snooze"
                        href="#"
                        style={{
                          textAlign: "justify",
                          height: "2.2em",
                          background: "var(--bs-gray-300)",
                          color: "black",
                          borderStyle: "inherit",
                          borderRadius: "5px",
                        }}
                      >
                        Snooze
                      </a>
                      <a
                        className="btn d-none d-sm-inline-block btn-dark"
                        role="button"
                        id="btn-close-conversation"
                        href="#"
                        style={{
                          textAlign: "justify",
                          height: "2.2em",
                          borderStyle: "inherit",
                          borderRadius: "5px",
                        }}
                      >
                        Close
                      </a>
                    </div>
                  </div>
                ) : null}
                {/* <div className="col-6 offset-xxl-0" id="col-user-profile">
                    <a data-toggle="modal" data-target="#view_info">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        alt="avatar"
                      />
                    </a>
                    <div className={`${styles["chat-about"]}`}>
                      <h6 className="m-b-0">Aiden Chavez</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div> */}
              </div>
              <div
                className={styles["chat-history"]}
                style={{ height: "35.3rem", overflowY: "auto" }}
              >
                <ul className="m-b-0">
                  {chatMessages.map((msg, index) => {
                    return (
                      <li key={index} className={`${styles.clearfix}`}>
                        <div
                          className={`d-flex justify-content-end ${styles["message-data"]}`}
                        >
                          <span className={`${styles["message-data-time"]}`}>
                            {new Date(msg.timeStamp).toLocaleTimeString()}
                          </span>
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt="avatar"
                          />
                        </div>
                        <div
                          className={`${styles["message"]} ${
                            msg.isSupportSender
                              ? `${styles["float-right"]} ${styles["other-message"]}`
                              : `${styles["my-message"]}`
                          }`}
                        >
                          {msg.content}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                className="container"
                style={{
                  bottom: "0",
                  padding: 0,
                  position: "relative",
                  minWidth: "90%",
                  border: "1px solid rgba(133, 135, 150, 0.32)",
                  borderRadius: "8px",
                  margin: "10px",
                  maxHeight: "100%",
                  display: "flex",
                  flexDirection: "column",
                  zIndex: 100,
                  backgroundColor: "white",
                }}
              >
                <div className="row my-2 ms-2">
                  <div className="col" style={{ padding: 0 }}>
                    <button
                      className="btn btn-sm"
                      type="button"
                      style={{ backgroundColor: "white" }}
                    >
                      Reply
                    </button>
                    <button className="btn btn-sm" type="button">
                      Note
                    </button>
                  </div>
                </div>
                <div className="row mb-2 mx-2" style={{ position: "relative" }}>
                  <textarea
                    id="ta-message-text"
                    ref={textareaRef}
                    value={message}
                    onChange={handleChangeMessage}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    rows={5}
                    style={{
                      bottom: 0,
                      resize: "none",
                      overflow: "hidden",
                      maxWidth: "100%",
                      minWidth: "90%",
                      padding: "5px",
                      borderRadius: "5px",
                      borderStyle: "none",
                      borderColor: "var(--bs-card-border-color)",
                    }}
                  ></textarea>
                </div>
                <div className="row mb-2 mx-2">
                  {selectedChat?.isOpen ? (
                    <div className="col d-flex justify-content-end">
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onSubmit={handleSend}
                      >
                        Send
                      </button>
                    </div>
                  ) : (
                    <div className="col d-flex justify-content-end">
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        disabled
                      >
                        Send
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
