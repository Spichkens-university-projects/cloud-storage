import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useActions } from '../hooks/useActions';

import { TypeComponentAuthFields } from './private-route.interface';

const DynamicCheckAuth = dynamic(() => import('./CheckAuth'), {
    ssr: false,
});

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
    children,
    Component: { isPrivatePage },
}) => {
    const { replace } = useRouter();
    const { refresh } = useActions();

    useEffect(() => {
        refresh(null);
        replace('/');
    }, []);

    return !isPrivatePage ? (
        <>{children}</>
    ) : (
        <DynamicCheckAuth Component={{ isPrivatePage }}>
            {children}
        </DynamicCheckAuth>
    );
};

export default AuthProvider;
