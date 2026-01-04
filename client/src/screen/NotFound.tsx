import { useEffect } from "react";
import "../style/NotFound.css";

const NotFound = () => {
  useEffect(() => {
    const BLACKLISTED_KEY_CODES = [38, 40, 37, 39, 18, 20, 17, 16, 9, 27, 144];

    const COMMANDS: Record<string, string> = {
      help:
        'The page you want to visit does not exist. Enter <span class="red">commands</span>',
      report:
        "<span class='green'>This page report has been successfully sent.</span>",
      commands:
        'Available commands: <span class="red">help</span>, <span class="red">report</span>, <span class="red">exit</span>',
      cls: "",
    };

    const userInput = document.getElementById("userInput")!;
    const terminalOutput = document.getElementById("code")!;
    const keyboard = document.getElementById("Keyboard") as HTMLInputElement;

    let str = "";

    keyboard.focus();

    const execute = (input: string) => {
      if (!input) return;

      if (input === "cls") {
        terminalOutput.innerHTML = "";
        return;
      }

      if (input === "exit") {
        window.location.href = "/";
        return;
      }

      const output =
        COMMANDS[input] || "<p>The command entered is not correct</p>";

      terminalOutput.innerHTML += `<p class="out_code">${output}</p>`;
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (BLACKLISTED_KEY_CODES.includes(e.keyCode)) return;

      if (e.key === "Enter") {
        execute(userInput.innerHTML);
        userInput.innerHTML = "";
        keyboard.value = "";
        str = "";
        return;
      }

      str += e.key;
      userInput.innerHTML = str;
    };

    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  return (
    <main className="notfound-wrapper">
      <header className="Menubar">
        <p>Terminal</p>
        <p className="title_404">404</p>
        <div className="Menu_BTN">
          <span className="btn green" />
          <span className="btn yellow" />
          <span className="btn red" />
        </div>
      </header>

      <div className="Terminal_body">
        <p>Oops! page not found</p>
        <p>
          Enter <span className="red">help</span> for help
        </p>

        <div className="Terminal_line">
          <div id="code" />
          <span className="arrow">→</span>
          <span id="userInput" />
          <input id="Keyboard" className="keyboard" />
        </div>
      </div>
    </main>
  );
};

export default NotFound;
