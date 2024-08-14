import styles from "../styles/chat.module.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { Chat, Message } from "@/types";
import { Sidebar, Topbar } from "@/components";
import socket from "@/socket";
import "../styles/dashboard.scss";
import { apiRequest, SERVER_URL } from "@/common";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
import { cookies } from "next/headers";
import { parse } from "cookie";

// import Image from "next/image";

const Dashboard = () => {
  const [usersChats, setUsersChats] = useState<Chat[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [isNote, setIsNote] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await apiRequest("/chats", "GET");
        console.log(response);

        setUsersChats(response as Chat[]);

        setSelectedChat(response[0]);
        const messages = await apiRequest(
          "/chats/" + response[0].chatId,
          "GET"
        );

        setChatMessages(messages.messages as Message[]);
      } catch (err: any) {
        console.log(err);
        if (err.response?.status === 401) {
          router.push("/login");
        }
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    console.log("Chat Messages:", chatMessages);
    console.log(socket);
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
    console.log("Selected Chat:", selectedChat);

    if (selectedChat) {
      const fd = new FormData();
      fd.append("chatId", selectedChat.chatId.toString());
      socket.emit("join", { chatId: selectedChat.chatId });

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
        // container.parentElement!.style.marginTop = `-${newHeight - 24}px`;
        const lines = textareaRef.current.value.split("\n").length;

        if (newHeight >= 30 * 5) {
          container.parentElement!.style.marginTop = `-${(lines - 5) * 24}px`;
        } else {
          container.parentElement!.style.marginTop = `0px`;
        }
      }
    }
  }, [message]);

  const handleChangeChat = async (chat: Chat) => {
    // if (selectedChat?.chatId === chat.chatId) {
    //   console.log("Same chat");
    //   return;
    // }
    const messages = await apiRequest("/chats/" + chat.chatId, "GET");

    setChatMessages(messages.messages as Message[]);
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
      e.preventDefault();
      const lines = message.split("\n");
      if (lines.length >= 10) {
        return;
      }
      setMessage((prev) => prev + "\n");
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  async function handleSend() {
    console.log("Sending message");

    if (message.trim() === "") {
      return;
    }
    // const newMessage: Message = {
    //   content: message,
    //   isNote: false,
    //   isSupportSender: true,
    //   chatId: selectedChat!.chatId,
    //   timeStamp: new Date(),
    //   messageId: 0,
    // };
    console.log(selectedChat);
    const data = {
      chatId: selectedChat?.chatId,
      content: message,
    };
    const allMessage = {
      data: data,
      isSupportSender: true,
      isNote: isNote,
    };
    console.log("Message:", message);

    if (selectedChat) {
      const fd = new FormData();
      fd.append("data", JSON.stringify(data));
      fd.append("isSupportSender", "true");
      fd.append("isNote", isNote.toString());
      socket.emit("message", allMessage);
      setMessage("");
    }
  }

  async function handleGenerateGuide(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault();
    console.log("Generating guide");

    const generatedGuide = await axios.post(
      "localhost:3002/openai/generate-guide",
      {
        chatId: selectedChat?.chatId,
      }
    );
    localStorage.setItem("generatedGuide", generatedGuide.data);
    router.push("/editor");
  }

  return (
    <div
      id="wrapper"
      className="d-flex "
      style={{ minHeight: "100vh", flexDirection: "column" }}
    >
      {/* <Sidebar /> */}

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
                          // style={{ width: "50px", height: "50px" }}
                        />
                        <div className={styles.about}>
                          <div className={styles.name}>
                            <span>{chat.user?.username}</span>
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
            <div className={`${styles.chat}`} style={{ marginLeft: "280px" }}>
              <div className={`${styles["chat-header"]} ${styles.clearfix}`}>
                {selectedChat ? (
                  <div className="row">
                    <div
                      className="col-6 d-flex align-items-center "
                      style={{ height: "100%" }}
                    >
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar2.png"
                        alt="avatar"
                        style={{ height: "2.5rem", width: "2.5rem" }}
                      />

                      <div className={`${styles["chat-about"]}`}>
                        <h6 className="m-b-0">
                          {selectedChat?.user?.username}
                        </h6>
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
                        onClick={handleGenerateGuide}
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
              </div>
              <div
                className={styles["chat-history"]}
                style={{ height: "27.9rem", overflowY: "auto" }}
              >
                <ul className="mb-0">
                  {chatMessages.map((msg, index) => {
                    return (
                      <li key={index} className={`${styles.clearfix}`}>
                        <div
                          className={`d-flex ${
                            msg.isSupportSender
                              ? "justify-content-end"
                              : "justify-content-start"
                          } ${styles["message-data"]} align-items-center`}
                        >
                          <span className={`${styles["message-data-time"]}`}>
                            {new Date(msg.timeStamp).toLocaleTimeString(
                              "il-IL",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                          </span>
                          {msg.isSupportSender ? (
                            <img
                              className="ms-2"
                              src="https://bootdey.com/img/Content/avatar/avatar7.png"
                              alt="avatar"
                            />
                          ) : (
                            <img
                              className="ms-2"
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              alt="avatar"
                            />
                          )}
                        </div>
                        <div
                          className={`${styles["message"]} ${
                            msg.isSupportSender
                              ? `${styles["float-right"]} ${styles["other-message"]} `
                              : `${styles["my-message"]}`
                          } ${msg.isNote ? "note-message" : ""}`}
                        >
                          {msg.content.split("\n").map((line, index) => {
                            return (
                              <p key={index} className="m-0">
                                {line}
                              </p>
                            );
                          })}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                className="container mt-2"
                style={{
                  bottom: "0",
                  padding: 0,
                  position: "relative",
                  minWidth: "98.5%",
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
                      className={`btn-type ${!isNote ? "btn-selected" : ""}`}
                      type="button"
                      onClick={() => setIsNote(false)}
                    >
                      Reply
                    </button>
                    <button
                      className={`btn-type ${isNote ? "btn-selected" : ""}`}
                      type="button"
                      onClick={() => setIsNote(true)}
                    >
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
                        onClick={handleSend}
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

export async function getServerSideProps(context: { req: any }) {
  const cookieValue = getCookie("Authorization", { req: context.req });
  // console.log(cookies().getAll());
  const { req } = context;
  // const cookies = parse(req.headers.cookie || "");
  // console.log(cookies);
  // try {
  //   const testCookie = await axios.get(`${SERVER_URL}/chats`, {
  //     withCredentials: true,
  //   });
  // } catch (err: any) {
  //   console.log(err);
  //   if (err.response.status === 401) {
  //     return {
  //       redirect: {
  //         destination: "/login",
  //         permanent: false,
  //       },
  //     };
  //   }
  // }

  if (!cookieValue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Dashboard;
