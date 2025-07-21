"use client";

import { ProfileFeed } from "@/components/profile/profile-feed";
import { Button } from "@/components/ui/button";
import { HeaderGeral } from "@/components/ui/header-geral";
import { user } from "@/data/user";
import { faLink } from "@fortawesome/free-solid-svg-icons";
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
          className="bg-gray-500 h-28 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url(" + user.cover + ")" }}
        ></div>
        <div className="px-6 -mt-8 flex justify-between items-end">
          <img
            src={user.avatar}
            alt={user.name}
            className="size-22 rounded-full"
          />
          <div className="w-32">
            {isMe && (
              <Link href={`/${user.slug}/edit`}>
                <Button label="Editar perfil" size={2} />
              </Link>
            )}
            {!isMe && <Button label="Seguir" size={2} />}
          </div>
        </div>
        <div className="px-6 mt-4">
          <div className="text-xl font-bold">{user.name}</div>
          <div className="text-gray-500">@{user.slug}</div>
          <div className="py-2 text-lg text-gray-500">{user.bio}</div>
          {user.link && (
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faLink} className="size-5" />
              <Link target="_blank" className="text-blue-300" href={user.link}>{user.link}</Link>
            </div>
          )}
          <div className="my-5 flex gap-6">
            <div className="text-gray-500"><span className="font-bold text-white">99</span> Seguindo</div>
            <div className=" text-gray-500"><span className="font-bold text-white">99</span> Seguidores</div>
          </div>
        </div>
      </section>
      <ProfileFeed/>
    </div>
  );
}
