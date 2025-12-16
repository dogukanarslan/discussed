import React, {useEffect, useState} from 'react';

interface Props {
  children: Record<string, React.ReactNode>;
}

export const Router = (props: Props) => {
  const {children} = props;

  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return children[route];
};
