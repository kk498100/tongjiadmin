import { Form } from '@arco-design/web-react'
import { useEffect, useRef, useState } from 'react'
import { fetchMiniprogramList, fetchMiniprogramQuestionList } from '@/api/user.js'
import { useMiniprogramStore } from '@/store/user.js'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
    TitleComponent,
    LegendComponent,
    TooltipComponent
} from 'echarts/components'
import {
    LabelLayout
} from 'echarts/features'
import {
    SVGRenderer
} from 'echarts/renderers'
import { useLocation, useNavigate } from 'react-router-dom'

echarts.use([
    TitleComponent,
    LabelLayout,
    SVGRenderer,
    PieChart,
    LegendComponent,
    TooltipComponent
])

export const useMiniProgram = () => {
    const searchFormSetting = [
        {
            title: '条件检索：',
            key: 'name',
            children: [
                {
                    label: '用户姓名:',
                    type: 'input',
                    key: 'name',
                    field: 'name',
                    placeholder: '请输入用户姓名'
                },
                {
                    label: '用户手机号:',
                    type: 'input',
                    key: 'phone',
                    field: 'phone',
                    placeholder: '请输入用户手机号'
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
                phone = null
            } = formData

            const {
                total: a = 0,
                list: b = []
            } = await fetchMiniprogramList({
                pageSize,
                pageIndex,
                name,
                phone,
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
        pageIndex
    }
}

export const useDrawer = () => {
    const drawerVisible = useMiniprogramStore(state => state.drawerVisible)
    const setDrawerVisible = useMiniprogramStore(state => state.setDrawerVisible)
    const { pathname } = useLocation()
    const closeDrawer = () => {
        setDrawerVisible(false)
    }

    useEffect(() => {
        closeDrawer()
    }, [pathname])

    return {
        drawerVisible,
        closeDrawer
    }
}

export const useEcharts = () => {
    const drawerVisible = useMiniprogramStore(state => state.drawerVisible)
    const echartsRef = useRef(null)
    const [userEcharts, setUserEcharts] = useState(null)
    const userInfo = useMiniprogramStore(state => state.userInfo)
    const [echartsLoading, setEchartsLoading] = useState(false)
    const [userQuestionList, setUserQuestionList] = useState([])

    const navigate = useNavigate()

    const getUserQuestionList = async id => {
        try {
            if (echartsLoading) return
            setEchartsLoading(true)
            const res = await fetchMiniprogramQuestionList({ id })
            setUserQuestionList(res)
        } catch (e) {
            console.log(e)
        } finally {
            setEchartsLoading(false)
        }
    }

    useEffect(() => {
        if (drawerVisible) {
            const { id } = userInfo
            getUserQuestionList(id)
            const options = {
                render: 'svg',
                title: {
                    text: `个人问卷详情 - ${ userInfo.name }`
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br /> {b} <br /> 总数：{c} <br /> 占比：{d}%'
                }
            }
            const e = echarts.init(echartsRef.current)
            e.setOption(options)
            setUserEcharts(e)
        }
        return () => userEcharts && userEcharts.dispose()
    }, [drawerVisible])

    useEffect(() => {
        if (drawerVisible) {
            const echartsData = {}
            userQuestionList.map(v => {
                echartsData[v.title] = {
                    name: v.title,
                    value: echartsData[v.title] ? echartsData[v.title].value + 1 : 1
                }
            })
            const options = {
                series: [{
                    type: 'pie',
                    data: Object.values(echartsData),
                    radius: '50%',
                    stillShowZeroSum: false,
                    name: '问卷',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }],
                legend: {
                    orient: 'vertical',
                    left: 'right'
                }
            }
            userEcharts && userEcharts.setOption(options, { replaceMerge: ['series', 'legend'] })

            if (userEcharts) {
                userEcharts.on('click', params => {
                    const {
                        data: {
                            name
                        }
                    } = params
                    navigate(`/question/list?userName=${ userInfo.name }&questionName=${ name }`)
                })
            }
        }
    }, [userQuestionList])

    return {
        echartsRef
    }
}