
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function SideBar () {
    return (
    <div style={{ display: 'flex', height: '100%', minHeight: '600px' }}>
      <Sidebar>
      <Menu>
        <SubMenu label="task 1">
          <MenuItem> sub-task 1 </MenuItem>
          <MenuItem> sub-task 2 </MenuItem>
        </SubMenu>
        <MenuItem> task 2 </MenuItem>
        <MenuItem> task 3 </MenuItem>
      </Menu>
      </Sidebar>
      </div>
    );
}

export default SideBar