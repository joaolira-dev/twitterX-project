import { user } from "@/data/user"
import { SuggestionItem, SuggestionItemSkeleton } from "./suggestion-item"


export const SuggestionArea = () => {
   return (
      <div className="bg-gray-700 rounded-3xl">
         <h2 className="text-xl p-6">Quem seguir</h2>
         <div className="flex flex-col gap-4 p-6 pt-0">
            <SuggestionItem user={user} />
            <SuggestionItemSkeleton/>
         </div>
      </div>
   )
}