import { Form } from '@arco-design/web-react'
import { useEffect, useState } from 'react'
import { fetchQuestionList } from '@/api/question.js'

export const useList = () => {
    const searchFormSetting = [
        {
            title: '状态检索：',
            key: 'status',
            children: [
                {
                    label: '问卷状态:',
                    type: 'select',
                    key: 'status',
                    field: 'status',
                    placeholder: '请选择问卷状态',
                    defaultValue: 0,
                    options: [
                        {
                            label: '全部',
                            value: 0
                        },
                        {
                            label: '未启用',
                            value: 1
                        },
                        {
                            label: '启用中',
                            value: 2
                        },
                        {
                            label: '已失效',
                            value: 3
                        }
                    ]
                },
                {
                    label: '问卷类型:',
                    type: 'select',
                    key: 'type',
                    field: 'type',
                    placeholder: '请选择问卷状态',
                    defaultValue: '',
                    options: [
                        {
                            label: '全部',
                            value: ''
                        },
                        {
                            label: '不重要',
                            value: 0
                        },
                        {
                            label: '重要',
                            value: 1
                        }
                    ]
                },
                {
                    label: '是否需要图片:',
                    type: 'select',
                    key: 'needImg',
                    field: 'needImg',
                    placeholder: '请选择是否需要图片',
                    defaultValue: '',
                    options: [
                        {
                            label: '全部',
                            value: ''
                        },
                        {
                            label: '不需要',
                            value: false
                        },
                        {
                            label: '需要',
                            value: true
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
                    label: '问卷名:',
                    type: 'input',
                    key: 'title',
                    field: 'title',
                    placeholder: '请输入问卷名'
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
                status = 0,
                type = null,
                needImg = null,
                title = null,
                date = null
            } = formData

            const {
                total: a = 0,
                list: b = []
            } = await fetchQuestionList({
                pageSize,
                pageIndex,
                type,
                status,
                needImg,
                title,
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

    const formInit = () => {
        form.resetFields()
        const params = {}
        searchFormSetting.map(v => v.children?.length && v.children?.map(e => {
            (typeof e.defaultValue !== 'undefined') && (params[e.field] = e.defaultValue)
        }))
        form.setFieldsValue(params)
    }

    useEffect(() => {
        formInit()
    }, [])

    const resetForm = () => {
        formInit()
    }

    const submit = async () => {
        tableFresh()
    }

    const pageChange = (pagination) => {
        const {
            current: a = 1
        } = pagination
        setPageIndex(a)
    }

    const tableFresh = async () => {
        const data = await form.validate()
        await setFormData(data)
        setPageIndex(1)
        setFlagGet(Math.random())
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