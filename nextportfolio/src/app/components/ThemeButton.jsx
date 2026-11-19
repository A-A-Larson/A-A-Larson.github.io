'use client';
import { LuLightbulb, LuLightbulbOff } from 'react-icons/lu';
import { useTheme } from '../context/ThemeContext';

// Light/dark switch for pages without the home page's nav bar (project detail pages).
// A real <button>, so it works with the keyboard and screen readers.
export default function ThemeButton() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      type='button'
      className='projThemeBtn'
      onClick={() => setDarkMode(!darkMode)}
      aria-label='Dark mode'
      aria-pressed={darkMode}
      title='Toggle dark mode'
    >
      <LuLightbulbOff className='hidden dark:block text-white' size={26} aria-hidden='true' />
      <LuLightbulb className='block dark:hidden text-amber-600' size={26} aria-hidden='true' />
    </button>
  );
}
