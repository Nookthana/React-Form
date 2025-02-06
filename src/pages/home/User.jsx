import { useState, useRef } from 'react';
import { Input, Row, Col, DatePicker, Button, message } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../api/api'; 
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

export const emailValidate = (email) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

export const inputValidate = (value) => {
  const pattern = /^[a-zA-Z]+$/;
  return pattern.test(value);
};

const User = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDay: '',
  });

  const [formInput, setFormInput] = useState({ firstName: false, lastName: false });
  const [selectedDate, setSelectedDate] = useState(true);
  const formRef = useRef('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const validateInputForm = (e) => {
    const value = e.target.value;
    const type = e.target.getAttribute('data-type');
    setFormData({ ...formData, [type]: e.target.value })
    setFormInput({
      ...formInput,
      [type]: (type == 'email') ? !emailValidate(value) : !inputValidate(value),
    });
  };

  const fieldsForm = [
    { placeholder: 'First Name', inputType: 'firstName', type: "text" },
    { placeholder: 'Last Name', inputType: 'lastName', type: "text" },
    { placeholder: 'User Name', inputType: 'userName', type: "text" },
    { placeholder: 'Password', inputType: 'password', type: "password" },
    { placeholder: 'Email', inputType: 'email', type: "email" },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date != null);
  };

  const success = (massage) => {
    messageApi.open({
      type: 'success',
      content: massage,
    });
  };

  const alertError = (massage) => {
    messageApi.open({
      type: 'error',
      content: massage.response.data.message || massage,
    });
  };

  const warning = (massage) => {
    messageApi.open({
      type: 'warning',
      content: massage,
    });
  };

  const formSubmit =  async (e) => {
    e.preventDefault();
    const inputs = formRef.current.querySelectorAll('input');
    const newFormInput = { ...formInput };
    let hasRedBorder = false;

    inputs.forEach((input) => {
      const type = input.dataset.type;
        if (type != undefined) {
          const isValid = (type == 'email') ? emailValidate(input.value) : inputValidate(input.value);
          newFormInput[type] = !isValid;
          if (!isValid) hasRedBorder = true;
        }
    });
 
    setFormInput(newFormInput);
      if (!hasRedBorder && selectedDate) {
        try {
          setLoading(true); 
          const { data } = await api.post(`/setUser`, formData);

          if (data.success) {
            setLoading(false);
            success(data.message);
            setTimeout(() => {
              navigate('/home');
            }, 2000);
          } else {
            setLoading(false);
            warning(data.message);
          }
       
        } catch (error) {
            console.log('error : ', error);
            alertError(error);
            setLoading(false); 
        }
      }        
  };

  return (
    <>
      {contextHolder}
      <form onSubmit={formSubmit} ref={formRef}>
          <Row gutter={16} style={{ paddingBottom: '20px' }}>
            {fieldsForm.map((input, index) => (
              <Col 
                xs={24} sm={12} md={8} 
                key={input.inputType}  
                style={{ paddingTop: index != 0 ? '1px' : '0', paddingBottom: '10px' }}  
              >
                <Input
                  type={input.type}
                  style={{ width: '100%', borderColor: formInput[input.inputType] ? 'red' : '' }}
                  placeholder={t('common.' + input.placeholder.charAt(0).toLowerCase() + input.placeholder.slice(1).replace(/\s+/g, ''))}
                  data-type={input.inputType}
                  value={formData[input.inputType]}
                  onChange={validateInputForm}
                />
                <span
                  style={{ display: formInput[input.inputType] ? 'block' : 'none', paddingTop: '3px', color: 'red' }}
                  className="validateInput"
                >
                  {t('common.invalid')}
                </span>
              </Col>
            ))}

            <Col xs={24} sm={12} md={8}>
              <DatePicker
                placeholder={t('common.date')}
                style={{ borderColor: selectedDate ? '' : 'red', width: '100%' }}
                defaultValue={dayjs('2019-09-03', dateFormat)}
                onChange={handleDateChange}
                minDate={dayjs('2019-08-01', dateFormat)}
                maxDate={dayjs('2020-10-31', dateFormat)}
              />
              <br />
              <span style={{ display: selectedDate ? 'none' : 'block', paddingTop: '3px', color: 'red' }}>
                {t('common.invalid')}
              </span>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            {t('common.submit')}
          </Button>
        </form>
    </>
  );
};

export default User;
