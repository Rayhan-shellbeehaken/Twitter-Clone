import styles from './loading.module.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { ConfigProvider } from 'antd';

export default function Loading() {
    return (
      <div className={styles["loading-container"]}>
        <ConfigProvider
            theme={{
                token:{
                    colorPrimary : "#ffffff"
                }
            }}>
            <Spin indicator={<LoadingOutlined spin />} size="large"/>
        </ConfigProvider>
      </div>
    );
  }
  