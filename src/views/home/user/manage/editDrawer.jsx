import { useDrawerEdit } from './useManage.js'
import { Drawer, Form, Input } from '@arco-design/web-react'
import { useEffect, useState } from 'react'

const EditDrawer = props => {
    const {
        tableFresh
    } = props

    const {
        visible,
        drawerTitle,
        drawerClose,
        drawerConfirm,
        drawerLoading,
        form
    } = useDrawerEdit(tableFresh)

    return <Drawer
        width={ 480 }
        visible={ visible }
        title={ drawerTitle }
        maskClosable={ true }
        onCancel={ drawerClose }
        onOk={ drawerConfirm }
        confirmLoading={ drawerLoading }
    >
        <Form
            layout={ 'vertical' }
            form={ form }>
            <Form.Item
                label='姓名：'
                field='name'
                rules={ [{ required: true, message: '请输入管理员姓名' }] }>
                <Input
                    type='text'
                    placeholder='请输入管理员姓名'
                    aria-autocomplete='none'
                />
            </Form.Item>

            <Form.Item
                label='昵称：'
                field='nick'
            >
                <Input
                    type='text'
                    placeholder='请输入管理员昵称'
                    aria-autocomplete='none'
                />
            </Form.Item>

            <Form.Item
                label='手机号：'
                field='phone'
                rules={ [{ required: true, message: '请输入管理员手机号' }] }>
                <Input
                    type='text'
                    placeholder='请输入管理员手机号'
                    aria-autocomplete='none'
                />
            </Form.Item>
        </Form>
    </Drawer>
}

export default EditDrawer