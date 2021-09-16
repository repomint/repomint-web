import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

import { parseOAuthCode } from './../../actions';


// TODO: use state for verification + dont redirect
export const OAuthCallbackView = () => {
  const [code, setCode] = useState<string>("")
  

  // TODO: is this something that can be initialized?
  //       or does this need to be implemented better?
  if (code === "") {
    const newCode = parseOAuthCode() || "";

    setCode(newCode);
  }
  
  return <Redirect to={`/?code=${code}`} />
};


