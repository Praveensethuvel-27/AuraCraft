import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Command, Menu, X, Rocket, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useGenerator } from '../../contexts/GeneratorContext';

export function Navbar() {
  const location = useLocation();
  const { setIsCommandPaletteOpen } = useGenerator();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Documentation', path: '/docs' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rose-200/60 bg-white/90 backdrop-blur-xl shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-400 via-rose-500 to-rose-600 p-[1px] shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-rose-500 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-stone-900 flex items-center gap-1.5">
              AuraCraft <span className="gradient-text font-bold text-xs">AI</span>
            </span>
            <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase">Peach Studio</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(link.path)
                  ? 'text-rose-600 bg-rose-50 border border-rose-200 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-rose-50/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Command Palette Trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50/80 border border-rose-200/60 hover:border-rose-300 text-xs text-stone-700 transition cursor-pointer"
          >
            <Command className="w-3.5 h-3.5 text-rose-500" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white text-stone-500 border border-rose-200 rounded">⌘K</kbd>
          </button>

          {/* Main Action */}
          <Link to="/dashboard">
            <Button variant="primary" size="sm" icon={Rocket}>
              Generate Project
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="p-2 rounded-xl bg-rose-50 text-stone-700 hover:text-stone-900 border border-rose-200"
          >
            <Command className="w-4 h-4 text-rose-500" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-rose-50 text-stone-700 hover:text-stone-900 border border-rose-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-rose-200 bg-white/98 backdrop-blur-2xl px-6 py-6 space-y-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition ${
                  isActive(link.path)
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-rose-200">
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block w-full">
              <Button variant="primary" size="lg" className="w-full" icon={Rocket}>
                Generate Project
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
