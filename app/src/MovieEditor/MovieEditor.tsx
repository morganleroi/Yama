import React, {useEffect, useState} from 'react';
import {Col, Drawer, Form, Input, Row} from 'antd';
import "antd/dist/antd.css";
import {MovieDto} from "../MovieDto";
import {createOrUpdateMovie, deleteMovie} from "../service/movieApi";
import {MovieEditorError} from "./MovieEditorError";
import {MovieEditorSuccess} from "./MovieEditorSuccess";

type FormState = 'WAIT' | 'KO' | 'OK'

const MovieEditor = (props: { movie?: MovieDto, onClose: () => void }) => {
    const [formState, setFormState] = useState<FormState>('WAIT');
    const [error, setError] = useState<string>();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(props.movie);
    }, [props.movie])

    const onClose = () => {
        props.onClose();
    };

    const onFinish = (values: any) => {
        createOrUpdateMovie({
            ...props.movie,
            ...values
        })
            .then(() => setFormState('OK'))
            .catch(err => {
                setFormState('KO');
                setError(err.message)
            });
    };

    const onDelete = () => {
        deleteMovie(props.movie?.objectID).then(() => setFormState('OK'))
            .catch(err => {
                setFormState('KO');
                setError(err.message)
            });
    }

    const stateResult = () => {
        switch (formState) {
            case "OK":
                return <MovieEditorSuccess isCreation={props.movie?.objectID === undefined}/>
            case "KO":
                return <MovieEditorError error={error} isCreation={props.movie?.objectID === undefined}/>
        }
    }

    return (
        <>
            <Drawer
                title={props.movie?.objectID ? 'Edit a movie' : 'Add a new movie'}
                width={720}
                onClose={onClose}
                visible={props.movie !== undefined}
                bodyStyle={{
                    paddingBottom: 80,
                }}
            >
                {stateResult()}

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
                            <button onClick={(e) => {
                                e.preventDefault();
                                form.submit()
                            }}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                {props.movie?.objectID ? "Update the movie" : "Create a new movie"}
                            </button>
                            {props.movie?.objectID &&
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    onDelete()
                                }}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded">
                                    Delete
                                </button>}
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
        ;
};

export default MovieEditor;