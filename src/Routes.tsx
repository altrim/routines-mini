import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Switch, useLocation } from 'react-router-dom';
import { PageTransition } from './PageTransition';
import { Routines } from './Routines';
import { RoutineTasks } from './RoutineTasks';

export const Routes = () => {
  const [direction, setDirection] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setDirection(location.pathname.includes('routine') ? 1 : -1);
  }, [location]);

  return (
    <AnimatePresence initial={false} exitBeforeEnter custom={direction}>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/routine/:id">
          <PageTransition direction={direction}>
            <RoutineTasks />
          </PageTransition>
        </Route>
        <Route exact path="/">
          <PageTransition direction={direction}>
            <Routines />
          </PageTransition>
        </Route>
      </Switch>
    </AnimatePresence>
  );
};
