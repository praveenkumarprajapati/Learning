import React from 'react';
import 'antd/dist/antd.dark.css';
import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;

function App() {
  return (
    <Layout>
      <Header 
        style={{
          height: '10vh'
      }}>
        Header
      </Header>
      <Layout
        style={{
          height: '90vh'
      }}
      >
        <Sider className="slider">Sider</Sider>
        <Content className="content">Content</Content>
      </Layout>
    </Layout>
  );
}

export default App;
