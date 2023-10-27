import React from 'react'
import { NavLink } from 'react-router-dom'
import { Typography, Row, Col, Space, Button } from 'antd'
import styles from './Page.module.css'
import { useLang } from './LanguageProvider'

const { Title } = Typography
const active = ({ isActive }) => isActive ? styles.active : ''

export function Page ({ children, title }) {
  const { lang, toggleLang } = useLang(); 

  return (
    <>
      <Row justify="center">
        <Col>
          <Space>
            <NavLink to="/" className={active} end>Orders</NavLink>
            <NavLink to="/waiters" className={active}>Waiters</NavLink>
            <NavLink to="/dishes" className={active}>Dishes</NavLink>
            <NavLink to="/tables" className={active}>Tables</NavLink>
            <Button style={{ marginLeft: '10px',}} onClick={toggleLang}>Toggle Lang</Button>
          </Space>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Title>{title}</Title>
          {children}
        </Col>
      </Row>
    </>
  )
}

