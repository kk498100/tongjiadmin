import { Form } from '@arco-design/web-react'
import { useEffect, useState } from 'react'
import { fetchManageList } from '@/api/user.js'

export const useManage = () => {
    const searchFormSetting = [
        {
            title: '状态检索：',
            key: 'status',
            children: [
                {
                    label: '管理员状态:',
                    type: 'select',
                    field: 'status',
                    key: 'status',
                    defaultValue: 0,
                    placeholder: '请选择状态',
                    options: [
                        {
                            label: '全部',
                            value: 0
                        },
                        {
                            label: '值班中',
                            value: 1
                        },
                        {
                            label: '休息中',
                            value: 2
                        }
                    ]
                }
            ]
        },
        {
            title: '条件检索：',
            key: 'name',
            children: [
                {
                    label: '管理员姓名:',
                    type: 'input',
                    key: 'name',
                    field: 'name',
                    placeholder: '请输入管理员姓名'
                },
                {
                    label: '手机号:',
                    type: 'input',
                    key: 'phone',
                    field: 'phone',
                    placeholder: '请输入管理员手机号'
                }
            ]
        },
        {
            title: '时间检索：',
            key: 'date',
            children: [
                {
                    label: '创建时间:',
                    type: 'rangePicker',
                    key: 'date',
                    field: 'date'
                }
            ]
        }
    ]

    const [flagGet, setFlagGet] = useState(0)
    const [flagInit, setFlagInit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [pageIndex, setPageIndex] = useState(1)
    const [formData, setFormData] = useState({})
    const [dataList, setDataList] = useState([])
    const [total, setTotal] = useState(0)
    const [requestLoading, setQuestLoading] = useState(true)
    const pageSize = 10

    const getTableData = async () => {
        try {
            if (!requestLoading) return
            setQuestLoading(false)
            if (flagInit) setLoading(true)
            const {
                name = null,
                status = 0,
                date = null,
                phone = null
            } = formData

            const {
                total: a = 0,
                list: b = []
            } = await fetchManageList({
                pageSize,
                pageIndex,
                name,
                status,
                phone,
                createStart: date ? new Date(date[0]).getTime() : null,
                createEnd: date ? new Date(date[1]).getTime() : null
            })

            setTotal(a)
            setDataList(b)
        } catch (e) {
            console.log(e)
        } finally {
            setFlagInit(true)
            setLoading(false)
            setQuestLoading(true)
        }
    }

    const [form] = Form.useForm()

    const resetForm = () => {
        form.resetFields()
    }

    const submit = async () => {
        const data = await form.validate()
        await setFormData(data)
        const flag = flagGet + 1
        setFlagGet(flag)
    }

    const pageChange = (pagination) => {
        const {
            current: a = 1
        } = pagination
        setPageIndex(a)
    }

    const tableFresh = () => {
        const flag = flagGet + 1
        setFlagGet(flag)
    }

    useEffect(() => {
        getTableData()
    }, [flagGet, pageIndex])

    return {
        searchFormSetting,
        resetForm,
        submit,
        form,
        flagInit,
        loading,
        dataList,
        total,
        pageChange,
        pageIndex,
        tableFresh
    }
}