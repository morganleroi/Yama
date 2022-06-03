import React, {useEffect, useState} from 'react';
import {Button, Col, Drawer, Form, Input, Row} from 'antd';
import "antd/dist/antd.css";
import {MovieDto} from "./MovieDto";
import {updateMovie} from "./movieApi";


const MovieEditor = (props: { movie?: MovieDto }) => {
    const [visible, setVisible] = useState(false);

    const [form] = Form.useForm();

    form.setFieldsValue(props.movie);

    useEffect(() => {
        if (props.movie !== undefined) showDrawer()
    }, [props.movie])

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onFinish = (values: any) => {
        updateMovie({
            ...props.movie,
            ...values
        });
    };

    return (
        <>
            <Drawer
                title="Edit a movie"
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{
                    paddingBottom: 80,
                }}

            >
                <Form layout="vertical" onFinish={onFinish} requiredMark={true} form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the official title',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter the official title"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="year"
                                label="Year"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter year',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}

                                    placeholder="Please enter year"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Item>
                            <Button className="bg-blue-800" type="primary" htmlType="submit">Submit
                            </Button>
                        </Form.Item>
                    </Row>

                </Form>
            </Drawer>
        </>
    );
};

export default MovieEditor;