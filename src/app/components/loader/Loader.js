import React from 'react'
import styles from './loader.module.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { ConfigProvider } from 'antd';

export default function Loader() {
    return (
        <div className={styles.loader}>
            <ConfigProvider
                theme={{
                    token:{
                        colorPrimary : "#ffffff"
                    }
                }}>
                <Spin indicator={<LoadingOutlined spin />} size="large"/>
            </ConfigProvider>
        </div>
        
    )
}
