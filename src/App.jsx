import { useState, useEffect } from 'react';
import { Layout, Menu, Button, Row, Col, theme, Dropdown, Space } from 'antd';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined, HomeOutlined } from '@ant-design/icons';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import './style/spin.css'; 
import './style/skeleton.css'; 
import UserDetail from './pages/home/UserDetail';
import SpinOverlay from './components/style/spin';
import User from './pages/home/User';
import Home from './pages/home/Home';
import About from './pages/home/About';

const { Header, Sider, Content } = Layout;
dayjs.extend(customParseFormat);

const App = () => {
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('EN');
  const [loading, setLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      setSelectedLabel(selectedItem.label); 
      switchLanguage(selectedItem.value);
    }
  };

  const items = [
    {
      label: 'ไทย',
      key: '1',
      value: 'th'
    },
    {
      label: 'English',
      key: '2',
      value: 'en'
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#ffffff' }}>
          <div className="demo-logo-vertical" />
          <Menu mode="inline" defaultSelectedKeys={['1']} items={[
              { key: '1', icon: <HomeOutlined />, label: <Link to="/home">{t('common.home')}</Link> },
              { key: '2', icon: <UserOutlined />, label: <Link to="/">{t('common.user')}</Link> },
              { key: '3', icon: <VideoCameraOutlined />, label: <Link to="/about">{t('common.about')}</Link> },
              { key: '4', icon: <UploadOutlined />, label: <Link to="/contact">{t('common.contact')}</Link> },  
            ]} />
        </Sider>
        <Layout>
          <Header
            style={{
              background: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 20px', 
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Row justify="end" style={{ flexGrow: 1 }} gutter={[8, 8]}>
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    {selectedLabel} 
                  </Space>
                </Button>
              </Dropdown>
            </Row>
          </Header>
          
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<User />} />
              <Route path="/home" element={<Home />} />
              <Route path="/details" element={<UserDetail />} />
              <Route path="/about" element={<About />}  />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
