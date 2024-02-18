import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import MainMenu from '../MainMenu/MainMenu';
import Loader from '../Loader/Loader';

const SharedLayout = () => {
  return (
    <>
      <MainMenu />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;