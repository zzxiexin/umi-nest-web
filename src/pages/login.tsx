import { Button, Form, Input } from 'antd';
import { login, profile } from '@/services/api'
import { history } from 'umi'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const App: React.FC = () => {
  const [form] = Form.useForm();

  // 登陆
  const onFinish = async () => {
    await form.getFieldsValue();
    const params = form.getFieldsValue();
    const result = await login(params);
    if((result as any)?.['access_token']){
        localStorage.setItem('access_token', (result as any)?.['access_token'])
        history.push('/user')
    }
    const res = await profile();
    console.log('res', res)
    console.log('Success:', result);
  };
  return <Form
    form={form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
};

export default App;