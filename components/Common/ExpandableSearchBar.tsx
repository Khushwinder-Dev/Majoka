"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronRight, Mic, MicOff } from "lucide-react";

// Type declarations for SpeechRecognition API
interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

interface SearchItem {
  id: string;
  name: string;
}

interface ExpandableSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
  iconColor?: string;
  hoverIconColor?: string;
}

const ExpandableSearchBar: React.FC<ExpandableSearchBarProps> = ({
  onSearch,
  placeholder = "Search for products...",
  suggestions = [],
  className = "",
  iconColor = "text-white",
  hoverIconColor = "group-hover:text-[var(--primary)]",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check for speech recognition support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);
    }
  }, []);

  // Handle clicks outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleDesktopSearchCollapse();
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleDesktopSearchExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  };

  const handleDesktopSearchCollapse = () => {
    setIsExpanded(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleDesktopSearchFocus = () => {
    if (searchQuery) {
      // Simulate search results based on suggestions
      const filteredSuggestions = suggestions
        .filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
        .map((item, index) => ({ id: index.toString(), name: item }));
      setSearchResults(filteredSuggestions);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    if (value.trim()) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const filteredSuggestions = suggestions
          .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 5)
          .map((item, index) => ({ id: index.toString(), name: item }));
        setSearchResults(filteredSuggestions);
        setIsLoading(false);
      }, 300);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  };

  const handleSearchItem = (item: SearchItem) => {
    setSearchQuery(item.name);
    setSearchResults([]);
    onSearch(item.name);
    handleDesktopSearchCollapse();
  };

  const handleVoiceSearch = () => {
    if (!speechSupported || typeof window === "undefined") return;

    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) return;

      const recognition: SpeechRecognitionInstance = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearchChange(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    } catch (error) {
      console.error("Speech recognition error:", error);
      setIsListening(false);
    }
  };

  const HighLightMatchText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="font-semibold">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const Loading = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sky-500"></div>
      <span className="ml-2 theme-text-main">Searching...</span>
    </div>
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="flex">
        {!isExpanded && (
          // Show only search icon when not expanded
          <button
            type="button"
            onClick={() => handleDesktopSearchExpand()}
            className={`${iconColor} ${hoverIconColor} p-2 transition-all cursor-pointer hover:bg-white/10 rounded-full`}
            aria-label="Search"
          >
            <Search className={`h-6 w-6 stroke-2`} />
          </button>
        )}

        <div
          className={`flex items-center bg-white transition-all duration-200 ${
            isExpanded
              ? "w-80 px-3 py-1 rounded-full border-2 border-[#01a9a0] transition-all hover:shadow-md shadow-lg"
              : "w-0 overflow-hidden"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ChevronRight
            className="h-5 w-5 text-gray-400 mr-2 font-bold stroke-2 cursor-pointer hover:text-gray-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleDesktopSearchCollapse();
            }}
          />

          <input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={handleDesktopSearchFocus}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.trim()) {
                onSearch(searchQuery);
                handleDesktopSearchCollapse();
              }
            }}
            placeholder={placeholder}
            className="flex-1 outline-none text-gray-700 bg-transparent text-sm placeholder-gray-400"
          />

          {speechSupported && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleVoiceSearch();
              }}
              className={`ml-2 p-1.5 rounded-full transition-all duration-200 ${
                isListening
                  ? "bg-red-800 text-white shadow-md"
                  : "bg-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              }`}
              title={isListening ? "Stop listening" : "Voice search"}
            >
              {isListening ? (
                <MicOff className="h-5 w-5 stroke-2" />
              ) : (
                <Mic className="h-5 w-5 stroke-2" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Desktop Search Dropdown */}
      {isExpanded && searchQuery && (
        <div
          className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-lg max-h-60 overflow-y-auto mt-2 z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading ? (
            <div className="py-8 text-center text-red-800 font-medium text-sm">
              <Loading />
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <div
                key={item.id}
                className={`px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors ${
                  index === 0 ? "rounded-t-2xl" : ""
                } ${index === searchResults.length - 1 ? "rounded-b-2xl" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSearchItem(item);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSearchItem(item);
                }}
              >
                <div className="flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400 mr-2 stroke-2" />
                  <span className="text-sm text-gray-600">
                    {HighLightMatchText(item.name, searchQuery)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-gray-500 text-sm">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpandableSearchBar;
