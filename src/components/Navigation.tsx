import { Outlet } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <h1>Navigation</h1>
      <Outlet />
    </div>
  );
};

export default Navigation;
