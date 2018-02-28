import * as React from "react"
import { Layout, Menu, Icon as Icon2 } from "antd"
import { Icon } from 'react-fa'
import { Link } from "react-router-dom"
import "./Sidebar.less"
import { sideBar } from '../common/route'
interface SidebarState {
    collapsed: boolean
    mode: "vertical" | "inline" | "horizontal" | undefined
}

interface SidebarProps { }

class Sidebar extends React.Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props);
        this.state = {
            collapsed: false,
            mode: "inline",
        };
    }

    public render(): JSX.Element {
        return (
            <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.toggle}>
                <div className="ant-layout-logo" />
                <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={["1"]}>
                    {
                        sideBar.map((v, k) => {
                            if (v['sidebarChild'] && v['sidebarChild'] instanceof Array)
                                return (
                                    <Menu.SubMenu key={v.sidebarIcon} title={<span><Icon name={v.sidebarIcon} /><span>{v.sidebar}</span></span>}>
                                        {
                                            v['sidebarChild'].map((vv, kk) =>
                                                <Menu.Item key={vv['path']}>
                                                    <Link to={vv['path']}>
                                                        {vv.sidebar}
                                                    </Link>
                                                </Menu.Item>
                                            )
                                        }
                                    </Menu.SubMenu>
                                )
                            else
                                return (
                                    <Menu.Item key={v['path']}>
                                        <Link to={v['path']}>
                                            <Icon name={v.sidebarIcon} />
                                            <span className="nav-text">{v.sidebar}</span>
                                        </Link>
                                    </Menu.Item>
                                )
                        })
                    }
                </Menu>
                <div className="sider-trigger">
                    <Icon2
                        className="trigger"
                        type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                        onClick={this.toggle} />
                </div>
            </Layout.Sider>
        );
    }

    private toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: !this.state.collapsed ? "vertical" : "inline",
        });
    }
}

export default Sidebar;
