import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.css";
import styles from "../../styles/chat.module.css";
import "../../styles/chat.scss";
import axios from "axios";
import { io } from "socket.io-client";
import { Textarea } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Message } from "@/types";

const ChatApp: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  // const [socket, setSocket] = useState<any>(null);

  // const backendUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

  useEffect(() => {
    const messages: Message[] = [
      {
        content: "Hi Aiden, how are you? How is the project coming along?",
        isNote: false,
        isSupportSender: true,
        chatId: "1",
        time: new Date(),
      },
      {
        content: "Are we meeting today?",
        isNote: false,
        isSupportSender: false,
        chatId: "1",
        time: new Date(),
      },
      {
        content:
          "Project has been already finished and I have results to show you.",
        isNote: false,
        isSupportSender: false,
        chatId: "1",
        time: new Date(),
      },
    ];
    setChatMessages(messages);
  }, []);

  // useEffect(() => {
  //   const socket = io(backendUrl);
  //   setSocket(socket);
  //   socket.on("connect", () => {
  //     console.log("Connected to server");
  //   });
  //   socket.on("newMessage", (data: any) => {
  //     console.log("Received message: ", data);
  //     setChatMessages([...chatMessages, data]);
  //   });
  //   return () => {
  //     socket.disconnect();
  //     setSocket(null);
  //   };
  // }, []);

  async function handleSendMessage() {
    if (message === "") return;
    console.log("Send message: ", message);
    const newMessage = {
      content: message,
      isNote: false,
      isSupportSender: false,
      chatId: "1",
      time: new Date(),
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
    // if (socket) {
    //   const fd = new FormData();
    //   const data = {
    //     chatId: "1",
    //     content: message,
    //   };
    //   fd.append("data", JSON.stringify(data));
    //   socket.emit("message", fd);
    // }
  }

  return (
    <div className="chat-app">
      <div className="container" style={{ width: "100vw" }}>
        <div className={`row ${styles.clearfix}`}>
          <div className={`card ${styles["chat-app"]} pe-0`}>
            <div className={styles["people-list"]}>
              <div className="input-group ms-1">
                <div className="input-group-text input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
                <input
                  className="form-control form-control-lg form-control"
                  type="text"
                  placeholder="Search..."
                />
              </div>
              <ul className={`list-unstyled ${styles["chat-list"]} mt-2 mb-0`}>
                <li className={styles.clearfix}>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt="avatar"
                  />
                  <div className={styles.about}>
                    <div className={styles.name}>
                      <span>Vincent Porter</span>
                    </div>
                    <div className={styles.status}>
                      <i className="fa fa-circle offline"></i>
                      <span> left 7 mins ago </span>
                    </div>
                  </div>
                </li>
                {/* Add more list items here */}
              </ul>
            </div>
            <div className={styles.chat}>
              <div className={`${styles["chat-header"]} ${styles.clearfix}`}>
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar2.png"
                      alt="avatar"
                    />

                    <div className={`${styles["chat-about"]}`}>
                      <h6 className="mb-0">Aiden Chavez</h6>
                      <small>Last seen: 2 hours ago</small>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={styles["chat-history"]}
                style={{ height: "650px", overflowY: "auto" }}
              >
                <ul className="mb-0">
                  {chatMessages.map((msg, index) => {
                    return (
                      <li key={index} className={`${styles.clearfix}`}>
                        <div
                          className={`d-flex justify-content-end ${styles["message-data"]}`}
                        >
                          <span className={`${styles["message-data-time"]}`}>
                            {msg.time.toLocaleTimeString()}
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
              <div className={`${styles["chat-message"]} ${styles.clearfix} `}>
                <div className="input-group mb-0 chat-message-input-group">
                  <button
                    className="input-group-text input-group-append"
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    onClick={() => handleSendMessage()}
                  >
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </span>
                  </button>
                  <Textarea
                    message={message}
                    onMessageChange={setMessage}
                    onSendMessage={handleSendMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
