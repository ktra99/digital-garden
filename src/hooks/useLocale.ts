import { useRouter } from "next/router";
import translation from "@src/translation.json"

export default function useLocale(text: string){
  const { locale } = useRouter()
  switch(locale){
    case "sv":
      return translation["sv" as keyof {}][text];
    default: 
      return text
  }
}