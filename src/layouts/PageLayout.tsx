import * as React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Header } from "./Header";
// import { renderRoutes } from "react-router-config";
import "./PageLayout.less";


const PageLayout: React.StatelessComponent<{}> = (props) => {
    return (
        <Layout className="ant-layout-has-sider">
            <Sidebar />
            <Layout>
                <Layout.Content style={{ height: '100%' }}>
                    <Header />
                    {props['children']}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default PageLayout;
