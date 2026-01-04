import { useEffect } from "react";

const NotFound1 = () => {
  useEffect(() => {
    const BLACKLISTED_KEY_CODES = [38, 40, 37, 39, 18, 20, 17, 16, 9, 27, 144];

    const COMMANDS: Record<string, string> = {
      help:
        'The page you want to visit does not exist. Enter <span class="text-red-400">commands</span>',
      report:
        "<span class='text-green-400'>This page report has been successfully sent.</span>",
      commands:
        'Available commands: <span class="text-red-400">help</span>, <span class="text-red-400">report</span>, <span class="text-red-400">exit</span>',
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
 <main className="min-h-screen w-full bg-[#01020512] flex items-center justify-center">
  <div className="w-[80%] max-w-4xl h-[60vh] bg-[#000000] rounded-xl text-white font-mono shadow-2xl">

    {/* Header */}
    <header className="bg-[#313335] flex items-center justify-between px-3 py-2 rounded-t-xl">
      <p>Terminal</p>
      <p className="text-xl font-bold">404</p>
      <div className="flex gap-2">
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-red-400" />
      </div>
    </header>

    {/* Body */}
    <div className="p-4 h-full overflow-y-auto">
      <p>Oops! page not found</p>
      <p>
        Enter <span className="text-red-400">help</span> for help
      </p>

      <div className="flex items-start gap-2 mt-4">
        <div id="code" />
        <span className="text-yellow-400">→</span>
        <span id="userInput" />
        <input id="Keyboard" className="opacity-0 absolute" />
      </div>
    </div>

  </div>
</main>

  );
};

export default NotFound1;
