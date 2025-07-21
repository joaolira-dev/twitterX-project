"use client";

import { ProfileFeed } from "@/components/profile/profile-feed";
import { Button } from "@/components/ui/button";
import { HeaderGeral } from "@/components/ui/header-geral";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import { user } from "@/data/user";
import { faCamera, faLink, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [isMe, setIsMe] = useState(true);

  return (
    <div>
      <HeaderGeral backHref="/">
        <div className="font-bold text-lg">{user.name}</div>
        <div className="text-xs text-gray-500">{user.postCount} posts</div>
      </HeaderGeral>
      <section className="border-b-2 border-gray-900">
        <div
          className="flex justify-center items-center gap-4 bg-gray-500 h-28 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url(" + user.cover + ")" }}
        >
          <div className="cursor-pointer bg-black/80 flex justify-center size-12 rounded-full items-center">
            <FontAwesomeIcon icon={faCamera} className="size-12" />
          </div>
          <div className="cursor-pointer bg-black/80 flex justify-center size-12 rounded-full items-center">
            <FontAwesomeIcon icon={faXmark} className="size-12" />
          </div>
        </div>
        <div className="px-6 -mt-8">
          <img
            src={user.avatar}
            alt={user.name}
            className="size-22 rounded-full"
          />
          <div className="-mt-22 size-22 flex justify-center items-center">
            <div className="cursor-pointer bg-black/80 flex justify-center size-12 rounded-full items-center">
              <FontAwesomeIcon icon={faCamera} className="size-12" />
            </div>
          </div>
        </div>
      </section>
      <section className="p-6 flex flex-col gap-4">
        <label>
          <p className="text-lg text-gray-500 mb-2">Nome</p>
          <Input placeholder="Digite seu nome" value={user.name} />
        </label>
         <label>
          <p className="text-lg text-gray-500 mb-2">Bio</p>
          <TextArea placeholder="Descreva sua biografia" rows={4} value={user.bio}/>
        </label>
         <label>
          <p className="text-lg text-gray-500 mb-2">Link</p>
          <Input placeholder="Digite um link" value={user.link} />
        </label>
        <Button size={1} label="Salvar alterações" />
      </section>
    </div>
  );
}
