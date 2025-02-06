// src/i18n.js
import Password from 'antd/es/input/Password';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language translations
const resources = {
  en: {
    translation: {
     common: {
        submit: 'Submit',
        home: 'Home',
        about: 'About',
        contact: 'Contact',
        invalid: 'Invalid Data',
        firstName: 'first Name',
        lastName: 'last Name',
        date: 'Select Date',
        userName: 'User Name',
        password: 'Password',
        email: 'Email',
        user: 'User Information',
        loading: 'Loading...',
        delete: 'Delete',
        edit: 'Edit',
        deleteDescription: 'Are you sure to delete this row ?',
        view: 'View',
     },
     page: {
      Home : {
        userList: 'User list',
        name: 'Name',
        email: 'Email',
        created: 'Created',
        userDetail: 'User Information',
        action: 'Action',
      }
     }
    }
  },
  th: {
    translation: {
      common: {
        submit: 'บันทึกข้อมูล',
        home: 'หน้าแรก',
        about: 'เกี่ยวกับ',
        contact: 'ติดต่อ',
        invalid: 'ข้อมูลไม่ถูกต้อง',
        firstName: 'ชื่ิอ',
        lastName: 'นามสกุล',
        date: 'เลือกวันที่',
        userName: 'ชื่อผู้ใช้',
        password: 'รหัสผ่าน',
        email: 'อีเมล',
        user: 'ข้อมูลผู้ใช้',
        loading: 'กำลังโหลด...',
        delete: 'ลบ',
        edit: 'แก้ไช',
        deleteDescription: 'คุณแน่ใจหรือว่าจะลบแถวนี้ ?',
        view: 'ดู',
     },  
     page: {
      Home : {
        userList: 'รายชื่อผู้ใช้',
        name: 'ชื่อ',
        email: 'อีเมล',
        created: 'วันที่สร้าง',
        userDetail: 'หน้ารายละเอียด',
        action: 'การกระทำ',
      }
     }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',  
  interpolation: {
    escapeValue: false 
  }
});

export default i18n;
