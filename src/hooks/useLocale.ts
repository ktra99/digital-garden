import { useRouter } from "next/router";
import translation from "@src/translation.json"

export default function useLocale(){
  const { locale } = useRouter()
  return function translate(text: string){
    switch(locale){
      case "sv":
        return translation["sv" as keyof {}][text];
      default: 
        return text
    }
  }
}