import { useEffect, useState } from 'react';
import { Table, Space, Button, Popconfirm, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getUser, deleteUser } from '../../api/api';
import SpinOverlay from '../../components/style/spin';

const HomeIndex = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleView = (userId) => {
    navigate('/details', { state: { userId: userId } });
  };
  
  const handleDelete = async (userId) => {
    try {
      const response = await deleteUser(Number(userId));
      if (response.data.success) {
        message.success('Item deleted successfully!');
        window.location.reload();
      } else {
        message.error('Failed to delete item.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Something went wrong. Please try again later.');
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: 'index', 
      key: 'index',
    },
    {
      title: t('page.Home.name'),
      dataIndex: 'name', 
      key: 'name',
    },
    {
      title: t('page.Home.email'),
      dataIndex: 'email', 
      key: 'email',
    },
    {
      title: t('page.Home.created'),
      dataIndex: 'created_at', 
      key: 'created_at',
    },
    {
      title: t('page.Home.action'),
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            ghost  
            style={{  marginRight: '10px' }} onClick={() => handleView(record.key)} >{t('common.view')}</Button>
          <Popconfirm
              title={t('common.delete')}
              description={t('common.deleteDescription')}
              icon={
              <QuestionCircleOutlined
                  style={{
                  color: 'red',
                  }}
              />
              }
              onConfirm={() => handleDelete(record.key)}  
          >
          <Button danger>{t('common.delete')}</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const formatDate = (dateStr) => `${new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${new Date(dateStr).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
  
  useEffect(() => {
    getUser()
      .then((response) => {
        if (response.data.success) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);

          let filteredData = response.data.data.map((item, index) => ({
            key: item.id || index, 
            index: index+=1,
            name: item.name,
            email: item.email,
            created_at: formatDate(item.created_at), 
          }));
          setDataSource(filteredData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); 
  }, []);

  return (
    <div style={{ padding: 10 }}>
      <h1>{t('page.Home.userList')}</h1>
      <SpinOverlay loading={loading} t={(key) => key} />
        {loading ? (
          <div style={{ display: 'none' }} />
        ) : (
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            rowKey="key" 
            responsive="true"
            scroll={{ x: 'max-content' }}
          />
        )}
    </div>
  );
};

export default HomeIndex;
