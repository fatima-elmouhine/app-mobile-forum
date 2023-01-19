import { Layout } from 'antd'
import { useContext, useState } from 'react'
import { AuthenticationContext } from '../../contexts/AuthenticationContext'
import SideMenuProvider from '../../contexts/SideMenuContext'
import FooterComponent from './FooterComponent'
import MainContent from './MainContent'
import NavBar from './NavBar'
import SideMenu from './SideMenu'

const LayoutTemplate = () => {
  const { isAuthenticated } = useContext(AuthenticationContext)
  const [isCollapsedSideMenu, setIsCollapsedSideMenu] = useState(false)

  return (
    <Layout>
      <SideMenuProvider value={{ isCollapsedSideMenu, setIsCollapsedSideMenu }}>
      <NavBar/>
        <Layout style={{ backgroundColor: '#FAFAFA' }}>
          {isAuthenticated && <SideMenu/>}
          <MainContent/>
        </Layout>
      <FooterComponent/>
      </SideMenuProvider>
    </Layout>

  )
}
export default LayoutTemplate