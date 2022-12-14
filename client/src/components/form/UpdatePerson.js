import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PEOPLE } from '../../queries';
import { Form, Input, Button } from "antd";

const UpdatePerson = props => {
    const { id, firstName, lastName } = props;
    const [updatePerson] = useMutation(UPDATE_PEOPLE);

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        const { firstName, lastName } = values;
        updatePerson({
            variables: {
                id,
                firstName,
                lastName
            }
        })
    }

    return (
        <Form form={form} name="update-person-form" layout='inline' onFinish={onFinish} initialValues={{firstName: firstName, lastName: lastName }}>
            <Form.Item name={'firstName'} rules={[{ required: true, message: "Please input your First Name" }]}>
                <Input placeholder='John' />
            </Form.Item>
            <Form.Item name={'lastName'} rules={[{ required: true, message: "Please input your Last Name" }]}>
                <Input placeholder='Doe' />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
            {() => (
                <Button
                type="primary"
                htmlType="submit"
                disabled={
                    (!form.isFieldTouched("firstName") && !form.isFieldTouched("lastName")) ||
                    form.getFieldsError().filter(({ errors }) => errors.length).length
                }>
                Update Person
                </Button>
            )}
            </Form.Item>
        </Form>
    )
    }

export default UpdatePerson