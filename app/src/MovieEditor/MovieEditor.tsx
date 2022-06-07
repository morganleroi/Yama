import React, {useEffect, useState} from 'react';
import {Col, Drawer, Form, Input, Row} from 'antd';
import 'antd/dist/antd.css';
import {MovieDto} from '../MovieDto';
import {MovieEditorError} from './MovieEditorError';
import {MovieEditorSuccess} from './MovieEditorSuccess';
import LoadingSpinner from "./Spinner";

type FormState = 'KO' | 'OK';
export type FormAction = 'CREATE' | 'UPDATE' | 'DELETE';

const MovieEditor = (props: { movie?: MovieDto; onClose: () => void, onCreateOrUpdate: (movie: MovieDto) => Promise<any>, onDelete: (objectID: string) => Promise<any> }) => {
    const [formState, setFormState] = useState<FormState>();
    const [error, setError] = useState<string>();
    const [action, setAction] = useState<FormAction>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    const addDelay = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    useEffect(() => {
        form.setFieldsValue(props.movie);
    }, [props.movie]);

    const onClose = () => {
        props.onClose();
    };

    const onFinish = (values: any) => {
        setFormState(undefined);
        setIsLoading(true);
        setAction(props.movie?.objectID === undefined ? 'CREATE' : 'UPDATE');
        props.onCreateOrUpdate({
            ...props.movie,
            ...values,
        })
            .then(() => addDelay(2000))
            .then(() => setFormState('OK'))
            .catch((err) => {
                setFormState('KO');
                setError(err.message);
            }).finally(() => setIsLoading(false));
    };

    const onDelete = () => {
        setFormState(undefined);
        setIsLoading(true);
        setAction("DELETE");
        props.onDelete(props.movie?.objectID!)
            .then(() => addDelay(2000))
            .then(() => setFormState('OK'))
            .then(() => onClose())
            .catch((err) => {
                setFormState('KO');
                setError(err.message);
            }).finally(() => setIsLoading(false));
    };

    const stateResult = () => {
        switch (formState) {
            case 'OK':
                return <MovieEditorSuccess action={action}/>;
            case 'KO':
                return <MovieEditorError error={error} action={action}/>;
        }
    };

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
                                <Input disabled={isLoading}
                                       className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                       placeholder="Please enter the official title"/>
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
                                    disabled={isLoading}
                                    className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                                    style={{width: '100%'}}
                                    placeholder="Please enter year"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Item>
                            <Row className="items-center">
                                <button disabled={isLoading}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            form.submit();
                                        }}
                                        className="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    {props.movie?.objectID ? 'Update the movie' : 'Create a new movie'}
                                </button>
                                {props.movie?.objectID && (
                                    <button disabled={isLoading}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onDelete();
                                            }}
                                            className="bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
                                    >
                                        Delete
                                    </button>
                                )}

                                {isLoading && <LoadingSpinner/>}
                            </Row>
                        </Form.Item>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default MovieEditor;