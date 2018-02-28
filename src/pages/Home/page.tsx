import * as React from "react";
import { Redirect } from 'react-router'
import { rootRoute } from '@/common/route'
class HomePage extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <div>
                <Redirect to={rootRoute} />
            </div>
        );
    }
}

export default HomePage;
