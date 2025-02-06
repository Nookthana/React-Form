import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getUserDetail, updateUser } from '../../api/api';
import { emailValidate, inputValidate } from './User';
import { Skeleton, Image, Row, Col, Typography, Input, Button, message, Popconfirm, Spin } from 'antd';

const { Title, Text } = Typography;

const Details = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { userId } = location.state || {};
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    validateName: false,
    email: '',
    validateEmail: false,
  });

  useEffect(() => {
    if (!userId) return;
    async function fetchData() {
      try {
        const response = await getUserDetail(Number(userId));
        if (response.data.success) {
          setUserData(response.data.data);
          setFormData(response.data.data);
        } else {
          console.error('Error:', response.data.message ?? '');
        }
      } catch (error) {
        console.error('Error fetching data:', error ?? '');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const type = e.target.getAttribute('data-type');
    const validate = type == 'email' ? 'validateEmail' : 'validateName';
    const isValid = type == 'email' ? emailValidate(value) : inputValidate(value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [validate]: isValid,
    }));
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    console.log('formData : ', formData);
  };

  const handleSave = async (userId) => {
    if (!formData.validateName || !formData.validateEmail) {
      message.error('Please fill in all fields correctly.');
      return;
    } else {
      try {
        setLoading(true);
        const response = await updateUser(formData);
        if (response.data.success) {
          setLoading(false);
            message.success('data is update success');
            window.location.reload();
        } else {
          console.error('Error:', response.data.message ?? '');
        }
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error ?? '');
      } finally {
        setLoading(false);
      }
    }
    console.log('Save user data for ID:', userId);
  };

  return (
      <div style={styles.pageContainer}>
        <Title level={3} style={styles.title}>
          {t('page.Home.userDetail')}
        </Title>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} lg={8}>
            {loading ? (
              <Skeleton.Image active style={{ width: '100%', height: 200 }} />
            ) : (
              <Image
                width="100%"
                height={200}
                src="https://picsum.photos/200/300?random=1"
                alt="User Avatar"
                style={styles.image}
              />
            )}
          </Col>
          <Col xs={24} sm={12} lg={16}>
            <div style={styles.textContainer}>
              <Row style={styles.infoRow}>
                <Col span={8}>
                  <Text strong>{t('page.Home.name')} : </Text>
                </Col>
                <Col span={16}>
                  {editMode ? (
                    <>
                      <Input
                        name="name"
                        style={{
                          width: '100%',
                          borderColor: formData.hasOwnProperty('validateName') && formData.validateName ? '' : 'red', 
                        }}
                        value={formData.name}
                        onChange={handleInputChange}
                        data-type="name"
                      />
                      <span
                        style={{
                          display: formData.hasOwnProperty('validateName') && formData.validateName ? 'none' : 'block',
                          paddingTop: '3px',
                          color: 'red',
                        }}
                      >
                        {t('common.invalid')}
                      </span>
                    </>
                  ) : (
                    <Text>{userData.name}</Text>
                  )}
                </Col>
              </Row>
              <Row style={styles.infoRow}>
                <Col span={8}>
                  <Text strong>{t('page.Home.email')} : </Text>
                </Col>
                <Col span={16}>
                  {editMode ? (
                    <>
                      <Input
                        name="email"
                        style={{
                          width: '100%',
                          borderColor: formData.hasOwnProperty('validateEmail') && formData.validateEmail ? '' : 'red', 
                        }}
                        value={formData.email}
                        onChange={handleInputChange}
                        data-type="email"
                      />
                      <span
                        style={{
                          display: formData.hasOwnProperty('validateEmail') && formData.validateEmail ? 'none' : 'block',
                          paddingTop: '3px',
                          color: 'red',
                        }}
                      >
                        {t('common.invalid')}
                      </span>
                    </>
                  ) : (
                    <Text>{userData.email}</Text>
                  )}
                </Col>
              </Row>
              <Row style={styles.infoRow}>
                <Col span={8}>
                  <Text strong>{t('page.Home.created')} : </Text>
                </Col>
                <Col span={16}>
                  <Text>{userData.created_at}</Text>
                </Col>
              </Row>
              <div style={styles.buttonContainer}>
                <Button onClick={toggleEditMode} style={{ marginRight: '10px' }}>
                  {editMode ? 'Cancel' : 'Edit'}
                </Button>
                {editMode && (
                  <Popconfirm
                    title="Are you sure you want to save the changes?"
                    onConfirm={() => handleSave(userId)}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary">Save</Button>
                  </Popconfirm>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
  );
};

const styles = {
  pageContainer: {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  image: {
    objectFit: 'cover',
    borderRadius: '8px',
  },
  textContainer: {
    paddingTop: '10px',
  },
  infoRow: {
    marginBottom: '10px',
    textAlign: 'left',
  },
  buttonContainer: {
    marginTop: '20px',
  },
};

export default Details;
