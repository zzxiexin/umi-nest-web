import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, insertUser } from '@/services/api';
import { Table, Button, Form, Modal , Input} from 'antd'

const UserPage = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState<unknown[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  // 获取所有用户
  const getUsers = async () => {
    const res = await getAllUsers();
    setUsers(res as unknown[])
    console.log('res', res)
  }

  // 新增用户
  const addNewUser = () => {
    setOpen(true);
  }
  // 提交新增
  const submit = async () => {
    const params = form.getFieldsValue();
    const res = await insertUser(params);
    setOpen(false)
    getUsers();
  }
  // 删除用户
  const deleteUsers = async (record) => {
    const res = await deleteUser({id : record?.id})
    getUsers();
    console.log('11', res)
  }
  useEffect(() => {
    getUsers()
  }, [])

  const columns = [
    {
      title: '用户id',
      key: 'id',
      dataIndex: "id"
    },
    {
      title: '用户名',
      key: 'username',
      dataIndex: "username"
    },
    {
      title: '密码',
      key: 'password',
      dataIndex: "password"
    },
    {
      title: '是否禁用',
      key: 'isActive',
      dataIndex: "isActive",
      render: (isActive: number) => isActive ? '否' : '是', 
    },
    {
      title: '删除',
      key: 'delete',
      dataIndex: 'delete',
      render: (text, record) => <Button type="link" onClick={() => deleteUsers(record)}>删除</Button>
    }
  ]
  return (
    <>
      <Modal title="新增用户" open={open} footer={null} onCancel={() => setOpen(false)}>
        <Form form={form} onFinish={submit}>
          <Form.Item label="用户名" name="username" rules={[{required: true, message: '请输入用户名'}]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="用户密码" name="password" rules={[{required: true, message: '请输入用户密码'}]}>
            <Input placeholder="请输入用户密码" />
          </Form.Item>
          <Button htmlType="submit" type="primary">新增</Button>
        </Form>
      </Modal>
      <Button type="primary" onClick={addNewUser}>新增用户</Button>
      <Table dataSource={users} columns={columns} />
    </>
  );
};

export default UserPage;
