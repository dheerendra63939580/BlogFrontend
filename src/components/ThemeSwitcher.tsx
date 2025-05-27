import React, { useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useOnClickOutside } from 'usehooks-ts';


const ThemeSwitcher: React.FC = () => {

  const outsideRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const [openTheme, setOpenTheme] = useState(false);
  const handleOpenTheme = () => {
    setOpenTheme(true)
  }

  const handleThemeChange = (event) => {
    setTheme(event.target.value as 'light' | 'dark' | 'system');
  };
  useOnClickOutside(outsideRef, () => setOpenTheme(false))
  return (
    <div className="relative">
        {theme === "light" ? <Sun onClick={handleOpenTheme}/> : <Moon onClick={handleOpenTheme}/> }
        {openTheme && 
            <select onChange={handleThemeChange} value={theme} 
                className="absolute right-0 top-10 px-(--paddingX) py-(--paddingY) rounded-(--radius) border cursor-pointer" 
                ref={outsideRef}
            >
                <option value="light" className="dark:text-(--text-dark) dark:bg-(--background-dark)">Light</option>
                <option value="dark" className="dark:text-(--text-dark) dark:bg-(--background-dark)">Dark</option>
                <option value="system" className="dark:text-(--text-dark) dark:bg-(--background-dark)">System</option>
            </select>
        }
    </div>
  );
};

export default ThemeSwitcher;
