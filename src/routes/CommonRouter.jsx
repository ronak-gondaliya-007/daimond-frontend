import React from 'react'
import { LAYOUTS } from '../constant';
import Layout from '../components/layout/Layout';
import { Outlet } from 'react-router-dom';
import DashboardLayout from 'components/layout/DashboardLayout';

const CommonRouter = ({
    title,
    layout,
    breadcrumb
}) => {

    const { MAIN, DASHBOARD_LAYOUT } = LAYOUTS;

    function getLayout() {
        switch (layout) {
            case MAIN:
                return (
                    <Layout breadcrumb={breadcrumb}>
                        <Outlet />
                    </Layout>
                )

            case DASHBOARD_LAYOUT:
                return (
                    <DashboardLayout breadcrumb={breadcrumb}>
                        <Outlet />
                    </DashboardLayout>
                )

            default:
                return <Outlet />
        }
    }

    return (
        (getLayout())
    )
}

export default CommonRouter