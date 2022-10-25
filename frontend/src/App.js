import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsPage from "./components/Spots";
import EditSpotForm from "./components/Spots/EditSpotForm";
import SpotForm from "./components/Spots/SpotForm";
import SpotDetail from "./components/Spots/SpotDetail";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={SpotsPage} />
          <Route path="/signup" component={SignupFormPage} />
          <Route exact path="/spots/:spotId" component={SpotDetail} />
          <Route path="/spots" component={SpotForm} />
          <Route path="/spots/:spotId/edit" component={EditSpotForm} />
        </Switch>
      )}
    </>
  );
}

export default App;
