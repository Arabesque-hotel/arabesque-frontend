import React, { useState } from "react";
import styles from "./Entries.module.scss";
import { useLanguage } from "../../context/Language/LanguageContext";
import axios from 'axios';
import { isValidPhoneNumber } from "libphonenumber-js";

const Entries = () => {
  const { currentLanguage } = useLanguage();
  const [disabled,setDisabled] = useState(false)
  const backUrl = "http://localhost:1337"
  const [entries, setEntries] = useState(
    new Map([
      ["firstName", ""],
      ["lastName", ""],
      ["email", ""],
      ["number", ""],
      ["message", ""],
    ])
  );

  const validateEmail = (email) => {
    //i stole this from stack overflow
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function handleEntries(input, key) {
    input.target.style.borderColor = "rgba(57, 77, 139, 0.4)";
    const updatedJson = new Map(entries);
    updatedJson.set(key, input.target.value);
    setEntries(updatedJson);
  }

  function buttonPress() {
    let checkPassed = true;

    if (entries.get("firstName") === "") {
      checkPassed = false;
      document.getElementById("firstNameEntry").style.borderColor = "#bf0000";
    }

    if (entries.get("lastName") === "") {
      checkPassed = false;
      document.getElementById("lastNameEntry").style.borderColor = "#bf0000";
    }

    if (entries.get("number") === "" || !isValidPhoneNumber(entries.get("number"))) {
      checkPassed = false;
      document.getElementById("numberEntry").style.borderColor = "#bf0000";
    }

    if (entries.get("email") === "" || !validateEmail(entries.get("email"))) {
      checkPassed = false;
      document.getElementById("emailEntry").style.borderColor = "#bf0000";
    }

    if(entries.get("message").length > 2000) {
      checkPassed = false;
      document.getElementById("messageEntry").style.borderColor = "#bf0000";
      window.alert(currentLanguage==='en'?"Too many characters in message!":currentLanguage==='sq'?"Shumë karaktere në mesazh!":currentLanguage==='sr'?"Previše znakova u poruci!":"Zu viele Zeichen in der Nachricht!")
    }

    if (entries.get("message") === "") {
      checkPassed = false;
      document.getElementById("messageEntry").style.borderColor = "#bf0000";
    }

    if (checkPassed) {
      setDisabled(true)
      let data = JSON.stringify({
        "data": {
          "from": entries.get("email"),
          "message": entries.get("message"),
          "phoneNumber": entries.get("number"),
          "firstName": entries.get("firstName"),
          "lastName": entries.get("lastName")
        }
      });
      let config = {
        method: 'post',
        maxBodyLength: 10485760, //10mb
        url: backUrl+'/api/emails',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios.request(config)
      .then((response) => {
        window.open('/thankYou',"_self")
      })
      .catch((error) => {
        console.log(error);
        setDisabled(false)
        window.alert("Something went wrong and we couldn't send your message! Please try again later")
      });
    }
  }

  return (
    <div className={styles.entries}>
      <input
      autoComplete="given-name"
      placeholder={
        currentLanguage === "en"
        ? "First Name"
            : currentLanguage === "sq"
            ? "Emri"
            : currentLanguage === "sr"
            ? "Ime"
            : "Vorname"
          }
        style={{ width: "38%" }}
        value={entries.get("firstName")}
        id="firstNameEntry"
        onChange={(e) => {
          handleEntries(e, "firstName");
        }}
        />
      <input
        autoComplete="family-name"
        placeholder={
          currentLanguage === "en"
            ? "Last Name"
            : currentLanguage === "sq"
            ? "Mbiemri"
            : currentLanguage === "sr"
            ? "Prezime"
            : "Nachname"
        }
        style={{ width: "38%" }}
        value={entries.get("lastName")}
        id="lastNameEntry"
        onChange={(e) => {
          handleEntries(e, "lastName");
        }}
      />
      <input
        autoComplete="email"
        placeholder={
          currentLanguage === "en"
            ? "Your Email"
            : currentLanguage === "sq"
            ? "Emailin Tuaj"
            : currentLanguage === "sr"
            ? "Vaš Email"
            : "Deine Email"
        }
        value={entries.get("email")}
        id="emailEntry"
        onChange={(e) => {
          handleEntries(e, "email");
        }}
      />
      <input
      type="tel"
      autoComplete="tel"
        placeholder={
          currentLanguage === "en"
            ? "Phone Number (+123 45 678 901)"
            : currentLanguage === "sq"
            ? "Numri i telefonit (+123 45 678 901)"
            : currentLanguage === "sr"
            ? "Telefonski broj (+123 45 678 901)"
            : "Telefonnummer (+123 45 678 901)"
        }
        value={entries.get("number")}
        id="numberEntry"
        onChange={(e) => {
          handleEntries(e, "number");
        }}
      />
      <textarea
        placeholder={
          currentLanguage === "en"
            ? "Write your message..."
            : currentLanguage === "sq"
            ? "Shkruani mesazhin tuaj..."
            : currentLanguage === "sr"
            ? "Napišite svoju poruku..."
            : "Schreibe deine Nachricht..."
        }
        value={entries.get("message")}
        id="messageEntry"
        onChange={(e) => {
          handleEntries(e, "message");
        }}
      />
      <button onClick={buttonPress} disabled={disabled}>
        {currentLanguage === "en"
          ? "Send Message"
          : currentLanguage === "sq"
          ? "Dërgoni Mesazh"
          : currentLanguage === "sr"
          ? "Pošalji Poruku"
          : "Nachricht senden..."}
      </button>
    </div>
  );
};

export default Entries;
