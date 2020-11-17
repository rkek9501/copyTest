import React, { createContext, useState, useReducer, useEffect, useCallback } from "react";
import { testReducer, initialTestState } from '../reducer/test';
// import Spinner from "../components/spinner";
// import moment from "moment";
// moment.locale("ko");

export const AppContext = createContext({
  session: false,
  loadMask: false,
});

export const AppProvider = props => {
  // const [session, setSession] = useState(false);
  // const [loadMask, setLoadMask] = useState(false);
  const [test, dispatchTest] = useReducer(testReducer, initialTestState);

  const values = {
    // session,
    // setSession,
    // loadMask,
    // setLoadMask,
    test,
    dispatchTest
  };
  return (
    <AppContext.Provider value={values}>
      {props.children}
      {/* {loadMask && (
        <Modal className="load-mask-modal" contentLabel="Load Mask Modal" isOpen={loadMask} shouldCloseOnOverlayClick={false}>
          <Spinner />
        </Modal>
      )} */}
    </AppContext.Provider>
  );
};
