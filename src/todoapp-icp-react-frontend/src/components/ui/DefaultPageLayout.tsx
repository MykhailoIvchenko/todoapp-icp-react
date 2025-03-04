import { ReactChildren } from '../../utils/types';

interface IDefaultPageLayoutProps {
  children: ReactChildren;
}

const DefaultPageLayout: React.FC<IDefaultPageLayoutProps> = ({ children }) => {
  return <div className='default-page-layout'>{children}</div>;
};

export default DefaultPageLayout;
