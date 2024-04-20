"use client";
import { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchText: string;
  handleChangeSearchText: (newValue: string) => void;
};

// create a context
export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  // State to follow
  // control input
  const [searchText, setSearchText] = useState<string>("");

  //derived state

  //event handlers / actions
  const handleChangeSearchText = (newValue: string) => {
    setSearchText(newValue);
  };

  return (
    //provide the context and values
    <SearchContext.Provider value={{searchText, handleChangeSearchText}}>
      {children}
    </SearchContext.Provider>
  );
}
