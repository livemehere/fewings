import { NavLink, Outlet, useLocation } from 'react-router';
import { css } from '@emotion/react';

const Layout = () => {
  const { search } = useLocation();

  return (
    <>
      <nav>
        <ul
          css={css`
            display: flex;
            gap: 40px;
          `}
        >
          <li>
            <NavLink to={'/' + search}>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/page2' + search}>Page2</NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
