import { TweetItem } from "@/components/tweet/tweet-item";
import { HeaderGeral } from "@/components/ui/header-geral";
import { SearchInput } from "@/components/ui/search-input";
import { tweet } from "@/data/tweet";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    q: string | undefined;
  };
};
export default function Page({ searchParams }: Props) {
  if (searchParams.q) redirect("/");
  return (
    <div>
      <HeaderGeral backHref="/">
        <SearchInput defaultValue={searchParams.q} />
      </HeaderGeral>
      <div className="border-t-2 border-gray-900">
         <TweetItem tweet={tweet}/>
         <TweetItem tweet={tweet}/>
         <TweetItem tweet={tweet}/>
         <TweetItem tweet={tweet}/>
      </div>
    </div>
  );
};
