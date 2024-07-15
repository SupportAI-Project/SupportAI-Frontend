import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import styles from "../../styles/chat.module.css";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface Message {
  content: string;
  isNote: boolean;
  isSupportSender: boolean;
  chatId: string;
  time: Date;
}

const Dashboard = () => {
  // const [newMessage, setNewMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [prevHeight, setPrevHeight] = useState(24);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      handleSend(message);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 10 * 31);
      // const heightDifference = newHeight - prevHeight;
      // // Set new height and margin-top to move the textarea upwards
      textareaRef.current.style.height = `${newHeight}px`;
      // textareaRef.current.style.marginTop = `-${newHeight - 24}px`;
      const container = textareaRef.current.parentElement;
      if (container) {
        container.parentElement!.style.height = "auto";
        container.parentElement!.style.height = `${
          container.parentElement!.scrollHeight
        }px`;
        container.parentElement!.style.marginTop = `-${newHeight - 24}px`;
      }
      // setPrevHeight(newHeight);
    }
  }, [message, prevHeight]);

  // useEffect(() => {
  //   const handleKeyUp = () => {
  //     if (textareaRef.current) {
  //       textareaRef.current.style.height = "0px";
  //       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  //     }
  //   };

  //   const textarea = textareaRef.current;
  //   if (textarea) {
  //     textarea.addEventListener("keyup", handleKeyUp);
  //   }

  //   return () => {
  //     if (textarea) {
  //       textarea.removeEventListener("keyup", handleKeyUp);
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   // Add your script code here
  //   const script = document.createElement("script");
  //   script.src = "https://example.com/script.js";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   // Clean up the script when component unmounts
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

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

  function handleSend(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if (message.trim() === "") {
      return;
    }
    const newMessage: Message = {
      content: message,
      isNote: false,
      isSupportSender: false,
      chatId: "1",
      time: new Date(),
    };
    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
  }

  function handleSendMessage(): void {
    throw new Error("Function not implemented.");
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
          {/* <div className={`card ${styles["chat-app"]}`}> */}
          <div
            className={`card ${styles["chat-app"]}`}
            style={{
              textAlign: "left",
              border: "1px solid rgba(0, 0, 0, .125)",
            }}
          >
            <div id="plist" className={styles["people-list"]}>
              <ul className={`list-unstyled ${styles["chat-list"]} mt-2 mb-0`}>
                <li className={`${styles["clearfix"]} `}>
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
                </li>
              </ul>
            </div>
            <div className={styles.chat}>
              <div className={`${styles["chat-header"]} ${styles.clearfix}`}>
                <div className="row">
                  <div className="col-6 offset-xxl-0" id="col-user-profile">
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
                  </div>
                  <div
                    className="col-6"
                    id="col-btns"
                    style={{
                      textAlign: "left",
                      lineHeight: 0,
                      padding: "1rem",
                      paddingTop: "inherit",
                      paddingRight: "1rem",
                      paddingBottom: "inherit",
                      paddingLeft: "inherit",
                      display: "flex",
                      // position: "relative",
                      justifyContent: "end",
                      gap: "5px",
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
                {/* <div className="row">
                  <div className="col-lg-6">
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
                  </div>
                  <div className="col-lg-6 hidden-sm text-right"></div>
                </div> */}
              </div>
              <div
                className={styles["chat-history"]}
                style={{ height: "650px", overflowY: "auto" }}
              >
                <ul className="m-b-0">
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
                    onChange={handleChange}
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
                  <div className="col d-flex justify-content-end">
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      onSubmit={handleSend}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Dashboard;
