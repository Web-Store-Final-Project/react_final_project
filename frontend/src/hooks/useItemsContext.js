import { ItemsContext } from "../context/ItemsContext";
import { useContext } from "react";

export const useItemsContext = ()=>{
    const context = useContext(ItemsContext)
    
    if(!context){
        throw Error('yoyoyo you have a problem(useItemContext MUST BE USED INSIDE ItemsContextProvider)')
    }
    return context 
}