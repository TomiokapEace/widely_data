import {useModel} from "@@/exports";
import {getItem} from "@/models/global";



export default (initialState: any) => {

  const isAdmin=()=> {
    if (getItem()==null)
     return initialState.isAdmin;
    else
      return getItem().isAdmin;
  }
  return {
    isAdmin
  };
};
