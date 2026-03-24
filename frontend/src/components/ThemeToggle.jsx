import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

function ThemeToggle() {

  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button className="theme-btn" onClick={() => setDark(!dark)}>
      {dark ? <Sun size={18}/> : <Moon size={18}/>}
    </button>
  );
}

export default ThemeToggle;