import { DatePicker, Divider, Form, Input, Select, Space } from '@arco-design/web-react'
import styles from './index.module.scss'

const SearchFormItem = props => {
    const {
        item: a = []
    } = props

    return a.map(v => <Form.Item
        style={ { marginBottom: 0 } }
        key={ v.key }
        field={ v.field }
        label={ v.label }
        labelAlign='right'
        className={ styles.formItem }
    >
        { () => {
            switch (v.type) {
                case 'select':
                    return <Select
                        placeholder={ v.placeholder }
                        defaultValue={ v.defaultValue }
                        style={{ width: '120px' }}
                    >
                        { v.options.map(i => <Select.Option
                            key={ i.value }
                            value={ i.value }>
                            { i.label }
                        </Select.Option>) }
                    </Select>
                case 'input':
                    return <Input placeholder={ v.placeholder } />
                case 'rangePicker':
                    return <DatePicker.RangePicker format='YYYY-MM-DD' />
                default:
                    return <></>
            }
        }
        }
    </Form.Item>)
}
const SearchForm = ({
                        children = <></>,
                        formSetting = [],
                        form = null
                    }) => {
    return (
        <Form
            size='mini'
            form={ form }>
            <Space
                size={ 12 }
                direction='vertical'
            >
                {
                    formSetting.length && formSetting.map(v => <div
                        key={ v.key }
                        className={ styles.formItem }>
                        <div className={ styles.formItemLabel }>{ v.title }</div>
                        { v.children?.length && <SearchFormItem item={ v.children } /> }
                    </div>)
                }
            </Space>
            { children }
        </Form>
    )
}

export default SearchForm