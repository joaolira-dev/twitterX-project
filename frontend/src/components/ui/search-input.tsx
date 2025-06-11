"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./input";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  defaultValue?: string;
  hideOnSearch?: boolean;
};

export const SearchInput = ({ defaultValue, hideOnSearch }: Props) => {
  const path = usePathname();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(defaultValue ?? "");

  const handleSearch = () => {
    if (searchInput) {
      router.push("/search?q=" + encodeURIComponent(searchInput));
    }
  };

  if (hideOnSearch && path === "/search") return null;

  return (
    <Input
      placeholder="Buscar"
      icon={faMagnifyingGlass}
      filled
      value={searchInput}
      onChange={(e) => setSearchInput(e)}
      onEnter={handleSearch}
    />
  );
};
